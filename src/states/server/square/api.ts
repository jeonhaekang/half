import { supabase } from "../config";
import type { MarketInsert, StoreInsert, Variation } from "./types";

export const getMarkets = async () => {
  const { data: markets, error } = await supabase.from("markets").select("*");

  if (error) throw error;

  return markets;
};

export const getStores = async () => {
  const { data: stores, error } = await supabase.rpc("stores");

  if (error) throw error;

  return stores;
};

export const getVariations = async ({
  column,
  ascending
}: {
  column: keyof Variation;
  ascending: boolean;
}) => {
  const { data: variations, error } = await supabase
    .rpc("variations")
    .order(column, { ascending })
    .order("name");

  if (error) throw error;

  return variations;
};

export const getVariation = async (id: string) => {
  const { data: variation, error } = await supabase.from("variations").select("*").eq("id", id);

  if (error) throw error;

  return variation;
};

export const connectStore = async ({ itemId, storeId }: { itemId: string; storeId: string }) => {
  const { error } = await supabase.from("items").update({ storeId }).eq("id", itemId);

  if (error) throw error;
};

export const updateInventory = async () => {
  await fetch("api/inventories").then((res) => res.json());
};

export const insertMarkets = async (markets: MarketInsert[]) => {
  const { error } = await supabase.from("markets").insert(markets);

  if (error) throw error;
};

export const insertStores = async (stores: StoreInsert[]) => {
  const { error } = await supabase.from("stores").insert(stores);

  if (error) throw error;
};

export const addCart = async (item: { variationId: string; quantity: number }) => {
  const { error } = await supabase.from("carts").insert(item);

  if (error) throw error;
};

export const getCarts = async () => {
  const { data: carts, error } = await supabase.rpc("carts").select("*").order("itemName");

  if (error) throw error;

  return carts;
};
