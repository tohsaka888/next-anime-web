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
import JumpCard from "../springs/JumpCard";
// import JumpText from "../springs/JumpText";
import AnimeInfo from "./AnimeInfo";
import { Context } from "./context";
import { DailyAnimeProps } from "./type";

function DailyAnime({ date, updates }: DailyAnimeProps) {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Spin spinning={loading}>
      <Box padding="8px 16px" overflow={"hidden"}>
        <JumpCard>
          <Heading
            marginBottom={"8px"}
            size={"md"}
            color={colorMode === "dark" ? "#fff" : "#000"}
          >
            {date}
          </Heading>
          <Divider />
          <Flex flexWrap={"wrap"} mt={"16px"} ml={"16px"}>
            <Wrap spacing={"36px"}>
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
