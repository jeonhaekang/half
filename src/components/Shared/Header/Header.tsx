import { useTranslation } from "next-i18next";
import { Toggle } from "~/components/Commons";
import { useThemeStore } from "~/states/client";
import { Text } from "~/styles/mixins";
import * as Styled from "./Header.styles";

export const Header = () => {
  const { theme, toggle } = useThemeStore();
  const { t } = useTranslation("common");

  return (
    <Styled.Header>
      <Text>{t("title")}</Text>

      <Toggle checked={theme} onChange={toggle} />
    </Styled.Header>
  );
};
