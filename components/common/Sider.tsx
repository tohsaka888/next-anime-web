import { Box, Flex, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { Divider, Menu } from "antd";
import { MdUpdate, MdOutlineHistory, MdFavoriteBorder } from "react-icons/md";
import { MenuShowContext } from "./Context";
import SiderPop from "../springs/SiderPop";

function Sider() {
  const { colorMode } = useColorMode();
  const props = useContext(MenuShowContext);
  return (
    <SiderPop isShow={props?.menuShow}>
      <Menu
        defaultSelectedKeys={["update"]}
        theme={colorMode}
        style={{ height: "100%", background: "transparent", width: "100%" }}
      >
        <Menu.Item key={"update"}>
          <Flex align="center" justify={"center"} height={"100%"}>
            <MdUpdate size={20} />
            {props?.menuShow && (
              <span style={{ marginLeft: "8px" }}>最近更新</span>
            )}
          </Flex>
        </Menu.Item>
        <Menu.Item key={"history"}>
          <Flex align="center" justify={"center"} height={"100%"}>
            <MdOutlineHistory size={20} />
            {props?.menuShow && (
              <span style={{ marginLeft: "8px" }}>播放历史</span>
            )}
          </Flex>
        </Menu.Item>
        <Menu.Item key={"collect"}>
          <Flex align="center" justify={"center"} height={"100%"}>
            <MdFavoriteBorder size={20} />
            {props?.menuShow && (
              <span style={{ marginLeft: "8px" }}>用户收藏</span>
            )}
          </Flex>
        </Menu.Item>
      </Menu>
      <Divider />
    </SiderPop>
  );
}

export default Sider;
