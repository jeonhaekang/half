import { useGetVariationsQuery } from "~/states/server";
import { FlexColumn, Grid, Text } from "~/styles/mixins";
import { Row } from "../Row";
import { ItemRow } from "./ItemRow";

export const ItemTable = () => {
  const { data: items } = useGetVariationsQuery();

  return (
    <FlexColumn>
      <Row title>
        <Grid column={5} align="center" justify="center" style={{ height: "40px" }}>
          <Text>이미지</Text>
          <Text>품명</Text>
          <Text>구분</Text>
          <Text>가격</Text>
          <Text>재고</Text>
        </Grid>
      </Row>

      {items.map((item) => (
        <ItemRow key={item.id} {...item} />
      ))}
    </FlexColumn>
  );
};
