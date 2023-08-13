/* eslint-disable @typescript-eslint/no-empty-interface */
import type { ThemeStyle } from "~/styles/theme";

declare module "@emotion/react" {
  type EmotionTheme = ThemeStyle;

  export interface Theme extends EmotionTheme {}
}
