import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Button, Toggle } from "~/components/Commons";
import { useThemeStore } from "~/states/client";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Header.styles";

export const Header = () => {
  const { theme, toggle } = useThemeStore();
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <Styled.Header>
      <Text>{t("title")}</Text>

      <FlexCenter gap={12}>
        <Button
          size="small"
          onClick={() => {
            router.push(router.pathname, router.pathname, { locale: "ko" });
          }}
        >
          한국어
        </Button>

        <Button
          size="small"
          onClick={() => {
            router.push(router.pathname, router.pathname, { locale: "jp" });
          }}
        >
          日本語
        </Button>

        <Toggle checked={theme} onChange={toggle} />
      </FlexCenter>
    </Styled.Header>
  );
};
