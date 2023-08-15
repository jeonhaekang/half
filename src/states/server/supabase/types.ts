import { Database } from "~/types/supabase";

export type Table = Database["public"]["Tables"];

export type MarketTable = Table["markets"];
export type MarketRow = MarketTable["Row"];
export type MarketInsert = MarketTable["Insert"];

export type StoreTable = Table["stores"];
export type StoreRow = StoreTable["Row"];
export type StoreInsert = StoreTable["Insert"];
