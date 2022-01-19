import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdWbSunny, MdDarkMode, MdSearch } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import SearchArea from "./SearchArea";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
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
        <Box
          className={styles.logo}
          cursor={"pointer"}
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </Box>
      </Flex>
      <Box w={["35vw", "40vw"]} display={["none", "none", "block"]} flex={2}>
        <SearchArea />
      </Box>
      <Flex flex={1} justify={"flex-end"}>
        {colorMode === "dark" ? (
          <MdWbSunny size={25} onClick={toggleColorMode} />
        ) : (
          <MdDarkMode size={25} onClick={toggleColorMode} />
        )}
        <a href="https://github.com/tohsaka888">
          <AiFillGithub size={25} style={{ marginLeft: "16px" }} />
        </a>
      </Flex>
    </Flex>
  );
}

export default Header;
