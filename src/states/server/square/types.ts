import type { Database } from "~/types/supabase";
import type { getVariations } from "./api";

export type Variations = Awaited<ReturnType<typeof getVariations>>;

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
