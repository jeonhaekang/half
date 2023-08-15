import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { Button, Icon, Menu, MenuAnchor, MenuItem, MenuList } from "~/components/Commons";
import { Overlay } from "~/components/Utils";
import { GlobalStyle } from "~/styles/GlobalStyle";
import { Flex, Position, Text, size } from "~/styles/mixins";
import { darkTheme } from "~/styles/theme";

export const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <Head>
          <title>이분의일</title>
        </Head>
        <Container>
          <GlobalStyle />
          <Flex style={{ padding: "12px 16px" }}>
            <Link href="/">
              <Text>이분의일</Text>
            </Link>
          </Flex>
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
