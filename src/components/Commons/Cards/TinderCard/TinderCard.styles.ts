import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";
import type { WithTheme } from "~/types";
import type { TinderCardAnimation } from "./TinderCard.types";

const containerStyle = ({
  theme: { colors },
  transition,
  translatePos: { x, y },
  rotate,
  opacity,
  event
}: WithTheme<TinderCardAnimation>) => {
  return css`
    ${flex.center()};

    ${size({ width: 300, height: 400 })};

    border: 1px solid black;

    background-color: ${colors.white};

    transform: translate(${x}px, ${y}px) rotate(${rotate}deg);
    opacity: ${opacity};
    ${transition && styleHelper("transition", `${transition}ms`)};

    ${!event && styleHelper("pointerEvents", "none")}
  `;
};

export const Container = styled.div<TinderCardAnimation>`
  ${(props) => containerStyle(props)}
`;
