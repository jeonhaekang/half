import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Children, type PropsWithChildren } from "react";
import { grid, position } from "~/styles/mixins";

export const Row = ({ children, title = false }: PropsWithChildren<{ title?: boolean }>) => {
  const columnCount = Children.toArray(children).length;

  return (
    <GridRow columnCount={columnCount} isTitle={title}>
      {children}
    </GridRow>
  );
};

const GridRow = styled.div<{ columnCount: number; isTitle: boolean }>`
  ${({ theme: { colors }, columnCount, isTitle }) => css`
    ${isTitle &&
    css`
      ${position.sticky({ top: 0 })}
    `}

    ${grid({ column: columnCount })}
    justify-items: center;
    align-items: center;

    min-height: 40px;

    background-color: ${colors.backgroundPrimary};

    &:nth-of-type(odd) {
      background-color: ${colors.backgroundSecondary};
    }

    &:first-of-type {
      border-bottom: 1px solid ${colors.border};
    }
  `}
`;
