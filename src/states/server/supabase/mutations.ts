import { useMutation } from "@tanstack/react-query";
import { PickMutationOptions } from "../server.types";
import { insertMarkets, insertStores } from "./api";

export const useInsertStoresMutate = (
  options?: PickMutationOptions<typeof insertStores, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertStores,
    ...options
  });
};

export const useInsertMarketsMutate = (
  options?: PickMutationOptions<typeof insertMarkets, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertMarkets,
    ...options
  });
};