import { useQuery } from "@tanstack/react-query";
import { getItem, getMarkets, getStores } from "./api";
import { SupabaseKey } from "./key";

export const useGetMarketsQuery = () => {
  return useQuery({ queryKey: SupabaseKey.getMarkets(), queryFn: getMarkets, initialData: [] });
};

export const useGetStoresQuery = () => {
  return useQuery({ queryKey: SupabaseKey.getStores(), queryFn: getStores, initialData: [] });
};

export const useGetItemQuery = (itemId: string) => {
  return useQuery({ queryKey: SupabaseKey.getItem(itemId), queryFn: () => getItem(itemId) });
};
