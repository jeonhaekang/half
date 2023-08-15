import axios from "axios";
import { InventoryCount } from "square";

export const getBatchInventories = async (variationIds: string[]) => {
  const { data } = await axios.post<InventoryCount[]>("api/inventory/batch", { variationIds });

  console.log(variationIds, data);

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

  const variations = items.reduce(
    (acc, item) => {
      item.variations?.forEach((variation) => {
        acc.push({
          id: variation.id,
          itemName: item.name,
          variationName: variation.name,
          price: variation.priceMoney?.amount ?? 0,
          imageUrl: item.images?.[0].url ?? null,
          quantity: inventoryMap.get(variation.id) ?? 0
        });
      });

      return acc;
    },
    [] as {
      id: string;
      itemName: string;
      variationName: string;
      price: number;
      imageUrl: string | null;
      quantity: number;
    }[]
  );

  return variations;
};
