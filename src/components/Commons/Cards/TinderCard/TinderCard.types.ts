export interface TinderCardProps {
  onSelectRight: VoidFunction;
  onSelectLeft: VoidFunction;
  onSelectDown: VoidFunction;
  onSelectUp: VoidFunction;
}

export interface TinderCardAnimation {
  transition: number;
  translatePos: { x: number; y: number };
  rotate: number;
  opacity: number;
  event: boolean;
}
