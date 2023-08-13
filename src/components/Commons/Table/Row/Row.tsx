import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { type PropsWithChildren } from "react";
import { position } from "~/styles/mixins";

export const Row = ({ children, title = false }: PropsWithChildren<{ title?: boolean }>) => {
  return <Container isTitle={title}>{children}</Container>;
};

const Container = styled.div<{ isTitle: boolean }>`
  ${({ theme: { colors }, isTitle }) => css`
    ${isTitle &&
    css`
      ${position.sticky({ top: 0 })}
    `}

    background-color: ${colors.backgroundPrimary};

    &:nth-of-type(odd) {
      background-color: ${colors.backgroundSecondary};
    }

    &:first-of-type {
      border-bottom: 1px solid ${colors.border};
    }
  `}
`;
