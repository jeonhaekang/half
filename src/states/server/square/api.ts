import { supabase } from "../config";
import type { MarketInsert, StoreInsert } from "./types";

export const getItems = async () => {
  const { data: items, error } = await supabase
    .from("items")
    .select("*, images (*), variations (*)")
    .order("name");

  if (error) throw error;

  return items;
};

export const getMarkets = async () => {
  const { data: markets, error } = await supabase.from("markets").select("*");

  if (error) throw error;

  return markets;
};

export const getVariations = async () => {
  const { data: variations, error } = await supabase.from("variations").select("*");

  if (error) throw error;

  return variations;
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
