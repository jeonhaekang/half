import { AddCardForm, ConnectItemForm } from "~/components/Forms";
import { Item, useGetItemQuery } from "~/states/server";

export const ITEM_MODAL = "ITEM_MODAL";

export const ItemModal = ({ item }: { item: Item }) => {
  const { data: selectedItem, isLoading } = useGetItemQuery(item.itemId);

  if (isLoading) return;

  return selectedItem ? <AddCardForm item={item} /> : <ConnectItemForm itemId={item.itemId} />;
};
