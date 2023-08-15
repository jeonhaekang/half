import { useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import { Button, Input, Label } from "~/components/Commons";
import { useModal } from "~/components/Modals";
import { useInputForm } from "~/hooks";
import { SupabaseKey, useUpdateOrderItemMutate } from "~/states/server";
import { FlexColumn } from "~/styles/mixins";

export const EDIT_QUANTITY_ORDER = "EDIT_QUANTITY_ORDER";

export const EditQuantityOrderForm = ({
  sheetId,
  orderItemId
}: {
  sheetId: string;
  orderItemId: string;
}) => {
  const { unmount } = useModal();

  const queryClient = useQueryClient();

  const { data, register } = useInputForm({ quantity: "" });

  const { mutate: updateOrderItemMutate } = useUpdateOrderItemMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(SupabaseKey.getOrderItems(sheetId));

      unmount(EDIT_QUANTITY_ORDER);
    }
  });

  const handleEditQuantityOrder = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    updateOrderItemMutate({ id: orderItemId, item: { quantity: Number(data.quantity) } });
  };

  return (
    <FlexColumn as="form" gap={12} onSubmit={handleEditQuantityOrder}>
      <Label title="수량 수정" required>
        <Input type="number" {...register("quantity")} placeholder="수량" required />
      </Label>

      <Button>수정</Button>
    </FlexColumn>
  );
};
