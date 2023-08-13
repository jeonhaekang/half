import { useLayoutEffect, useRef } from "react";

export const useMountLayout = (callback: VoidFunction) => {
  const _callback = useRef(callback);

  useLayoutEffect(() => {
    _callback.current();
  }, []);
};
