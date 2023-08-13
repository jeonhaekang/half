import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Text } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";
import type { LabelProps } from "./Label";

export const Label = styled.label<Pick<LabelProps, "direction" | "full">>`
  display: inline-grid;
  align-items: center;

  ${({ full }) => full && styleHelper("width", "100%")}

  ${({ direction }) => {
    switch (direction) {
      case "row":
        return css`
          grid-template-areas:
            "item title"
            "  .   desc";
          column-gap: 6px;
        `;

      default:
        return css`
          grid-template-areas:
            "title"
            "item"
            "desc";
          row-gap: 6px;
        `;
    }
  }}
`;

export const Title = styled(Text)<Pick<LabelProps, "required">>`
  grid-area: title;

  ${({ theme: { colors }, required }) =>
    required &&
    css`
      &::after {
        content: "*";

        margin-left: 4px;

        color: ${colors.red};
      }
    `}
`;

export const Desc = styled(Text)`
  grid-area: desc;
`;
