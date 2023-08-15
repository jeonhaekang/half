import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { Row } from "~/components/Commons";
import { useGetOrderItemsQuery } from "~/states/server";
import { Flex, FlexColumn, Grid, Text, flex } from "~/styles/mixins";

const OrderDetail = () => {
  const router = useRouter();

  const sheetId = router.query.sheetId as string;

  const { data: sheetItems } = useGetOrderItemsQuery(sheetId);

  sheetItems.sort((a, b) => {
    const nameA = a.items?.stores?.markets?.name || "";
    const nameB = b.items?.stores?.markets?.name || "";

    return nameA.localeCompare(nameB);
  });

  const totalPrice = sheetItems.reduce((acc, item) => (acc += item.price * item.quantity), 0);
  const totalCount = sheetItems.reduce((acc, item) => (acc += item.quantity), 0);

  return (
    <FlexColumn>
      <Row isTitle>
        <Grid column={5} align="center" justify="center" style={{ height: "40px" }}>
          <Text>이미지</Text>
          <Text>품번</Text>
          <Text>분류</Text>
          <Text>가격</Text>
          <Text>수량</Text>
        </Grid>
      </Row>

      {sheetItems.map(({ id, imageUrl, itemName, variationName, price, quantity, items }) => {
        return (
          <Row key={id}>
            <Grid column={5} align="center" justify="center">
              <Flex>
                {imageUrl && <Image src={imageUrl} width={40} height={40} alt="이미지" />}
              </Flex>
              <Text>{itemName}</Text>
              <Text>{variationName}</Text>
              <Text>{price}</Text>
              <Text>{quantity}</Text>
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
