import Image from "next/image";
import { MouseEvent } from "react";
import { Row } from "~/components/Commons";
import { useBoolean } from "~/hooks";
import type { Variation } from "~/states/server";
import { Flex, Text } from "~/styles/mixins";
import * as Styled from "./ItemRow.styles";

export const ItemRow = ({ name, variation, price, quantity, imageUrl }: Variation) => {
  const [imageOpen, setImageOpen] = useBoolean(false);

  const handleOpenImage = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();

    setImageOpen.toggle();
  };

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
              onClick={handleOpenImage}
            />
          )}
        </Flex>
        <Text>{name}</Text>
        <Text>{variation}</Text>
        <Text>{price}</Text>
        <Text>{quantity}</Text>
      </Styled.ItemGrid>

      {imageUrl && (
        <Styled.ImageContainer isOpen={imageOpen}>
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
