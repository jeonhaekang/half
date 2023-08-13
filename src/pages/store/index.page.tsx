import styled from "@emotion/styled";
import type { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Button } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import type { StoreData } from "~/components/Forms";
import { StoreForm } from "~/components/Forms";
import { useInsertStoresMutate } from "~/states/server";
import { Text, flex } from "~/styles/mixins";
import { uuid } from "~/utils";

const INIT_STORES = {
  data: {
    marketId: "",
    name: "",
    address: ""
  },
  isValid: false
};

const Stores = () => {
  const { toast } = useDialog();
  const { t } = useTranslation("store");
  const router = useRouter();

  const [stores, setStores] = useState(new Map([[uuid(), INIT_STORES]]));

  const { mutate: insertStoresMutate } = useInsertStoresMutate({
    onSuccess: () => {
      toast({ type: "success", message: t("addStoreSuccessMessage") });

      router.replace("/");
    },
    onError: () => {
      toast({ type: "error", message: t("addStoreErrorMessage") });
    }
  });

  const handleAddStores = () => {
    setStores((prevStores) => {
      const addedStores = new Map(prevStores);
      addedStores.set(uuid(), INIT_STORES);

      return addedStores;
    });
  };

  const handleRemoveStores = (id: string) => {
    if (stores.size <= 1) {
      return toast({ type: "warning", message: "requiredOneStore" });
    }

    setStores((prevStores) => {
      const deletedStores = new Map(prevStores);
      deletedStores.delete(id);

      return deletedStores;
    });
  };

  const handleUpdateStores = useCallback((id: string, data: StoreData) => {
    setStores((prevStores) => {
      const updatedStores = new Map(prevStores);
      updatedStores.set(id, data);

      if (
        JSON.stringify([...prevStores.values()]) === JSON.stringify([...updatedStores.values()])
      ) {
        return prevStores;
      }

      return updatedStores;
    });
  }, []);

  const handleInsertStores = () => {
    const _isValid = [...stores.values()].every((stores) => stores.isValid);

    if (_isValid) {
      const _stores = [...stores.values()].map((stores) => stores.data);

      insertStoresMutate(_stores);
    } else {
      toast({ type: "warning", message: "insertAllData" });
    }
  };

  return (
    <Container>
      <Text size="heading3">{t("addStoreTitle")}</Text>

      {[...stores.keys()].map((id) => (
        <StoreForm
          key={id}
          onChange={(Stores) => handleUpdateStores(id, Stores)}
          onRemove={() => handleRemoveStores(id)}
        />
      ))}

      <Button variant="secondary" type="button" onClick={handleAddStores}>
        {t("addStoreItem")}
      </Button>

      <Button onClick={handleInsertStores}>{t("addStore")}</Button>
    </Container>
  );
};

export default Stores;

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "store"]))
    }
  };
}

export const Container = styled.div`
  ${flex.column({ gap: 16 })};

  padding: 16px;
`;
