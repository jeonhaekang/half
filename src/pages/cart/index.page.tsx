import Image from "next/image";
import { Button, Row } from "~/components/Commons";
import { useGetCartsQuery } from "~/states/server";
import { Flex, FlexColumn, Grid, Text } from "~/styles/mixins";

const Cart = () => {
  const { data } = useGetCartsQuery();

  const totalPrice = data.reduce((price, item) => (price += item.quantity * item.storePrice), 0);
  const totalQuantity = data.reduce((quantity, item) => (quantity += item.quantity), 0);

  return (
    <FlexColumn>
      <Row isTitle>
        <Grid column={5} align="center" justify="center" style={{ height: 40 }}>
          <Text>이미지</Text>
          <Text>품명</Text>
          <Text>구분</Text>
          <Text>수량</Text>
          <Text>시장 가격</Text>
        </Grid>
      </Row>

      {data.map((item) => (
        <Row key={item.id}>
          <Grid column={5} align="center" justify="center" style={{ minHeight: 40 }}>
            <Flex>
              {item.imageUrl && <Image src={item.imageUrl} alt="이미지" width={70} height={70} />}
            </Flex>
            <Text>{item.itemName}</Text>
            <Text>{item.variationName}</Text>
            <Text>{item.quantity.toLocaleString()}</Text>
            <Text>{item.storePrice.toLocaleString()}</Text>
          </Grid>
        </Row>
      ))}

      <FlexColumn gap={12} style={{ padding: "12px" }}>
        <Text>총액: {totalPrice.toLocaleString()}원</Text>
        <Text>총수량: {totalQuantity.toLocaleString()}개</Text>

        <Button variant="primary">주문하기</Button>
      </FlexColumn>
    </FlexColumn>
  );
};

export default Cart;
