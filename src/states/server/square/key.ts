const SQUARE_KEY = "SQUARE";

export const SquareKey = {
  getItems: () => [SQUARE_KEY, "getItems"] as const,
  getMarkets: () => [SQUARE_KEY, "getMarkets"] as const
} as const;
