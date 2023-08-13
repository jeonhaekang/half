import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { Button, Input, Label } from "~/components/Commons";
import { useInputForm } from "~/hooks";
import { flex } from "~/styles/mixins";

export interface MarketData {
  data: {
    name: string;
    address: string;
  };
  isValid: boolean;
}

export const MarketForm = ({
  onChange,
  onRemove
}: {
  onChange: (market: MarketData) => void;
  onRemove?: VoidFunction;
}) => {
  const { t } = useTranslation("market");

  const { data, register, isValid } = useInputForm({ name: "", address: "" });

  useEffect(() => {
    onChange({ data, isValid });
  }, [data, isValid, onChange]);

  return (
    <Container>
      <Label title={t("marketNameTitle")} required>
        <Input {...register("name")} placeholder="ex) 디오트" required />
      </Label>

      <Label title={t("marketAddressTitle")} required>
        <Input {...register("address")} placeholder="ex) 서울 중구 다산로 293" required />
      </Label>

      <Button variant="secondary" onClick={onRemove}>
        {t("marketItemDelete")}
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
