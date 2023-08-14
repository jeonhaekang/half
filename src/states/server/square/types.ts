import type { Database } from "~/types/supabase";

export type Variations = Database["public"]["Functions"]["variations"]["Returns"];
export type Variation = Variations[0];

export type Stores = Database["public"]["Functions"]["stores"]["Returns"];
export type Store = Stores[0];

export type Table = Database["public"]["Tables"];

export type ItemTable = Table["items"];
export type ItemRow = ItemTable["Row"];
export type ItemInsert = ItemTable["Insert"];

export type MarketTable = Table["markets"];
export type MarketRow = MarketTable["Row"];
export type MarketInsert = MarketTable["Insert"];

export type StoreTable = Table["stores"];
export type StoreRow = StoreTable["Row"];
export type StoreInsert = StoreTable["Insert"];

export type VariationTable = Table["variations"];
export type VariationRow = VariationTable["Row"];
export type VariationInsert = VariationTable["Insert"];
