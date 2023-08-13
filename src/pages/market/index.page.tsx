import styled from "@emotion/styled";
import type { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Button } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import type { MarketData } from "~/components/Forms";
import { MarketForm } from "~/components/Forms";
import { useInsertMarketsMutate } from "~/states/server";
import { Text, flex } from "~/styles/mixins";
import { uuid } from "~/utils";

const INIT_MARKET = {
  data: {
    name: "",
    address: ""
  },
  isValid: false
};

const Market = () => {
  const { toast } = useDialog();
  const { t } = useTranslation("market");
  const router = useRouter();

  const [markets, setMarkets] = useState(new Map([[uuid(), INIT_MARKET]]));

  const { mutate: insertMarketsMutate } = useInsertMarketsMutate({
    onSuccess: () => {
      toast({ type: "success", message: t("addMarketSuccessMessage") });

      router.replace("/");
    },
    onError: () => {
      toast({ type: "error", message: t("addMarketErrorMessage") });
    }
  });

  const handleAddMarket = () => {
    setMarkets((prevMarket) => {
      const addedMarkets = new Map(prevMarket);
      addedMarkets.set(uuid(), INIT_MARKET);

      return addedMarkets;
    });
  };

  const handleRemoveMarket = (id: string) => {
    if (markets.size <= 1) {
      return toast({ type: "warning", message: t("requiredOneMarket") });
    }

    setMarkets((prevMarket) => {
      const deletedMarkets = new Map(prevMarket);
      deletedMarkets.delete(id);

      return deletedMarkets;
    });
  };

  const handleUpdateMarket = useCallback((id: string, data: MarketData) => {
    setMarkets((prevMarkets) => {
      const updatedMarkets = new Map(prevMarkets);
      updatedMarkets.set(id, data);

      if (
        JSON.stringify([...prevMarkets.values()]) === JSON.stringify([...updatedMarkets.values()])
      ) {
        return prevMarkets;
      }

      return updatedMarkets;
    });
  }, []);

  const handleInsertMarkets = () => {
    const _isValid = [...markets.values()].every((market) => market.isValid);

    if (_isValid) {
      const _markets = [...markets.values()].map((market) => market.data);

      insertMarketsMutate(_markets);
    } else {
      toast({ type: "warning", message: t("insertAllData") });
    }
  };

  return (
    <Container>
      <Text size="heading3">{t("addMarketTitle")}</Text>

      {[...markets.keys()].map((id) => (
        <MarketForm
          key={id}
          onChange={(market) => handleUpdateMarket(id, market)}
          onRemove={() => handleRemoveMarket(id)}
        />
      ))}

      <Button variant="secondary" type="button" onClick={handleAddMarket}>
        {t("addMarketItem")}
      </Button>

      <Button onClick={handleInsertMarkets}>{t("addMarket")}</Button>
    </Container>
  );
};

export default Market;

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "market"]))
    }
  };
}

export const Container = styled.div`
  ${flex.column({ gap: 16 })};

  padding: 16px;
`;
