import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { insertMarkets, insertStores, updateInventory } from "./api";

export const useUpdateInventoryMutate = (
  options?: PickMutationOptions<typeof updateInventory, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateInventory,
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

export const useInsertStoresMutate = (
  options?: PickMutationOptions<typeof insertStores, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertStores,
    ...options
  });
};
