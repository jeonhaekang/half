import { useQuery } from "@tanstack/react-query";
import { getMarkets, getStores, getVariation, getVariations } from "./api";
import { SquareKey } from "./key";
import { Variation } from "./types";

export const useGetMarketsQuery = () => {
  return useQuery({ queryKey: SquareKey.getMarkets(), queryFn: getMarkets, initialData: [] });
};

export const useGetStoresQuery = () => {
  return useQuery({ queryKey: SquareKey.getStores(), queryFn: getStores, initialData: [] });
};

export const useGetVariationsQuery = (order: { column: keyof Variation; ascending: boolean }) => {
  return useQuery({
    queryKey: SquareKey.getVariations(order),
    queryFn: () => getVariations(order),
    initialData: []
  });
};

export const useGetVariationQuery = (id: string) => {
  return useQuery({
    queryKey: SquareKey.getVariation(id),
    queryFn: () => getVariation(id)
  });
};
