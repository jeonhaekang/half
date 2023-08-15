import Image from "next/image";
import { Row } from "~/components/Commons";
import { getCatalogWithVariationsQuery } from "~/server";
import { Flex, FlexColumn, Grid, Text } from "~/styles/mixins";

export const HEADERS = ["이미지", "품번", "구분", "가격", "재고"] as const;

export default function Home() {
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
          <Row>
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
