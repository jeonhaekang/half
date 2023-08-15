import type { MouseEvent, PropsWithChildren, TouchEvent } from "react";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { useImmutableState } from "~/hooks";
import { to2DArray } from "~/utils";
import { CarouselItem } from "./Carousel.styles";
import type { CarouselProps } from "./Carousel.types";

export const MIN_DISTANCE = 100;

export const useCarousel = ({
  children,
  columnCount = 1,
  autoPlay,
  autoPlayDelay = 3000
}: PropsWithChildren<CarouselProps>) => {
  const [page, setPage] = useState(1);
  const [transition, setTransition] = useState(true);

  const [drag, setDrag] = useImmutableState({
    state: false,
    startPos: 0,
    dragPos: 0
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const _children = to2DArray(
    Children.toArray(children).map((item, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <CarouselItem key={`carousel_item_${idx}`}>{item}</CarouselItem>
    )),
    columnCount
  );

  const nextPage = useCallback(() => {
    setPage((prevPage) => {
      if (prevPage < _children.length + 1) {
        setTransition(true);
        return prevPage + 1;
      }

      return prevPage;
    });
  }, [_children.length]);

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
      setTransition(true);
    }
  };

  const updatePage = (pos: number) => {
    const distance = pos - drag.startPos;

    if (distance > MIN_DISTANCE) prevPage();
    else if (distance < -MIN_DISTANCE) nextPage();

    setDrag({ state: false, dragPos: 0 });
    setTransition(true);
  };

  const getIsSelectedPage = (_page: number) => {
    switch (_page) {
      case 1:
        return page === 1 || page === _children.length + 1;

      case _children.length:
        return page === 0 || page === _children.length;

      default:
        return _page === page;
    }
  };

  const handleTransitionEnd = () => {
    if (page === _children.length + 1) {
      setTransition(false);
      setPage(1);
    } else if (page === 0) {
      setTransition(false);
      setPage(_children.length);
    }
  };

  const connectInterval = useCallback(() => {
    if (autoPlay) {
      setTransition(true);

      intervalRef.current = setInterval(() => nextPage(), autoPlayDelay);
    }
  }, [autoPlay, autoPlayDelay, nextPage]);

  const disconnectInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setDrag({ state: true, startPos: event.clientX });
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (drag.state) setDrag({ dragPos: event.clientX - drag.startPos });
  };

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    updatePage(event.clientX);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (drag.state) updatePage(event.clientX);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setDrag({ state: true, startPos: event.touches[0].clientX });
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (drag.state) setDrag({ dragPos: event.touches[0].clientX - drag.startPos });
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    updatePage(event.changedTouches[0].clientX);
  };

  const handleContainerMouseEnter = () => {
    disconnectInterval();
  };

  const handleContainerMouseLeave = () => {
    connectInterval();
  };

  useEffect(() => {
    setTransition(!drag.state);
  }, [drag.state]);

  useEffect(() => {
    connectInterval();

    return () => {
      disconnectInterval();
    };
  }, [connectInterval, disconnectInterval]);

  return {
    _children,
    page,
    setPage,
    getIsSelectedPage,
    containerProps: {
      onMouseEnter: handleContainerMouseEnter,
      onMouseLeave: handleContainerMouseLeave
    },
    styleProps: {
      dragPos: drag.dragPos,
      transition
    },
    eventProps: {
      onTransitionEnd: handleTransitionEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};
