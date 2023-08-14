import Image from "next/image";
import { Row } from "~/components/Commons";
import { useBoolean } from "~/hooks";
import type { Variations } from "~/states/server";
import { Flex, Text } from "~/styles/mixins";
import type { OneOf } from "~/types";
import * as Styled from "./ItemRow.styles";

export const ItemRow = ({ name, variation, price, quantity, imageUrl }: OneOf<Variations>) => {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <Row>
      <Styled.ItemGrid>
        <Flex>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="상품 이미지"
              width={40}
              height={40}
              onClick={setIsOpen.toggle}
            />
          )}
        </Flex>
        <Text>{name}</Text>
        <Text>{variation}</Text>
        <Text>{price}</Text>
        <Text>{quantity}</Text>
      </Styled.ItemGrid>

      {imageUrl && (
        <Styled.ImageContainer isOpen={isOpen}>
          <Image
            src={imageUrl}
            alt="상품 이미지"
            fill
            loading="eager"
            sizes="100%"
            style={{ objectFit: "cover" }}
          />
        </Styled.ImageContainer>
      )}
    </Row>
  );
};
