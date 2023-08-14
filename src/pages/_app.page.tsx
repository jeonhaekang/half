import { ChakraProvider } from "@chakra-ui/react";
import type { DehydratedState } from "@tanstack/react-query";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";

export const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <Head>
            <title>이분의일</title>
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
