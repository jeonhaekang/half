import { useOverlayStore } from "~/states/client";
import { Portal } from "../Portal";

export const Overlay = () => {
  const overlays = useOverlayStore((state) => state.overlays);

  return [...overlays.entries()].map(([id, element]) => <Portal key={id}>{element}</Portal>);
};
