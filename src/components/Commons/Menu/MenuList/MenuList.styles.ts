import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { position } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { MenuListStyleProps } from "./MenuList.types";

const verticalStyle = ({
  height = 0,
  gap = 10,
  vertical = "bottom",
  anchor = "right"
}: WithTheme<MenuListStyleProps>) => {
  switch (vertical) {
    case "top":
      return css`
        ${position.absolute({ [anchor]: 0, top: -height })};

        transform: translateY(-${gap}px);
      `;

    default:
      return css`
        ${position.absolute({ [anchor]: 0 })};

        transform: translateY(${gap}px);
      `;
  }
};

const containerStyle = ({ theme: { colors, shadows, zIndex } }: WithTheme<MenuListStyleProps>) => {
  return css`
    z-index: ${zIndex.menu};

    padding: 4px;

    background-color: ${colors.backgroundPrimary};
    box-shadow: ${shadows.drop3};

    border: 1px solid ${colors.border};
    border-radius: 12px;
  `;
};

export const Container = styled.ul<MenuListStyleProps>`
  ${(props) => containerStyle(props)};
  ${(props) => verticalStyle(props)};

  ${({ vertical, height }) =>
    vertical === "top" &&
    height === 0 &&
    css`
      visibility: hidden;
    `}
`;
