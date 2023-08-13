import styled from "@emotion/styled";
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
  const router = useRouter();

  const [markets, setMarkets] = useState(new Map([[uuid(), INIT_MARKET]]));

  const { mutate: insertMarketsMutate } = useInsertMarketsMutate({
    onSuccess: () => {
      toast({ type: "success", message: "상가 등록에 성공하였습니다." });

      router.replace("/");
    },
    onError: () => {
      toast({ type: "error", message: "상가 등록에 실패하였습니다." });
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
      return toast({ type: "warning", message: "1개 이상의 상가가 필요합니다." });
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
      toast({ type: "warning", message: "모든 항목을 입력해주세요." });
    }
  };

  return (
    <Container>
      <Text size="heading3">상가 등록</Text>

      {[...markets.keys()].map((id) => (
        <MarketForm
          key={id}
          onChange={(market) => handleUpdateMarket(id, market)}
          onRemove={() => handleRemoveMarket(id)}
        />
      ))}

      <Button variant="secondary" type="button" onClick={handleAddMarket}>
        목록 추가
      </Button>

      <Button onClick={handleInsertMarkets}>등록 하기</Button>
    </Container>
  );
};

export default Market;

export const Container = styled.div`
  ${flex.column({ gap: 16 })};

  padding: 16px;
`;
