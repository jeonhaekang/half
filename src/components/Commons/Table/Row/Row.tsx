import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes, type PropsWithChildren } from "react";
import { position } from "~/styles/mixins";

export const Row = ({
  children,
  isTitle = false,
  ...props
}: PropsWithChildren<{ isTitle?: boolean }> & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Container isTitle={isTitle} {...props}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ isTitle: boolean }>`
  ${({ theme: { colors }, isTitle }) => css`
    ${isTitle &&
    css`
      ${position.sticky({ top: 0 })};
    `};

    user-select: none;

    background-color: ${colors.backgroundPrimary};

    &:nth-of-type(odd) {
      background-color: ${colors.backgroundSecondary};
    }

    &:first-of-type {
      border-bottom: 1px solid ${colors.border};
    }
  `}
`;
