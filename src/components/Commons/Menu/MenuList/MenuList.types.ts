export interface MenuListProps {
  vertical?: "top" | "bottom";
  anchor?: "left" | "right";
  gap?: number;
}

export interface MenuListStyleProps extends MenuListProps {
  height: number;
}
