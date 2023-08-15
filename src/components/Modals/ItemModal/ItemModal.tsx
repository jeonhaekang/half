import { AddCardForm, ConnectItemForm } from "~/components/Forms";
import { useGetItemQuery } from "~/states/server";

export const ITEM_MODAL = "ITEM_MODAL";

export const ItemModal = ({ itemId }: { itemId: string }) => {
  const { data: item, isLoading } = useGetItemQuery(itemId);

  if (isLoading) return;

  return item ? <AddCardForm /> : <ConnectItemForm itemId={itemId} />;
};
