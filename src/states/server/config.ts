import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient } from "@supabase/supabase-js";
import { Client } from "square";
import type { Database } from "~/types/supabase";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const square = new Client({
  accessToken: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN
});

const apollo = new ApolloClient({
  uri: "https://connect.squareup.com/public/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN}`
  }
});

export { apollo, square, supabase };
