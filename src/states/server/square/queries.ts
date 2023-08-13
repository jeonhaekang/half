import { useQuery } from "@tanstack/react-query";
import { getItems } from "./api";
import { SquareKey } from "./key";

export const useGetItemsQuery = () => {
  return useQuery({ queryKey: SquareKey.getItems(), queryFn: getItems });
};
