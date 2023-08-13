import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { styleHelper } from "~/styles/utils";
import type { GridProps } from "./grid.types";

export const grid = ({ column, rowGap, columnGap, gap, autoColumnSize }: GridProps = {}) => css`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${`repeat(${column}, ${autoColumnSize ? "auto" : "1fr"})`};

  ${styleHelper("gap", gap)}
  ${styleHelper("rowGap", rowGap)}
  ${styleHelper("columnGap", columnGap)}
`;

export const Grid = styled.div<GridProps>`
  ${(props) => grid(props)}
`;
