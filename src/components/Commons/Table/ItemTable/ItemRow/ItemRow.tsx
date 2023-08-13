import Image from "next/image";
import { Row } from "~/components/Commons";
import type { VariationRow } from "~/states/server";
import { Flex, Text } from "~/styles/mixins";

interface ItemRowProps {
  name: string;
  imageUrl?: string;
  variation: VariationRow;
}

export const ItemRow = ({ name, imageUrl, variation }: ItemRowProps) => {
  return (
    <Row>
      <Flex>{imageUrl && <Image src={imageUrl} alt="상품 이미지" width={40} height={40} />}</Flex>
      <Text>{name}</Text>
      <Text>{variation.name}</Text>
      <Text>{variation.price}</Text>
      <Text>{variation.quantity}</Text>
    </Row>
  );
};
