import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Button, ItemImage, Row } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { EDIT_QUANTITY_ORDER, EditQuantityOrderForm } from "~/components/Forms";
import { useModal } from "~/components/Modals";
import {
  SupabaseKey,
  useDeleteOrderMutate,
  useGetOrderItemsQuery,
  useGetOrderSheetQuery,
  useUpdateOrderItemMutate
} from "~/states/server";
import { Flex, FlexCenter, FlexColumn, Grid, Text, flex } from "~/styles/mixins";

const OrderDetail = () => {
  const { confirm, toast } = useDialog();
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

  const { mutate: updateOrderMutate } = useUpdateOrderItemMutate({
    onSuccess: (_, updated) => {
      queryClient.invalidateQueries(SupabaseKey.getOrderItems(sheetId));

      toast({ type: "success", message: `${updated.item.isArrived ? "입고" : "취소"} 완료` });
    },
    onError: () => {
      toast({ type: "success", message: "입고 실패" });
    }
  });

  sheetItems.sort((a, b) => {
    const nameA = a.items?.stores?.markets?.name || "";
    const nameB = b.items?.stores?.markets?.name || "";

    return nameA.localeCompare(nameB);
  });

  sheetItems.sort((a, b) => {
    return a.itemName.localeCompare(b.itemName);
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
          <Grid column={7} align="center" justify="center" style={{ height: "40px" }}>
            <Text>사진</Text>
            <Text>품번</Text>
            <Text>분류</Text>
            <Text>가격</Text>
            <Text>수량</Text>
            <Text>삭제</Text>
            <Text>입고</Text>
          </Grid>
        </Row>

        {sheetItems.map(
          ({ id, imageUrl, itemName, variationName, price, quantity, items, isArrived }) => {
            return (
              <Row key={id}>
                <Grid column={7} align="center" justify="center">
                  <Flex>
                    <ItemImage imageUrl={imageUrl} />
                  </Flex>
                  <Text>{itemName}</Text>
                  <Text>{variationName === "定価" ? "-" : variationName}</Text>
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

                  <Button
                    variant="secondary"
                    size="small"
                    onClick={async () => {
                      if (await confirm({ message: "정말로 삭제하시겠습니까?" })) {
                        deleteOrderMutate(id);
                      }
                    }}
                  >
                    삭제
                  </Button>

                  <Button
                    variant={isArrived ? "secondary" : "primary"}
                    size="small"
                    onClick={async () => {
                      updateOrderMutate({ id, item: { isArrived: !isArrived } });
                    }}
                  >
                    {isArrived ? "취소" : "입고"}
                  </Button>
                </Grid>

                {items?.stores && items.stores.markets && (
                  <Flex style={{ padding: "8px 16px" }} gap={12}>
                    <Text>{items.stores.markets.name}</Text>
                    <Text>{items.stores.name}</Text>
                    <Text>
                      {items.stores.address.match(/https?:\/\/[^\s]+/g) ? (
                        <Link href={items.stores.address} target="_blank">
                          {items.stores.address}
                        </Link>
                      ) : (
                        items.stores.address
                      )}
                    </Text>
                  </Flex>
                )}
              </Row>
            );
          }
        )}
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
