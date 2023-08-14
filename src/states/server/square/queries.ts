import { useQuery } from "@tanstack/react-query";
import { getMarkets, getVariations } from "./api";
import { SquareKey } from "./key";
import { Variation } from "./types";

export const useGetMarketsQuery = () => {
  return useQuery({ queryKey: SquareKey.getMarkets(), queryFn: getMarkets, initialData: [] });
};

export const useGetVariationsQuery = (order: { column: keyof Variation; ascending: boolean }) => {
  return useQuery({
    queryKey: SquareKey.getVariations(order),
    queryFn: () => getVariations(order),
    initialData: []
  });
};
