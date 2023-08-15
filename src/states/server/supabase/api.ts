import { supabase } from "../config";
import { MarketInsert, StoreInsert } from "./types";

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

export const insertStores = async (stores: StoreInsert[]) => {
  const { error } = await supabase.from("stores").insert(stores);

  if (error) throw error;
};

export const insertMarkets = async (markets: MarketInsert[]) => {
  const { error } = await supabase.from("markets").insert(markets);

  if (error) throw error;
};