import {
  Box,
  Divider,
  Flex,
  Heading,
  useColorMode,
  Wrap,
} from "@chakra-ui/react";
import { Spin } from "antd";
import React, { useState } from "react";
import useScreenSize from "../hook/useScreenSize";
import JumpCard from "../springs/JumpCard";
// import JumpText from "../springs/JumpText";
import AnimeInfo from "./AnimeInfo";
import { Context } from "./context";
import { DailyAnimeProps } from "./type";

function DailyAnime({ date, updates }: DailyAnimeProps) {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useScreenSize();
  return (
    <Spin spinning={loading}>
      <Box padding="0px 2vw" overflow={"hidden"}>
        <JumpCard>
          <Heading
            marginBottom={"8px"}
            size={"md"}
            color={colorMode === "dark" ? "#fff" : "#000"}
            padding={"0px 16px"}
          >
            {date}
          </Heading>
          <Divider />
          <Flex
            flexWrap={"wrap"}
            padding={"16px 0px"}
            margin={[`0px ${(width - 330) / 2}px`, "0px"]}
            justify={"space-between"}
            width={["330px", "100%"]}
          >
            <Wrap spacing={["24px", "36px"]}>
              {updates.map((item, index) => (
                <AnimeInfo {...item} key={index} />
              ))}
            </Wrap>
          </Flex>
        </JumpCard>
      </Box>
    </Spin>
  );
}

export default DailyAnime;
