import { supabase } from "../config";

export const getItems = async () => {
  const { data: items, error } = await supabase.from("items").select("*, images (*), variations (*)").order("name");

  if (error) throw error;

  return items;
};

export const getVariations = async () => {
  const { data: variations, error } = await supabase.from("variations").select("*");

  if (error) throw error;

  return variations;
};
