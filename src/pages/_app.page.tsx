import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { Button, Icon, Menu, MenuAnchor, MenuItem, MenuList } from "~/components/Commons";
import { Overlay } from "~/components/Utils";
import { GlobalStyle } from "~/styles/GlobalStyle";
import { FlexCenter, Position, size } from "~/styles/mixins";
import { darkTheme } from "~/styles/theme";

export const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <GlobalStyle />

          <FlexCenter style={{ padding: "12px 16px" }}>
            <Link href="/">
              <Image src={"/images/logo.png"} alt="로고" width={84} height={40} />
            </Link>
          </FlexCenter>

          <Component {...pageProps} />

          <Position position="fixed" bottom={12} right={12}>
            <Menu>
              <MenuAnchor>
                <Button size="large" shape="circle">
                  <Icon name="add" width={32} height={32} />
                </Button>
              </MenuAnchor>

              <MenuList vertical="top">
                <MenuItem onClick={() => router.push("/market")}>상가 등록</MenuItem>
                <MenuItem onClick={() => router.push("/store")}>상점 등록</MenuItem>
                <MenuItem onClick={() => router.push("/cart")}>카트</MenuItem>
                <MenuItem onClick={() => router.push("/order")}>주문</MenuItem>
              </MenuList>
            </Menu>
          </Position>
        </Container>
        <Overlay />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

export const Container = styled.div`
  ${size({ width: "100%", maxWidth: 800 })}

  margin: 0 auto;
`;

export const ImageContainer = styled.div`
  position: relative;

  width: 100%;
  height: 0;

  padding-bottom: 100%;
`;
