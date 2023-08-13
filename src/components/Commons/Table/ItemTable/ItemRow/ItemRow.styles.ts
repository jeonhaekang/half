import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { grid, size } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";

export const ImageContainer = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    ${!isOpen && styleHelper("display", "none")}
  `}

  position: relative;
  overflow: hidden;

  ${size({ width: "100%", height: 0 })};

  padding-top: 100%;
`;

export const ItemGrid = styled.div`
  ${grid({ column: 5, align: "center", justify: "center" })}

  padding: 8px 0;
`;
