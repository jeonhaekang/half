import { useRouter } from "next/router";
import { Toggle } from "~/components/Commons";
import { useThemeStore } from "~/states/client";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Header.styles";

export const Header = () => {
  const { theme, toggle } = useThemeStore();
  const router = useRouter();

  return (
    <Styled.Header>
      <Text>이분의 일</Text>

      <FlexCenter gap={12}>
        <Toggle checked={theme} onChange={toggle} />
      </FlexCenter>
    </Styled.Header>
  );
};
