import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Button, Input, Label, Menu, MenuAnchor, MenuItem, MenuList } from "~/components/Commons";
import { useInputForm } from "~/hooks";
import type { MarketRow } from "~/states/server";
import { useGetMarketsQuery } from "~/states/server";
import { flex } from "~/styles/mixins";

export interface StoreData {
  data: {
    marketId: string;
    name: string;
    address: string;
  };
  isValid: boolean;
}

export const StoreForm = ({
  onChange,
  onRemove
}: {
  onChange: (market: StoreData) => void;
  onRemove?: VoidFunction;
}) => {
  const [market, setMarket] = useState<MarketRow | null>(null);

  const { data, register, isValid } = useInputForm({
    name: "",
    address: ""
  });

  const { data: markets } = useGetMarketsQuery();

  useEffect(() => {
    const updatedData = {
      data: {
        ...data,
        marketId: market?.id ?? ""
      },
      isValid: isValid && !!market
    };

    onChange(updatedData);
  }, [data, isValid, market, onChange]);

  return (
    <Container>
      <Menu>
        <MenuAnchor>
          <Label title={"상가"} full required>
            <Input placeholder="선택해주세요." value={market?.name ?? ""} readOnly />
          </Label>
        </MenuAnchor>

        <MenuList full>
          {markets.map((market) => (
            <MenuItem key={market.id} onClick={() => setMarket(market)}>
              {market.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Label title="상점명" required>
        <Input {...register("name")} placeholder="ex) 피카소" required />
      </Label>

      <Label title="상점 위치" required>
        <Input {...register("address")} placeholder="ex) 평화시장 어딘가" required />
      </Label>

      <Button variant="secondary" onClick={onRemove}>
        삭제
      </Button>
    </Container>
  );
};

const Container = styled.div`
  ${flex.column({ gap: 12 })}

  padding: 12px 0;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.border};
  `};
`;
