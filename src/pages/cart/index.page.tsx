import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { Button, ItemImage, Row } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import {
  SupabaseKey,
  useClearCartMutate,
  useDeleteCartMutate,
  useGetCartQuery,
  useInsertOrderMutate
} from "~/states/server";
import { Flex, FlexColumn, Grid, Text } from "~/styles/mixins";

const Cart = () => {
  const { toast, confirm } = useDialog();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: carts } = useGetCartQuery();

  const { mutate: clearCartMutate } = useClearCartMutate();

  const { mutateAsync: insertOrderMutateAsync } = useInsertOrderMutate({
    onSuccess: () => {
      clearCartMutate();

      router.replace("/");

      toast({ type: "success", message: "주문에 성공하였습니다." });
    },
    onError: () => {
      toast({ type: "error", message: "주문에 실패하였습니다." });
    }
  });

  const { mutate: deleteCartMutate } = useDeleteCartMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(SupabaseKey.getCart());

      toast({ type: "success", message: "카트에서 제거하였습니다." });
    }
  });

  const handleOrder = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (carts.length > 0) {
      if (await confirm({ message: "주문하시겠습니까?" })) insertOrderMutateAsync(carts);
    }
  };

  const totalPrice = carts.reduce((tp, item) => (tp += item.quantity * item.price), 0);

  return (
    <FlexColumn as="form" onSubmit={handleOrder}>
      <Row isTitle>
        <Grid column={6} align="center" justify="center" style={{ height: "40px" }}>
          <Text>이미지</Text>
          <Text>품번</Text>
          <Text>구분</Text>
          <Text>가격</Text>
          <Text>수량</Text>
          <Text>삭제</Text>
        </Grid>
      </Row>

      {carts
        .sort((a, b) => a.itemName.localeCompare(b.itemName))
        .map((item) => (
          <Row key={item.id}>
            <Grid column={6} align="center" justify="center">
              <Flex>
                <ItemImage imageUrl={item.imageUrl} />
              </Flex>
              <Text>{item.itemName}</Text>
              <Text>{item.variationName === "定価" ? "-" : item.variationName}</Text>
              <Text>{item.price}</Text>
              <Text>{item.quantity}</Text>
              <Button
                type="button"
                size="small"
                variant="secondary"
                onClick={() => deleteCartMutate(item.id)}
              >
                삭제
              </Button>
            </Grid>
          </Row>
        ))}

      <FlexColumn gap={8} style={{ padding: 12 }}>
        <Text>총액 : {totalPrice.toLocaleString()}</Text>

        <Button>주문하기</Button>
      </FlexColumn>
    </FlexColumn>
  );
};

export default Cart;
