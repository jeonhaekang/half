import { useQuery } from "@tanstack/react-query";
import { getCatalogWithVariations } from "./api";
import { SquareKey } from "./key";

export const getCatalogWithVariationsQuery = () => {
  return useQuery({
    queryKey: SquareKey.getCatalogWithVariations(),
    queryFn: getCatalogWithVariations,
    initialData: []
  });
};
