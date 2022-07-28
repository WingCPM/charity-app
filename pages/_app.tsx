import type { AppProps } from "next/app";
import {
  SessionProvider,
  SessionProviderProps,
  getSession,
} from "next-auth/react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import { Navigation } from "../components/Navigation";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function MyApp({
  Component,
  pageProps,
  session,
}: AppProps & { session: SessionProviderProps["session"] }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Navigation session={session} />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
