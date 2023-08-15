import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { useIntersecting } from "~/hooks";
import { Animation, type AnimationProps } from "../Animation";

export const AnimationWithObserver = (props: PropsWithChildren<Omit<AnimationProps, "mode">>) => {
  const [mode, setMode] = useState<AnimationProps["mode"]>("none");

  const animationRef = useRef<HTMLDivElement | null>(null);

  const { isIntersecting, connect, disconnect } = useIntersecting(animationRef);

  useEffect(() => {
    setMode(isIntersecting ? "in" : "out");
  }, [isIntersecting]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect, mode]);

  return <Animation ref={animationRef} mode={mode} {...props} />;
};
