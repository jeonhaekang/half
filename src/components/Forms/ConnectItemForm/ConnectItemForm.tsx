import { FormEvent, useState } from "react";
import { Button, Input, Label, Menu, MenuAnchor, MenuItem, MenuList } from "~/components/Commons";
import { useInputForm } from "~/hooks";
import { Store, useGetStoresQuery } from "~/states/server";
import { FlexColumn, Text } from "~/styles/mixins";

export const ConnectItemForm = () => {
  const { data: stores } = useGetStoresQuery();

  const [store, setStore] = useState<Store | null>(null);

  const { data, register, isValid } = useInputForm({
    price: ""
  });

  const handleConnectItem = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (store && isValid) {
      console.log(1, data);
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
          {stores.map((store) => (
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
