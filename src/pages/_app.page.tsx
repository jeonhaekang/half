import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import type { DehydratedState } from "@tanstack/react-query";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Overlay } from "~/components";
import { GlobalStyle } from "~/styles/GlobalStyle";
import { size } from "~/styles/mixins";
import { useApp } from "./_app.hooks";

export const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) => {
  const { currentTheme } = useApp();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Hydrate state={pageProps.dehydratedState}>
          <Container>
            <Head>
              <title>이분의일</title>
            </Head>
            <Component {...pageProps} />
          </Container>
        </Hydrate>
        <Overlay />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);

export const Container = styled.div`
  ${size({ width: "100%", maxWidth: 1300 })}

  margin: 0 auto;
`;
