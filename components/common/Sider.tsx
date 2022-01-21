import { Box, Flex, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Divider, Menu } from "antd";
import { MdUpdate, MdOutlineHistory, MdFavoriteBorder } from "react-icons/md";

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
        <Menu.Item key={"update"}>
          <Flex align="center" justify={"center"} pr={"16px"}>
            <MdUpdate size={20} />
            <span style={{ marginLeft: "8px" }}>最近更新</span>
          </Flex>
        </Menu.Item>
        <Menu.Item key={"history"}>
          <Flex align="center" justify={"center"} pr={"16px"}>
            <MdOutlineHistory size={20} />
            <span style={{ marginLeft: "8px" }}>播放历史</span>
          </Flex>
        </Menu.Item>
        <Menu.Item key={"collect"}>
          <Flex align="center" justify={"center"} pr={"16px"}>
            <MdFavoriteBorder size={20} />
            <span style={{ marginLeft: "8px" }}>用户收藏</span>
          </Flex>
        </Menu.Item>
      </Menu>
      <Divider />
    </Box>
  );
}

export default Sider;
