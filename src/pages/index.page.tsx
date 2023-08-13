import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Button, Icon, Menu, MenuAnchor, MenuItem, MenuList, Toggle } from "~/components/Commons";
import { HomeTable } from "~/components/Commons/Tables";
import { useDialog } from "~/components/Dialogs";
import { useThemeStore } from "~/states/client";
import { SquareKey, useUpdateInventoryMutate } from "~/states/server";
import { FlexColumn, Position, Text } from "~/styles/mixins";
import * as Styled from "./Home.styles";

export default function Home() {
  const { theme, toggle } = useThemeStore();
  const { toast, confirm } = useDialog();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: updateInventoryMutate } = useUpdateInventoryMutate({
    onSuccess: async () => {
      await queryClient.invalidateQueries(SquareKey.getItems());

      toast({ type: "success", message: "재고 동기화 성공" });
    },
    onError: () => {
      toast({ type: "error", message: "재고 동기화 실패" });
    }
  });

  const handleRefresh = async () => {
    if (await confirm({ message: "재고를 동기화 하시겠습니까?" })) {
      updateInventoryMutate();
    }
  };

  return (
    <FlexColumn>
      <Styled.Header>
        <Text>이분의 일</Text>

        <Toggle checked={theme} onChange={toggle} />
      </Styled.Header>

      <HomeTable />

      <Position position="fixed" bottom={12} right={12}>
        <Menu>
          <MenuAnchor>
            <Button size="large" shape="circle">
              <Icon name="add" width={32} height={32} />
            </Button>
          </MenuAnchor>

          <MenuList vertical="top">
            <MenuItem onClick={handleRefresh}>재고 동기화</MenuItem>
            <MenuItem onClick={() => router.push("/market")}>상가 등록</MenuItem>
            <MenuItem onClick={() => router.push("/store")}>상점 등록</MenuItem>
          </MenuList>
        </Menu>
      </Position>
    </FlexColumn>
  );
}
