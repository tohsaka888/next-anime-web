import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { ChakraProvider, theme } from "@chakra-ui/react";
import Layout from "../components/common/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
