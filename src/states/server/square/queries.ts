import { useQuery } from "@tanstack/react-query";
import { getItems, getMarkets } from "./api";
import { SquareKey } from "./key";

export const useGetItemsQuery = () => {
  return useQuery({ queryKey: SquareKey.getItems(), queryFn: getItems, initialData: [] });
};

export const useGetMarketsQuery = () => {
  return useQuery({ queryKey: SquareKey.getMarkets(), queryFn: getMarkets, initialData: [] });
};
