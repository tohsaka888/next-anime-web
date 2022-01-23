import { Box, Flex, useBreakpoint, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import Header from "./Header";
import { Context } from "../Update/context";
import { Spin } from "antd";
import SearchArea from "./SearchArea";
import dynamic from "next/dynamic";
import { MenuShowContext } from "./Context";
import ContentPop from "../springs/ContentPop";
type Props = {
  children: ReactNode;
};

const Sider = dynamic(() => import("./Sider"), { ssr: false });

function Layout({ children }: Props): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const breakpoint = useBreakpoint();
  const [menuShow, setMenuShow] = useState<boolean>(true);

  return (
    <Box position={"relative"}>
      <Context.Provider value={{ loading, setLoading }}>
        <MenuShowContext.Provider value={{ menuShow, setMenuShow }}>
          <Header />
          {breakpoint === "base" && <SearchArea />}
          <Flex overflow={"auto"} justify={["center", "flex-start"]}>
            {!router.pathname.includes("/anime") && <Sider />}
            <ContentPop>
              <Spin spinning={loading}>{children}</Spin>
            </ContentPop>
          </Flex>
        </MenuShowContext.Provider>
      </Context.Provider>
    </Box>
  );
}

export default Layout;
