import { Box, Flex, useBreakpoint, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Context } from "../Update/context";
import { Spin } from "antd";
import SearchArea from "./SearchArea";
import dynamic from "next/dynamic";
type Props = {
  children: ReactNode;
};

const Sider = dynamic(() => import("./Sider"), { ssr: false });

function Layout({ children }: Props): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const breakpoint = useBreakpoint();
  const { colorMode } = useColorMode();
  return (
    <Box position={"relative"}>
      <Context.Provider value={{ loading, setLoading }}>
        <Header />
        {breakpoint === "base" && <SearchArea />}
        <Flex overflow={"auto"} justify={["center", "flex-start"]}>
          {!router.pathname.includes("/anime") && <Sider />}
          <Box
            ml={router.pathname.includes("/anime") ? "0px" : ["0px", "15vw"]}
          >
            <Spin spinning={loading}>{children}</Spin>
          </Box>
        </Flex>
      </Context.Provider>
    </Box>
  );
}

export default Layout;
