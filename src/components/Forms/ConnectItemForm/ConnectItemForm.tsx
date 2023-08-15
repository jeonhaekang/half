import { FormEvent, useState } from "react";
import { Button, Input, Label, Menu, MenuAnchor, MenuItem, MenuList } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { ITEM_MODAL, useModal } from "~/components/Modals";
import { useInputForm } from "~/hooks";
import { Store, useGetStoresQuery, useInsertItemMutate } from "~/states/server";
import { FlexColumn, Text } from "~/styles/mixins";

export const ConnectItemForm = ({ itemId }: { itemId: string }) => {
  const { toast } = useDialog();
  const { unmount } = useModal();

  const { data: stores } = useGetStoresQuery();

  const [store, setStore] = useState<Store | null>(null);

  const { data, register, isValid } = useInputForm({
    price: ""
  });

  const { mutate: insertItemMutate } = useInsertItemMutate({
    onSuccess: () => {
      unmount(ITEM_MODAL);

      toast({ type: "success", message: "정보를 등록하였습니다." });
    },
    onError: () => {
      toast({ type: "error", message: "정보를 등록에 실패하였습니다." });
    }
  });

  const handleConnectItem = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (store && isValid) {
      insertItemMutate({ id: itemId, price: Number(data.price), storeId: store.id });
    }
  };

  return (
    <FlexColumn as="form" gap={16} onSubmit={handleConnectItem}>
      <Text size="heading3">정보 등록</Text>

      <Menu>
        <MenuAnchor>
          <Label title={"상가"} full required>
            <Input placeholder="선택해주세요." value={store?.name ?? ""} readOnly required />
          </Label>
        </MenuAnchor>

        <MenuList full>
          {stores
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((store) => (
              <MenuItem key={store.id} onClick={() => setStore(store)}>
                {store.name}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>

      <Label title={"시장 가격"} full required>
        <Input type="number" {...register("price")} required placeholder="원화" />
      </Label>

      <Button>등록</Button>
    </FlexColumn>
  );
};
