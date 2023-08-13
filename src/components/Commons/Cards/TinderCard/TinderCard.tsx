import type { MouseEvent, TouchEvent } from "react";
import { useState } from "react";
import { useImmutableState, useLockBodyScroll } from "~/hooks";
import * as Styled from "./TinderCard.styles";
import type { TinderCardProps } from "./TinderCard.types";

export const TinderCard = ({
  onSelectLeft,
  onSelectRight,
  onSelectUp,
  onSelectDown
}: TinderCardProps) => {
  const [drag, setDrag] = useImmutableState({
    state: false,
    startPos: { x: 0, y: 0 }
  });

  const [animation, setAnimation] = useImmutableState({
    transition: 0,
    translatePos: { x: 0, y: 0 },
    rotate: 0,
    opacity: 1,
    event: true
  });

  const [selectedDirection, setSelectedDirection] = useState<
    "up" | "right" | "down" | "left" | null
  >(null);

  useLockBodyScroll(drag.state);

  const handleDown = (x: number, y: number) => {
    setDrag({ state: true, startPos: { x, y } });
    setAnimation({ transition: 0 });
  };

  const handleMove = (x: number, y: number, width: number, height: number) => {
    const {
      state,
      startPos: { x: startX, y: startY }
    } = drag;

    if (state) {
      const movePosX = x - startX;
      const minMovePosX = width / 2;

      const movePosY = y - startY;
      const minMovePosY = height / 2;

      if (Math.abs(movePosX) > minMovePosX) {
        setSelectedDirection(movePosX > 0 ? "right" : "left");
      } else if (Math.abs(movePosY) > minMovePosY) {
        setSelectedDirection(movePosY > 0 ? "down" : "up");
      } else {
        setSelectedDirection(null);
      }

      setAnimation({
        translatePos: { x: x - startX, y: y - startY },
        rotate: (x - startX) / 10
      });
    }
  };

  const handleUp = () => {
    switch (selectedDirection) {
      case "right":
        onSelectRight();
        break;

      case "left":
        onSelectLeft();
        break;

      case "up":
        onSelectUp();
        break;

      case "down":
        onSelectDown();
        break;

      default:
        setAnimation({ transition: 300, translatePos: { x: 0, y: 0 }, rotate: 0 });
        break;
    }

    if (selectedDirection) {
      setAnimation({ transition: 600, opacity: 0, event: false });
    }

    setDrag({ state: false, startPos: { x: 0, y: 0 } });
  };

  const handleMouseDown = ({ clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    handleDown(clientX, clientY);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0];

    handleDown(clientX, clientY);
  };

  const handleMouseMove = ({
    clientX,
    clientY,
    currentTarget: { offsetWidth, offsetHeight }
  }: MouseEvent<HTMLDivElement>) => {
    handleMove(clientX, clientY, offsetWidth, offsetHeight);
  };

  const handleTouchMove = ({
    touches,
    currentTarget: { offsetWidth, offsetHeight }
  }: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = touches[0];

    handleMove(clientX, clientY, offsetWidth, offsetHeight);
  };

  return (
    <Styled.Container
      {...animation}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleUp}
    >
      Tinder Card
    </Styled.Container>
  );
};
