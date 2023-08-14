import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Button, Input, Label, Menu, MenuAnchor, MenuItem, MenuList } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { useModal } from "~/components/Modals";
import {
  SquareKey,
  Store,
  Variation,
  useConnectStoreMutate,
  useGetStoresQuery
} from "~/states/server";
import { FlexColumn } from "~/styles/mixins";

interface ConnectStoreFormProps {
  itemId: string;
}

export const ConnectStoreForm = ({ itemId }: ConnectStoreFormProps) => {
  const { unmount } = useModal();
  const { toast } = useDialog();
  const { data: stores } = useGetStoresQuery();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const { mutate: connectStoreMutate } = useConnectStoreMutate({
    onSuccess: async () => {
      const { column = "name", ascending = true } = router.query as {
        column?: keyof Variation;
        ascending?: boolean;
      };

      await queryClient.invalidateQueries(SquareKey.getVariations({ column, ascending }));

      unmount("connect_store");

      toast({ type: "success", message: "상점 연결에 성공하였습니다." });
    },
    onError: () => {
      toast({ type: "success", message: "상점 연결에 실패하였습니다." });
    }
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (selectedStore) {
      connectStoreMutate({ itemId, storeId: selectedStore.id });
    }
  };

  return (
    <FlexColumn as="form" gap={12} onSubmit={handleSubmit}>
      <Menu>
        <MenuAnchor>
          <Label title="상점" full>
            <Input placeholder="선택해주세요" value={selectedStore?.name ?? ""} readOnly />
          </Label>
        </MenuAnchor>

        <MenuList full>
          {stores.map((store) => (
            <MenuItem key={store.id} onClick={() => setSelectedStore(store)}>
              {store.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Button>상점 연결</Button>
    </FlexColumn>
  );
};
