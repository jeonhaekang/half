import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button, Row } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { SupabaseKey, useDeleteCartMutate, useGetCartQuery } from "~/states/server";
import { Flex, FlexColumn, Grid, Text } from "~/styles/mixins";

const Cart = () => {
  const { toast } = useDialog();
  const queryClient = useQueryClient();

  const { data: carts } = useGetCartQuery();

  const { mutate: deleteCartMutate } = useDeleteCartMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(SupabaseKey.getCart());

      toast({ type: "success", message: "카트에서 제거하였습니다." });
    }
  });

  const totalPrice = carts.reduce((tp, item) => (tp += item.quantity * item.price), 0);

  return (
    <FlexColumn>
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
                {item.imageUrl && <Image src={item.imageUrl} alt="이미지" width={40} height={40} />}
              </Flex>
              <Text>{item.itemName}</Text>
              <Text>{item.variationName}</Text>
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
