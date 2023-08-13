import type { getItems } from "./api";

export type Items = Awaited<ReturnType<typeof getItems>>;
