import { ItemImage, Row } from "~/components/Commons";
import { ITEM_MODAL, ItemModal, useModal } from "~/components/Modals";
import { useBoolean } from "~/hooks";
import { getCatalogWithVariationsQuery } from "~/states/server";
import { Flex, FlexColumn, Grid, Text } from "~/styles/mixins";

export default function Home() {
  const { mount } = useModal();
  const { data: items } = getCatalogWithVariationsQuery();

  const [sort, setSort] = useBoolean(true);

  return (
    <FlexColumn>
      <Row isTitle>
        <Grid column={5} align="center" justify="center" style={{ height: "40px" }}>
          <Text>이미지</Text>
          <Text>품번</Text>
          <Text>구분</Text>
          <Text onClick={setSort.toggle}>재고</Text>
          <Text>주문 재고</Text>
        </Grid>
      </Row>

      {items
        .sort((a, b) => {
          if (sort) {
            return a.itemName.localeCompare(b.itemName);
          } else {
            return a.quantity - b.quantity;
          }
        })
        .map((item) => (
          <Row key={item.id} onClick={() => mount(<ItemModal item={item} />, { id: ITEM_MODAL })}>
            <Grid column={5} align="center" justify="center" style={{ minHeight: "40px" }}>
              <Flex>
                <ItemImage imageUrl={item.imageUrl} />
              </Flex>
              <Text>{item.itemName}</Text>
              <Text>{item.variationName === "定価" ? "-" : item.variationName}</Text>
              <Text>{item.quantity}</Text>
              <Text>{item.orderQuantity}</Text>
            </Grid>
          </Row>
        ))}
    </FlexColumn>
  );
}
