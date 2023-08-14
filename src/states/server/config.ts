import { createClient } from "@supabase/supabase-js";
import { Client } from "square";
import type { Database } from "~/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const square = new Client({
  accessToken: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN
});

export { square, supabase };
