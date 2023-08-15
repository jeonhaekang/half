import { FormEvent } from "react";
import { Button, Input } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { ITEM_MODAL, useModal } from "~/components/Modals";
import { useInputForm } from "~/hooks";
import { Item, useGetItemQuery, useInsertCartMutate } from "~/states/server";
import { FlexColumn, Text } from "~/styles/mixins";

export const AddCardForm = ({ item }: { item: Item }) => {
  const { toast } = useDialog();
  const { unmount } = useModal();

  const { data: itemData } = useGetItemQuery(item.itemId);

  const { data, register } = useInputForm({ quantity: "" });

  const { mutate: insertCartMutate } = useInsertCartMutate({
    onSuccess: () => {
      unmount(ITEM_MODAL);

      toast({ type: "success", message: "카트에 담았습니다." });
    },
    onError: () => {
      toast({ type: "error", message: "담기에 실패했습니다." });
    }
  });

  const handleAddCard = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!itemData) return;

    insertCartMutate({
      itemId: item.id,
      itemName: item.itemName,
      variationName: item.variationName,
      imageUrl: item.imageUrl,
      price: itemData.price,
      quantity: Number(data.quantity)
    });
  };

  return (
    <FlexColumn as="form" gap={12} onSubmit={handleAddCard}>
      <Text size="heading3">카트 담기</Text>

      <Input type="number" {...register("quantity")} placeholder="수량" required />

      <Button>담기</Button>
    </FlexColumn>
  );
};
