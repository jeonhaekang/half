import { useEffect, useRef } from "react";

export const useMount = (callback: VoidFunction) => {
  const _callback = useRef(callback);

  useEffect(() => {
    _callback.current();
  }, []);
};
