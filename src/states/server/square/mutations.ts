import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { addCart, connectStore, insertMarkets, insertStores, updateInventory } from "./api";

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

export const useConnectStoreMutate = (
  options?: PickMutationOptions<typeof connectStore, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: connectStore,
    ...options
  });
};

export const useAddCardMutate = (
  options?: PickMutationOptions<typeof addCart, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: addCart,
    ...options
  });
};
