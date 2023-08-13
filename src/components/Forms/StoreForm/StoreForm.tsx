import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
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
  const { t } = useTranslation("store");

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
          <Label title={t("storeFormMarket")} full required>
            <Input
              placeholder={t("storeFormTitlePlaceholder")}
              value={market?.name ?? ""}
              readOnly
            />
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

      <Label title={t("storeFormName")} required>
        <Input {...register("name")} placeholder="ex) 피카소" required />
      </Label>

      <Label title={t("storeFormAddress")} required>
        <Input {...register("address")} placeholder="ex) 평화시장 어딘가" required />
      </Label>

      <Button variant="secondary" onClick={onRemove}>
        {t("storeFormDelete")}
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
