import { FormEvent } from "react";
import { Button, Input } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { useModal } from "~/components/Modals";
import { useInputForm } from "~/hooks";
// import { useAddCardMutate } from "~/states/server";
import { FlexColumn, Text } from "~/styles/mixins";

export const AddCardForm = () => {
  const { toast } = useDialog();
  const { unmount } = useModal();

  const { data, register } = useInputForm({ quantity: "" });

  console.log(data);

  // const { mutate: addCardMutate } = useAddCardMutate({
  //   onSuccess: () => {
  //     toast({ type: "success", message: "카트에 담았습니다." });

  //     unmount("add_card");
  //   },
  //   onError: () => toast({ type: "error", message: "담기에 실패했습니다." })
  // });

  const handleAddCard = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    // addCardMutate({ variationId, quantity: Number(data.quantity) });
  };

  return (
    <FlexColumn as="form" gap={12} onSubmit={handleAddCard}>
      <Text size="heading3">카트 담기</Text>

      <Input type="number" {...register("quantity")} placeholder="수량" required />

      <Button>담기</Button>
    </FlexColumn>
  );
};
