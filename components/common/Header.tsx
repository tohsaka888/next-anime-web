import { Box, Flex, Icon, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MdWbSunny, MdDarkMode } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import SearchArea from "./SearchArea";
import { MdMenu } from "react-icons/md";
import { MenuShowContext } from "./Context";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const props = useContext(MenuShowContext);
  const router = useRouter();
  return (
    <Flex
      w={"100%"}
      h={"60px"}
      align={"center"}
      // borderBottom={"1px solid #cecece"}
      justify={"space-between"}
      padding={"16px"}
      paddingRight={"24px"}
      top={0}
    >
      <Flex flex={1}>
        <Box className={styles.logo} cursor={"pointer"}>
          <Flex align="center">
            <Icon
              as={MdMenu}
              w="25px"
              h={"25px"}
              mr={"16px"}
              _active={{
                opacity: 0.5,
              }}
              _hover={{
                color: "#1890ff",
              }}
              onClick={() => {
                props?.setMenuShow(!props.menuShow);
              }}
            />
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
              onClick={() => {
                router.push("/");
              }}
            />
          </Flex>
        </Box>
      </Flex>
      <Box w={["35vw", "40vw"]} display={["none", "none", "block"]} flex={2}>
        <SearchArea />
      </Box>
      <Flex flex={1} justify={"flex-end"}>
        {colorMode === "dark" ? (
          <Icon
            as={MdWbSunny}
            w="25px"
            h={"25px"}
            mr={"8px"}
            _active={{
              opacity: 0.5,
            }}
            _hover={{
              color: "#1890ff",
            }}
            onClick={toggleColorMode}
          />
        ) : (
          <Icon
            as={MdDarkMode}
            w="25px"
            h={"25px"}
            mr={"8px"}
            _active={{
              opacity: 0.5,
            }}
            _hover={{
              color: "#1890ff",
            }}
            onClick={toggleColorMode}
          />
        )}
        <a href="https://github.com/tohsaka888">
          <AiFillGithub size={25} style={{ marginLeft: "16px" }} />
        </a>
      </Flex>
    </Flex>
  );
}

export default Header;
