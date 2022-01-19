import { Box, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Divider, Menu } from "antd";

function Sider() {
  const { colorMode } = useColorMode();
  const heightRef = useRef<string | number>("92vh");
  useEffect(() => {
    heightRef.current = screen.availHeight;
  }, []);
  return (
    <Box
      w={["0px", "100px", "15vw"]}
      // borderRight={"1px solid #cecece"}
      display={["none", "unset"]}
      h={heightRef.current}
      position={"fixed"}
    >
      <Menu
        defaultSelectedKeys={["update"]}
        theme={colorMode}
        style={{ height: "100%", background: "transparent" }}
      >
        <Menu.Item key={"update"}>最近更新</Menu.Item>
        <Menu.Item key={"history"}>播放历史</Menu.Item>
        <Menu.Item key={"collect"}>用户收藏</Menu.Item>
      </Menu>
      <Divider />
    </Box>
  );
}

export default Sider;
