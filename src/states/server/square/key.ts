const SQUARE_KEY = "SQUARE";

export const SquareKey = {
  getVariations: () => [SQUARE_KEY, "getVariations"] as const,
  getMarkets: () => [SQUARE_KEY, "getMarkets"] as const
} as const;
