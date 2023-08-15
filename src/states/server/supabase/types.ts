import { Database } from "~/types/supabase";

export type Table = Database["public"]["Tables"];

export type MarketTable = Table["markets"];
export type MarketRow = MarketTable["Row"];
export type MarketInsert = MarketTable["Insert"];

export type StoreTable = Table["stores"];
export type StoreRow = StoreTable["Row"];
export type StoreInsert = StoreTable["Insert"];

export type ItemTable = Table["items"];
export type ItemRow = ItemTable["Row"];
export type ItemInsert = ItemTable["Insert"];

export type CartTable = Table["carts"];
export type CartRow = CartTable["Row"];
export type CartInsert = CartTable["Insert"];

export type OrderTable = Table["orders"];
export type OrderRow = OrderTable["Row"];
export type OrderInsert = OrderTable["Insert"];
export type OrderUpdate = OrderTable["Update"];

export type Stores = Database["public"]["Functions"]["stores"]["Returns"];
export type Store = Stores[0];
