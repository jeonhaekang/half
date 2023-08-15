import Image from "next/image";
import { Row } from "~/components/Commons";
import { ITEM_MODAL, ItemModal, useModal } from "~/components/Modals";
import { getCatalogWithVariationsQuery } from "~/states/server";
import { Flex, FlexColumn, Grid, Text } from "~/styles/mixins";

export default function Home() {
  const { mount } = useModal();
  const { data: items } = getCatalogWithVariationsQuery();

  return (
    <FlexColumn>
      <Row isTitle>
        <Grid column={5} align="center" justify="center" style={{ height: "40px" }}>
          <Text>이미지</Text>
          <Text>품번</Text>
          <Text>구분</Text>
          <Text>가격</Text>
          <Text>재고</Text>
        </Grid>
      </Row>

      {items
        .sort((a, b) => a.itemName.localeCompare(b.itemName))
        .map((item) => (
          <Row
            key={item.id}
            onClick={() => mount(<ItemModal itemId={item.itemId} />, { id: ITEM_MODAL })}
          >
            <Grid column={5} align="center" justify="center" style={{ minHeight: "40px" }}>
              <Flex>
                {item.imageUrl && <Image src={item.imageUrl} alt="이미지" width={60} height={60} />}
              </Flex>
              <Text>{item.itemName}</Text>
              <Text>{item.variationName}</Text>
              <Text>{item.price}</Text>
              <Text>{item.quantity}</Text>
            </Grid>
          </Row>
        ))}
    </FlexColumn>
  );
}
