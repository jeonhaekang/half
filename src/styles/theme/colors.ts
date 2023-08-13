const constantColors = {
  white: "#ffffff",
  black: "#1C1C1C"
} as const;

export const lightColors = {
  ...constantColors,
  content1: "#000F1D",
  content2: "#404B56",
  content3: "#8B939A",
  border: "#E6E7E9",
  backgroundSecondary: "#F5F6F6",
  backgroundPrimary: "#FFFFFF",
  info: "#0085FF",
  success: "#00BA34",
  error: "#E92C2C",
  warning: "#F98600",
  blue: "#0085FF",
  green: "#00BA34",
  orange: "#F98600",
  red: "#E92C2C",
  pink: "#E92C9E",
  violet: "#8B2CE9"
} as const;

export const darkColors = {
  ...constantColors,
  content1: "#E5E7E7",
  content2: "#B3B7BB",
  content3: "#666F77",
  border: "#192734",
  backgroundSecondary: "#0D1C28",
  backgroundPrimary: "#000F1D",
  info: "#168FFF",
  success: "#18CB49",
  error: "#F74141",
  warning: "#FF9F2D",
  blue: "#168FFF",
  green: "#18CB49",
  orange: "#FF9F2D",
  red: "#F74141",
  pink: "#F03EA9",
  violet: "#963AF2"
} as const;
