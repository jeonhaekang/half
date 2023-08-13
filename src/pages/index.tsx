import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button, Icon, Menu, MenuAnchor, MenuItem, MenuList, Toggle } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { MarketForm } from "~/components/Forms";
import { useModal } from "~/components/Modals/Modal.hooks";
import { useThemeStore } from "~/states/client";
import { getItems } from "~/states/server/item";
import { Flex, FlexColumn, Position, Text } from "~/styles/mixins";
import * as Styled from "./Home.styles";

export default function Home() {
  const { theme, toggle } = useThemeStore();
  const { alert, confirm, toast } = useDialog();
  const { mount } = useModal();

  const { data: items } = useQuery({ queryKey: ["getItems"], queryFn: getItems });

  const handleRefresh = async () => {
    await fetch("api/inventories", { method: "POST" }).then((res) => res.json());
  };

  if (!items) return;

  return (
    <FlexColumn>
      <Styled.Header>
        <Text>이분의 일</Text>

        <Toggle checked={theme} onChange={toggle} />
      </Styled.Header>

      <Styled.Table>
        <Styled.TitleRow>
          <Text>이미지</Text>
          <Text>품명</Text>
          <Text>구분</Text>
          <Text>가격</Text>
          <Text>재고</Text>
        </Styled.TitleRow>

        {items.map((item) =>
          item.variations.map((variation) => (
            <Styled.Row key={`${item.id}_${variation.id}`}>
              {item.images.length > 0 ? (
                <Image src={item.images[0].imageUrl} alt="상품 이미지" width={40} height={40} />
              ) : (
                <Text>없음</Text>
              )}

              <Text>{item.name}</Text>
              <Text>{variation.name}</Text>
              <Text>{variation.price}</Text>
              <Text>{variation.quantity ?? 0}</Text>
            </Styled.Row>
          ))
        )}
      </Styled.Table>

      <Position position="fixed" bottom={12} right={12}>
        <Flex gap={12}>
          <Button shape="circle" onClick={handleRefresh}>
            <Icon name="refresh" width={30} height={30} />
          </Button>

          <Menu>
            <MenuAnchor>
              <Button shape="circle">
                <Icon name="add" width={30} height={30} />
              </Button>
            </MenuAnchor>

            <MenuList vertical="top">
              <MenuItem onClick={() => mount(<MarketForm />, { id: "market" })}>상가 등록</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Position>
    </FlexColumn>
  );
}
