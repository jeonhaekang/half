import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  Button,
  Icon,
  ItemTable,
  Menu,
  MenuAnchor,
  MenuItem,
  MenuList
} from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { Header } from "~/components/Shared";
import { SquareKey, useUpdateInventoryMutate } from "~/states/server";
import { FlexColumn, Position } from "~/styles/mixins";

export default function Home() {
  const { toast, confirm } = useDialog();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: updateInventoryMutate } = useUpdateInventoryMutate({
    onSuccess: async () => {
      await queryClient.invalidateQueries(SquareKey.getVariations());

      toast({ type: "success", message: "재고 동기화에 성공하였습니다." });
    },
    onError: () => {
      toast({ type: "error", message: "재고 동기화에 실패하였습니다." });
    }
  });

  const handleRefresh = async () => {
    if (await confirm({ message: "재고를 동기화 할까요?" })) {
      updateInventoryMutate();
    }
  };

  return (
    <FlexColumn>
      <Header />

      <ItemTable />

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
