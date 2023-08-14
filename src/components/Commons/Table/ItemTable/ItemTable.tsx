import { useState } from "react";
import { Variation, Variations, useGetVariationsQuery } from "~/states/server";
import { FlexColumn, Grid, Text } from "~/styles/mixins";
import { OneOf } from "~/types";
import { Row } from "../Row";
import { ItemRow } from "./ItemRow";

export const ItemTable = () => {
  const [order, setOrder] = useState<{ column: keyof Variation; ascending: boolean }>({
    column: "name",
    ascending: true
  });

  const { data: items } = useGetVariationsQuery(order);

  const handleOrder = (column: keyof OneOf<Variations>) => {
    setOrder((prevOrder) => ({ ...prevOrder, column, ascending: !prevOrder.ascending }));
  };

  return (
    <FlexColumn>
      <Row title>
        <Grid column={5} align="center" justify="center" style={{ height: "40px" }}>
          <Text>이미지</Text>
          <Text onClick={() => handleOrder("name")}>품명</Text>
          <Text onClick={() => handleOrder("variation")}>구분</Text>
          <Text onClick={() => handleOrder("price")}>가격</Text>
          <Text onClick={() => handleOrder("quantity")}>재고</Text>
        </Grid>
      </Row>

      {items.map((item) => (
        <ItemRow key={item.id} {...item} />
      ))}
    </FlexColumn>
  );
};
