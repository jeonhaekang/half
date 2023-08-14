import Image from "next/image";
import { MouseEvent } from "react";
import { Row } from "~/components/Commons";
import { CartForm } from "~/components/Forms";
import { ConnectStoreForm } from "~/components/Forms/ConnectStoreForm/ConnectStoreForm";
import { useModal } from "~/components/Modals";
import { useBoolean } from "~/hooks";
import type { Variations } from "~/states/server";
import { Flex, Text } from "~/styles/mixins";
import type { OneOf } from "~/types";
import * as Styled from "./ItemRow.styles";

export const ItemRow = ({
  name,
  variation,
  price,
  quantity,
  imageUrl,
  storeId,
  itemId
}: OneOf<Variations>) => {
  const { mount } = useModal();

  const [imageOpen, setImageOpen] = useBoolean(false);

  const handleOpenModal = () => {
    if (storeId) {
      mount(<CartForm itemId={itemId} />, { id: "add_cart" });
    } else {
      mount(<ConnectStoreForm itemId={itemId} />, { id: "connect_store" });
    }
  };

  const handleOpenImage = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();

    setImageOpen.toggle();
  };

  return (
    <Row onClick={handleOpenModal}>
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
