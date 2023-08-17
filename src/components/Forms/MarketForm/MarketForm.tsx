import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Button, Input, Label, Menu, MenuAnchor, MenuItem, MenuList } from "~/components/Commons";
import { useInputForm } from "~/hooks";
import { flex } from "~/styles/mixins";

export interface MarketData {
  data: {
    name: string;
    address: string;
    place: string;
  };
  isValid: boolean;
}
export const places = ["동대문", "남대문", "기타"] as const;

export const MarketForm = ({
  onChange,
  onRemove
}: {
  onChange: (market: MarketData) => void;
  onRemove?: VoidFunction;
}) => {
  const [place, setPlace] = useState<"동대문" | "남대문" | "기타" | null>(null);

  console.log(place);

  const { data, register, isValid } = useInputForm({ name: "", address: "" });

  useEffect(() => {
    if (place) {
      onChange({ data: { ...data, place }, isValid });
    }
  }, [data, isValid, onChange]);

  return (
    <Container>
      <Menu>
        <MenuAnchor>
          <Label title={"상가"} full required>
            <Input placeholder="선택해주세요." value={place ?? ""} readOnly />
          </Label>
        </MenuAnchor>

        <MenuList full>
          {places.map((_place) => (
            <MenuItem key={_place} onClick={() => setPlace(_place)}>
              {_place}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Label title="상가명" required>
        <Input {...register("name")} placeholder="ex) 디오트" required />
      </Label>

      <Label title="상가주소" required>
        <Input {...register("address")} placeholder="ex) 서울 중구 다산로 293" required />
      </Label>

      <Button variant="secondary" onClick={onRemove}>
        삭제
      </Button>
    </Container>
  );
};

export const Container = styled.div`
  ${flex.column({ gap: 12 })}

  padding: 12px 0;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.border};
  `};
`;
