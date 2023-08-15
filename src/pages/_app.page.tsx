import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyle } from "~/styles/GlobalStyle";
import { size } from "~/styles/mixins";
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
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

export const Container = styled.div`
  ${size({ width: "100%", maxWidth: 800 })}

  margin: 0 auto;
`;
