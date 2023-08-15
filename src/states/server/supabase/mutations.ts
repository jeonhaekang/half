import { useMutation } from "@tanstack/react-query";
import { PickMutationOptions } from "../server.types";
import { deleteCart, insertCart, insertItem, insertMarkets, insertStores } from "./api";

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

export const useInsertItemMutate = (
  options?: PickMutationOptions<typeof insertItem, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertItem,
    ...options
  });
};

export const useInsertCartMutate = (
  options?: PickMutationOptions<typeof insertCart, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertCart,
    ...options
  });
};

export const useDeleteCartMutate = (
  options?: PickMutationOptions<typeof deleteCart, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteCart,
    ...options
  });
};
