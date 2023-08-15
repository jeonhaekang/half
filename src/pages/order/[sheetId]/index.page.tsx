import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Button, ItemImage, Row } from "~/components/Commons";
import { EDIT_QUANTITY_ORDER, EditQuantityOrderForm } from "~/components/Forms";
import { useModal } from "~/components/Modals";
import {
  SupabaseKey,
  useDeleteOrderMutate,
  useGetOrderItemsQuery,
  useGetOrderSheetQuery
} from "~/states/server";
import { Flex, FlexCenter, FlexColumn, Grid, Text, flex } from "~/styles/mixins";

const OrderDetail = () => {
  const { mount } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const ref = useRef<HTMLDivElement>(null);

  const sheetId = router.query.sheetId as string;

  const { data: sheet } = useGetOrderSheetQuery(sheetId);
  const { data: sheetItems } = useGetOrderItemsQuery(sheetId);

  const { mutate: deleteOrderMutate } = useDeleteOrderMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(SupabaseKey.getOrderItems(sheetId));
    }
  });

  sheetItems.sort((a, b) => {
    const nameA = a.items?.stores?.markets?.name || "";
    const nameB = b.items?.stores?.markets?.name || "";

    return nameA.localeCompare(nameB);
  });

  const totalPrice = sheetItems.reduce((acc, item) => (acc += item.price * item.quantity), 0);
  const totalCount = sheetItems.reduce((acc, item) => (acc += item.quantity), 0);

  if (!sheet) return;

  return (
    <FlexColumn>
      <FlexCenter style={{ padding: "12px" }}>
        <Text size="heading3">{dayjs(sheet.createdAt).format("YYYY년 MM년 DD일 hh시 mm분")}</Text>
      </FlexCenter>

      <FlexColumn ref={ref}>
        <Row isTitle>
          <Grid column={6} align="center" justify="center" style={{ height: "40px" }}>
            <Text>이미지</Text>
            <Text>품번</Text>
            <Text>분류</Text>
            <Text>가격</Text>
            <Text>수량</Text>
            <Text>삭제</Text>
          </Grid>
        </Row>

        {sheetItems.map(({ id, imageUrl, itemName, variationName, price, quantity, items }) => {
          return (
            <Row key={id}>
              <Grid column={6} align="center" justify="center">
                <Flex>
                  <ItemImage imageUrl={imageUrl} />
                </Flex>
                <Text>{itemName}</Text>
                <Text>{variationName}</Text>
                <Text>{price.toLocaleString()}</Text>
                <Text
                  onClick={() =>
                    mount(<EditQuantityOrderForm sheetId={sheet.id} orderItemId={id} />, {
                      id: EDIT_QUANTITY_ORDER
                    })
                  }
                >
                  {quantity.toLocaleString()}
                </Text>
                <Text>
                  <Button variant="secondary" size="small" onClick={() => deleteOrderMutate(id)}>
                    삭제
                  </Button>
                </Text>
              </Grid>

              {items?.stores && items.stores.markets && (
                <Flex style={{ padding: "8px 16px" }} gap={12}>
                  <Text>{items.stores.markets.name}</Text>
                  <Text>{items.stores.name}</Text>
                  <Text>{items.stores.address}</Text>
                </Flex>
              )}
            </Row>
          );
        })}
      </FlexColumn>

      <Container>
        <Text>총액 : {totalPrice.toLocaleString()}</Text>
        <Text>총수량 : {totalCount.toLocaleString()}</Text>
      </Container>
    </FlexColumn>
  );
};

export default OrderDetail;

export const Container = styled.div`
  ${flex.column({ gap: 8 })};

  padding: 16px;
`;
