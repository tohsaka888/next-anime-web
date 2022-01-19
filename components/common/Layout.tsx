import { Box, Flex, useBreakpoint } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sider from "./Sider";
import { Context } from "../Update/context";
import { Spin } from "antd";
import SearchArea from "./SearchArea";
import useScreenSize from "../hook/useScreenSize";
type Props = {
  children: ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const breakpoint = useBreakpoint();
  return (
    <Box position={"relative"}>
      <Header />
      {breakpoint === "base" && <SearchArea />}
      <Context.Provider value={{ loading, setLoading }}>
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
