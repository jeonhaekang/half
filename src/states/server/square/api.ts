import axios from "axios";
import { InventoryCount } from "square";
import { supabase } from "../config";
import { Item } from "./types";

export const getBatchInventories = async (variationIds: string[]) => {
  const { data } = await axios.post<InventoryCount[]>("api/inventory/batch", { variationIds });

  return data;
};

export const getCatalogWithVariations = async () => {
  const { data: items } = await axios.post<
    {
      id: string;
      name: string;
      variations: { id: string; name: string; priceMoney: { amount: number } }[] | null;
      images: { url: string }[] | null;
    }[]
  >("api/item/graph");

  const variationIds = items
    .map((item) => item.variations?.map((variation) => variation.id))
    .flat();

  const { data: inventories } = await axios.post<{ catalogObjectId: string; quantity: string }[]>(
    "api/inventory/all",
    { variationIds }
  );

  const inventoryMap = new Map<string, number>();

  inventories.forEach((inventory) =>
    inventoryMap.set(inventory.catalogObjectId, Number(inventory.quantity))
  );

  const { data: orders, error } = await supabase.from("orders").select("*").eq("isArrived", false);

  if (error) throw error;

  const orderQuantity = orders.reduce((acc, order) => {
    if (!acc[order.itemId]) {
      acc[order.itemId] = {};
    }

    acc[order.itemId][order.variationName] =
      (acc[order.itemId][order.variationName] || 0) + order.quantity;

    return acc;
  }, {} as { [itemName: string]: { [variationName: string]: number } });

  const variations = items.reduce((acc, item) => {
    item.variations?.forEach((variation) => {
      acc.push({
        id: variation.id,
        itemId: item.id,
        itemName: item.name,
        variationName: variation.name,
        imageUrl: item.images?.[0].url ?? null,
        quantity: inventoryMap.get(variation.id) ?? 0,
        orderQuantity: orderQuantity?.[item.id]?.[variation.name] ?? 0
      });
    });

    return acc;
  }, [] as Item[]);

  return variations;
};
