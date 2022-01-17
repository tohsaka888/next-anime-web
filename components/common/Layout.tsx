import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode, useEffect, useRef } from "react";
import Header from "./Header";
import Sider from "./Sider";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  return (
    <Box position={"relative"}>
      <Header />
      <Flex overflow={"auto"}>
        <Sider />
        <Box ml={"250px"}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

export default Layout;
