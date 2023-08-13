import Image from "next/image";
import { useGetItemsQuery } from "~/states/server";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { Row } from "../Row";

export const HomeTable = () => {
  const { data: items } = useGetItemsQuery();

  return (
    <FlexColumn>
      <Row title>
        <Text>이미지</Text>
        <Text>품명</Text>
        <Text>구분</Text>
        <Text>가격</Text>
        <Text>재고</Text>
      </Row>

      {items.map((item) => {
        return item.variations.map((variation) => (
          <Row key={`${item.id}_${variation.id}`}>
            <Flex>
              {item.images.length > 0 && (
                <Image src={item.images[0].imageUrl} alt="상품 이미지" width={40} height={40} />
              )}
            </Flex>
            <Text>{item.name}</Text>
            <Text>{variation.name}</Text>
            <Text>{variation.price}</Text>
            <Text>{variation.quantity}</Text>
          </Row>
        ));
      })}
    </FlexColumn>
  );
};
