import type { CSSProperties } from "react";

export interface GridProps {
  column?: number;
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
  gap?: CSSProperties["gap"];
  autoColumnSize?: boolean;
}
