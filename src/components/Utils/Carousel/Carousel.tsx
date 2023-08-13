import { type PropsWithChildren } from "react";
import { useCarousel } from "./Carousel.hooks";
import * as Styled from "./Carousel.styles";
import type { CarouselProps } from "./Carousel.types";

export const Carousel = (props: PropsWithChildren<CarouselProps>) => {
  const { _children, page, setPage, getIsSelectedPage, containerProps, styleProps, eventProps } =
    useCarousel(props);

  return (
    <Styled.Container {...containerProps}>
      <Styled.CarouselContainer page={page} {...styleProps} {...eventProps}>
        <Styled.CarouselGroup columnCount={props.columnCount}>
          {_children[_children.length - 1]}
        </Styled.CarouselGroup>

        {_children.map((itemGroup) => (
          <Styled.CarouselGroup key={itemGroup[0].key} columnCount={props.columnCount}>
            {itemGroup}
          </Styled.CarouselGroup>
        ))}

        <Styled.CarouselGroup columnCount={props.columnCount}>{_children[0]}</Styled.CarouselGroup>
      </Styled.CarouselContainer>

      {props.pagination && (
        <Styled.PaginationContainer>
          {_children.map((itemGroup, idx) => (
            <Styled.Dot
              key={itemGroup[0].key}
              onClick={() => setPage(idx + 1)}
              selected={getIsSelectedPage(idx + 1)}
            />
          ))}
        </Styled.PaginationContainer>
      )}
    </Styled.Container>
  );
};
