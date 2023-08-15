import styled from "@emotion/styled";
import Image from "next/image";
import { useBoolean, useLockBodyScroll } from "~/hooks";
import { flex, position, size } from "~/styles/mixins";

export const ItemImage = ({ imageUrl }: { imageUrl?: string | null }) => {
  const [isOpen, setIsOpen] = useBoolean(false);

  useLockBodyScroll(isOpen);

  if (!imageUrl) return;

  return (
    <>
      <Image
        src={imageUrl}
        alt="이미지"
        width={40}
        height={40}
        onClick={(event) => {
          event.stopPropagation();

          setIsOpen.toggle();
        }}
      />

      {isOpen && (
        <Big
          onClick={(event) => {
            event.stopPropagation();

            setIsOpen.off();
          }}
        >
          <Image src={imageUrl} alt="이미지" width={300} height={300} />
        </Big>
      )}
    </>
  );
};

export const Big = styled.div`
  ${position.fixed({ top: 0, left: 0 })};
  z-index: 9999;

  ${flex.center()};

  background-color: rgba(0, 0, 0, 0.3);

  backdrop-filter: blur(5px);

  ${size({ width: "100vw", height: "100vh" })};
`;
