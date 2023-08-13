import { useQueryClient } from "@tanstack/react-query";
import type { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import {
  Button,
  Icon,
  ItemTable,
  Menu,
  MenuAnchor,
  MenuItem,
  MenuList
} from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { Header } from "~/components/Shared";
import { SquareKey, useUpdateInventoryMutate } from "~/states/server";
import { FlexColumn, Position } from "~/styles/mixins";

export default function Home() {
  const { toast, confirm } = useDialog();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { t } = useTranslation("common");

  const { mutate: updateInventoryMutate } = useUpdateInventoryMutate({
    onSuccess: async () => {
      await queryClient.invalidateQueries(SquareKey.getItems());

      toast({ type: "success", message: t("stockSyncSuccessMessage") });
    },
    onError: () => {
      toast({ type: "error", message: t("stockSyncErrorMessage") });
    }
  });

  const handleRefresh = async () => {
    if (await confirm({ message: t("stockSyncConfirmMessage") })) {
      updateInventoryMutate();
    }
  };

  return (
    <FlexColumn>
      <Header />

      <ItemTable />

      <Position position="fixed" bottom={12} right={12}>
        <Menu>
          <MenuAnchor>
            <Button size="large" shape="circle">
              <Icon name="add" width={32} height={32} />
            </Button>
          </MenuAnchor>

          <MenuList vertical="top">
            <MenuItem onClick={handleRefresh}>{t("stockSync")}</MenuItem>
            <MenuItem onClick={() => router.push("/market")}>{t("addMarket")}</MenuItem>
            <MenuItem onClick={() => router.push("/store")}>{t("addStore")}</MenuItem>
          </MenuList>
        </Menu>
      </Position>
    </FlexColumn>
  );
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"]))
    }
  };
}
