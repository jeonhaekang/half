const SUPABASE_KEY = "SUPABASE";

export const SupabaseKey = {
  getMarkets: () => [SUPABASE_KEY, "getMarkets"] as const,
  getStores: () => [SUPABASE_KEY, "getStores"] as const,
  getItem: (itemId: string) => [SUPABASE_KEY, "getItem", itemId] as const
} as const;
