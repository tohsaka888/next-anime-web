import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Heading,
  Tag,
  useBreakpoint,
  useColorMode,
  Wrap,
} from "@chakra-ui/react";
import { Button, Image, message, Typography } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useScreenSize from "../../components/hook/useScreenSize";
import { Source } from "../../components/styles/search.styles";
import { AnimeDetailProps } from "../../config/type";

const VideoPlayer = dynamic(() => import("../../components/VideoPlayer"), {
  ssr: false,
});

function AnimeDetail() {
  const router = useRouter();
  const [anime, setAnime] = useState<AnimeDetailProps | null>(null);
  const [format, setFormat] = useState<string>("");
  const [animeUrl, setAnimeUrl] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const { width, height } = useScreenSize();
  const breakpoint = useBreakpoint();
  const { colorMode } = useColorMode();
  const getAnimeDetail = useCallback(async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setAnime(data);
  }, []);
  useEffect(() => {
    if (router.query) {
      if (typeof router.query.url === "string") {
        let url = router.query.url;
        getAnimeDetail(url);
      }
    }
  }, [getAnimeDetail, router.query]);

  const getAnimeUrl = useCallback(async (url: string) => {
    setIsLoad(false);
    setAnimeUrl("");
    setFormat("");
    const res = await fetch(url);
    const data = await res.json();
    if (!data.format) {
      message.error("此播放源失效,请切换线路!");
    } else {
      // 测试HLS播放
      // setAnimeUrl(
      //   "http://81.68.113.218:6001/anime/6166616e677c3538303135/0/0/url"
      // );
      // setFormat("application/x-mpegURL");

      setAnimeUrl(data.raw_url);
      if (data.format === "hls") {
        setFormat("application/x-mpegURL");
      } else {
        setFormat(`video/${data.format}`);
      }
      setIsLoad(true);
    }
  }, []);

  return (
    <Box
      padding={["0px", "16px"]}
      width={width}
      height={height - 60}
      overflow={"auto"}
    >
      <Flex flexDir={["column", "row"]}>
        <Flex
          flex={[1, 3]}
          style={{ aspectRatio: "16 / 9" }}
          minW={["unset", "500px"]}
        >
          <VideoPlayer
            isReady={isLoad}
            options={{ sources: [{ src: animeUrl, type: format }] }}
          />
        </Flex>
        <Flex
          flex={1}
          flexWrap="wrap"
          overflow={"auto"}
          maxH={[height / 2, height - 100]}
          mt={["16px", "0px"]}
          justify="center"
          className="scroll"
        >
          {anime &&
            anime.play_lists.map((item, index) => (
              <Box key={index}>
                <Heading
                  size={"sm"}
                  ml={["8px", "24px"]}
                  mb={["16px", "8px"]}
                  color={colorMode === "dark" ? "#fff" : "#000"}
                >
                  {item.name}
                </Heading>
                <Flex
                  ml={["auto", "18px"]}
                  mr={["auto"]}
                  flexWrap={"wrap"}
                  overflow={"auto"}
                  w={"300px"}
                >
                  {item.video_list.map((video, i) => {
                    return (
                      <Button
                        key={i}
                        onClick={() => {
                          getAnimeUrl(video.info);
                        }}
                        style={{
                          marginLeft: "8px",
                          marginBottom: "8px",
                          minWidth: "90px",
                        }}
                      >
                        {video.name}
                      </Button>
                    );
                  })}
                </Flex>
              </Box>
            ))}
        </Flex>
      </Flex>
      {anime && (
        <Flex margin={["24px", "24px 0px"]} maxWidth={["100%", "75%"]}>
          <Image
            src={anime.cover_url}
            alt={anime.title}
            width={breakpoint === "base" ? "120px" : "170px"}
            style={{ aspectRatio: "3 / 4", minWidth: "120px" }}
          />
          <Box ml={"16px"} flex={1}>
            <Flex align="center" justify={"space-between"}>
              <Heading
                size={"md"}
                mb={"16px"}
                cursor={"pointer"}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                _hover={{ textDecoration: "underline" }}
                w={[width - 220, "75%"]}
                color={colorMode === "dark" ? "#fff" : "#000"}
              >
                {anime.title}
              </Heading>
              <Box display={["none", "block"]}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    router.back();
                  }}
                >
                  返回
                </Button>
              </Box>
            </Flex>

            <Flex mb={"16px"} align={"center"} display={["none", "flex"]}>
              <Heading
                size={"sm"}
                color={colorMode === "dark" ? "#fff" : "#000"}
              >
                播放源:
              </Heading>
              <Source>{anime.module}</Source>
            </Flex>
            <Wrap spacing={"8px"} mb={"16px"}>
              {anime.category.split(",").map((value) => (
                <Tag key={value}>{value || "暂无标签"}</Tag>
              ))}
            </Wrap>
            <Box>
              <Typography>
                <Typography.Paragraph
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: "15px",
                    color: colorMode === "dark" ? "#fff" : "#000",
                  }}
                  ellipsis={{
                    rows: breakpoint === "base" ? 3 : 5,
                    expandable: true,
                  }}
                >
                  {anime.description || "暂无介绍"}
                </Typography.Paragraph>
              </Typography>
            </Box>
          </Box>
        </Flex>
      )}
      {/* {anime &&
        anime?.play_lists.map((item, index) => {
          return (
            <Box key={index}>
              <Heading size={"sm"} mt={"8px"}>
                {item.name}
              </Heading>
              <Divider margin={"8px 0px"} />
              <Flex align={"center"} flexWrap="wrap">
                {item.video_list.map((video, i) => {
                  return (
                    <Button
                      key={i}
                      onClick={() => {
                        getAnimeUrl(video.info);
                      }}
                      style={{ marginLeft: "8px", marginBottom: "8px" }}
                    >
                      {video.name}
                    </Button>
                  );
                })}
              </Flex>
            </Box>
          );
        })} */}
    </Box>
  );
}

export default AnimeDetail;
