import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sider from "./Sider";
import { Context } from "../Update/context";
import { Spin } from "antd";
type Props = {
  children: ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Box position={"relative"}>
      <Header />
      <Context.Provider value={{ loading, setLoading }}>
        <Flex overflow={"auto"}>
          {!router.pathname.includes("/anime") && <Sider />}
          <Box ml={router.pathname.includes("/anime") ? "0px" : "250px"}>
            <Spin spinning={loading}>{children}</Spin>
          </Box>
        </Flex>
      </Context.Provider>
    </Box>
  );
}

export default Layout;
