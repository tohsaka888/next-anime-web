import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Heading,
  Tag,
  Wrap,
} from "@chakra-ui/react";
import { Button, Image, message, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useScreenSize from "../../components/hook/useScreenSize";
import { Source } from "../../components/styles/search.styles";
import VideoPlayer from "../../components/VideoPlayer";
import { AnimeDetailProps } from "./type";

function AnimeDetail() {
  const router = useRouter();
  const [anime, setAnime] = useState<AnimeDetailProps | null>(null);
  const [format, setFormat] = useState<string>("");
  const [animeUrl, setAnimeUrl] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const { width, height } = useScreenSize();
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
      setAnimeUrl(data.raw_url);
      if (data.format === "hls") {
        setFormat("application/x-mpegURL");
      } else {
        setFormat(data.format);
      }
      setIsLoad(true);
    }
  }, []);

  return (
    <Box padding={"16px"} width={width} height={height - 60} overflow={"auto"}>
      <Flex>
        <Flex flex={3} style={{ aspectRatio: "16 / 9" }}>
          <VideoPlayer
            isReady={isLoad}
            options={{
              sources: [{ src: animeUrl, type: `video/${format}` }],
            }}
          />
        </Flex>
        <Flex flex={1} flexWrap="wrap" overflow={"auto"} maxH={height - 100}>
          {anime &&
            anime.play_lists.map((item, index) => (
              <Box key={index}>
                <Heading size={"sm"} ml={"24px"} mb={"8px"}>
                  {item.name}
                </Heading>
                <Flex ml={"18px"} flexWrap={"wrap"} overflow={"auto"}>
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
            ))}
        </Flex>
      </Flex>
      {anime && (
        <Flex margin={"24px 0px"} maxWidth="75%">
          <Image
            src={anime.cover_url}
            alt={anime.title}
            width="150px"
            style={{ aspectRatio: "3 / 4", minWidth: "150px" }}
          />
          <Box ml={"16px"}>
            <Flex align="center" justify={"space-between"}>
              <Heading
                size={"md"}
                mb={"8px"}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
              >
                {anime.title}
              </Heading>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  router.back();
                }}
              >
                返回
              </Button>
            </Flex>

            <Flex mb={"16px"} align={"center"}>
              <Heading size={"sm"}>播放源:</Heading>
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
                  }}
                  ellipsis={{ rows: 4 }}
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
