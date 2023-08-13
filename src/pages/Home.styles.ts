import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, position, size } from "~/styles/mixins";
import type { WithTheme } from "~/types";

export const Table = styled.div``;

const rowStyle = ({ theme: { colors } }: WithTheme) => css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;

  min-height: 40px;

  background-color: ${colors.backgroundPrimary};

  &:nth-of-type(odd) {
    background-color: ${colors.backgroundSecondary};
  }
`;

export const Row = styled.div`
  ${(props) => rowStyle(props)};
`;

export const TitleRow = styled(Row)`
  ${position.sticky({ top: 0 })};

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.border};
  `}
`;

export const Header = styled.header`
  ${flex({ align: "center", justify: "between" })};

  ${size({ height: 50 })};

  padding: 0 12px;
`;
