import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { ChakraProvider, theme } from "@chakra-ui/react";
import Layout from "../components/common/Layout";
import { WebsocketContext } from "../components/WebsocketContext";
import { animeUrl, wsAnimeUrl } from "../config/baseUrl";
import { useEffect, useRef, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const wsRef = useRef<WebSocket>();
  useEffect(() => {
    wsRef.current = new WebSocket(`${wsAnimeUrl}`);
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <WebsocketContext.Provider value={{ wsRef }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WebsocketContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
