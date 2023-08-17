import { useMutation } from "@tanstack/react-query";
import { PickMutationOptions } from "../server.types";
import {
  clearCart,
  deleteCart,
  deleteOrderItem,
  deleteOrderSheet,
  insertCart,
  insertItem,
  insertMarkets,
  insertOrder,
  insertStores,
  updateOrderItem
} from "./api";

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

export const useClearCartMutate = (
  options?: PickMutationOptions<typeof clearCart, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: clearCart,
    ...options
  });
};

export const useInsertOrderMutate = (
  options?: PickMutationOptions<typeof insertOrder, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertOrder,
    ...options
  });
};

export const useDeleteOrderMutate = (
  options?: PickMutationOptions<typeof deleteOrderItem, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteOrderItem,
    ...options
  });
};

export const useUpdateOrderItemMutate = (
  options?: PickMutationOptions<typeof updateOrderItem, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateOrderItem,
    ...options
  });
};

export const useDeleteOrderSheetMutate = (
  options?: PickMutationOptions<typeof deleteOrderSheet, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteOrderSheet,
    ...options
  });
};
