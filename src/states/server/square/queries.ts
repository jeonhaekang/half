import { useQuery } from "@tanstack/react-query";
import { getMarkets, getVariations } from "./api";
import { SquareKey } from "./key";

export const useGetMarketsQuery = () => {
  return useQuery({ queryKey: SquareKey.getMarkets(), queryFn: getMarkets, initialData: [] });
};

export const useGetVariationsQuery = () => {
  return useQuery({ queryKey: SquareKey.getVariations(), queryFn: getVariations, initialData: [] });
};
