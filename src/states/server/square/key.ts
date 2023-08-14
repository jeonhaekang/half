import { Variation } from "./types";

const SQUARE_KEY = "SQUARE";

export const SquareKey = {
  getVariations: (order: { column: keyof Variation; ascending: boolean }) => {
    return [SQUARE_KEY, "getVariations", order.column, order.ascending] as const;
  },
  getMarkets: () => [SQUARE_KEY, "getMarkets"] as const,
  getStores: () => [SQUARE_KEY, "getStores"] as const
} as const;
