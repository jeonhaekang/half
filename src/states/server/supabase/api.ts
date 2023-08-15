import { supabase } from "../config";
import { CartInsert, CartRow, ItemInsert, MarketInsert, StoreInsert } from "./types";

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

export const getItem = async (itemId: string) => {
  const { data, error } = await supabase.from("items").select("*").eq("id", itemId).maybeSingle();

  if (error) throw error;

  return data;
};

export const insertItem = async (item: ItemInsert) => {
  const { error } = await supabase.from("items").insert(item);

  if (error) throw error;
};

export const insertCart = async (item: CartInsert) => {
  const { error } = await supabase.from("carts").insert(item);

  if (error) throw error;
};

export const getCart = async () => {
  const { data, error } = await supabase.from("carts").select("*");

  if (error) throw error;

  return data;
};

export const deleteCart = async (id: string) => {
  const { error } = await supabase.from("carts").delete().eq("id", id);

  if (error) throw error;
};

export const clearCart = async () => {
  const { error } = await supabase.from("carts").delete().neq("itemName", "delete_all");

  if (error) throw error;
};

export const insertOrder = async (orders: CartRow[]) => {
  const { data: orderSheet, error } = await supabase
    .from("orderSheets")
    .insert({})
    .select()
    .single();

  if (error) throw error;

  const _orders = orders.map((order) => ({ ...order, sheetId: orderSheet.id }));

  const { error: insertError } = await supabase.from("orders").insert(_orders);

  if (insertError) throw insertError;
};

export const getOrderSheets = async () => {
  const { data, error } = await supabase
    .from("orderSheets")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data;
};

export const getOrderItems = async (sheetId: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, items(*, stores(*, markets(*)))")
    .eq("sheetId", sheetId);

  if (error) throw error;

  return data;
};
