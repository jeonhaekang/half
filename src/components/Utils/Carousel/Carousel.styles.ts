import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, grid, position, size } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";

const GAP = 20;

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  width: 100%;
`;

export const CarouselContainer = styled.div<{
  page: number;
  transition: boolean;
  dragPos: number;
}>`
  ${flex({ gap: GAP })}

  width: 100%;

  ${({ page, transition, dragPos }) => css`
    transform: translateX(calc(-${page * 100}% + ${dragPos}px - ${page * GAP}px));

    ${transition && styleHelper("transition", "300ms")};
  `};

  & * {
    -webkit-user-drag: none;
  }
`;

export const CarouselGroup = styled.div<{ columnCount?: number }>`
  flex: 0 0 100%;

  ${({ columnCount = 3 }) => grid({ column: columnCount, gap: GAP })};
`;

export const CarouselItem = styled.div`
  & > :first-child {
    ${size({ width: "100%", height: "100%" })}

    object-fit: cover;
    object-position: center;
  }
`;

export const PaginationContainer = styled.div`
  ${position.posCenterX({ position: "absolute", bottom: 12 })}

  ${flex.center({ gap: 8 })}

  color: white;
`;

export const Dot = styled.div<{ selected: boolean }>`
  ${size({ width: 8, height: 8 })}

  ${({ theme: { colors }, selected }) => css`
    background-color: ${selected ? colors.blue : colors.content3};

    border-radius: 8px;
  `};

  cursor: pointer;
`;
