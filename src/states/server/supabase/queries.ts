import { useQuery } from "@tanstack/react-query";
import { getCart, getItem, getMarkets, getOrderItems, getOrderSheets, getStores } from "./api";
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

export const useGetCartQuery = () => {
  return useQuery({ queryKey: SupabaseKey.getCart(), queryFn: getCart, initialData: [] });
};

export const useGetOrderSheetsQuery = () => {
  return useQuery({
    queryKey: SupabaseKey.getOrderSheets(),
    queryFn: getOrderSheets,
    initialData: []
  });
};

export const useGetOrderItemsQuery = (sheetId: string) => {
  return useQuery({
    queryKey: SupabaseKey.getOrderItems(sheetId),
    queryFn: () => getOrderItems(sheetId),
    initialData: [],
    enabled: !!sheetId
  });
};
