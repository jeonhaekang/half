import { useGetItemsQuery } from "~/states/server";
import { FlexColumn, Text } from "~/styles/mixins";
import { Row } from "../Row";
import { ItemRow } from "./ItemRow";

export const ItemTable = () => {
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

      {items.map((item) =>
        item.variations.map((variation) => (
          <ItemRow
            key={`${item.id}_${variation.id}`}
            name={item.name}
            imageUrl={item.images[0]?.imageUrl}
            variation={variation}
          />
        ))
      )}
    </FlexColumn>
  );
};
