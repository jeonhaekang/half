import { Global, css, useTheme } from "@emotion/react";
import { font, more, reset } from "~/styles/base";

export const GlobalStyle = () => {
  const { colors } = useTheme();

  return (
    <Global
      styles={css`
        ${reset};
        ${more};
        ${font};

        body {
          background-color: ${colors.backgroundPrimary};

          transition: 200ms;
        }
      `}
    />
  );
};
