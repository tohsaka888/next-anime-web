import {
  Box,
  Flex,
  Heading,
  Tag,
  useBreakpoint,
  useColorMode,
  Wrap,
} from "@chakra-ui/react";
import { Button, Image, Result, Spin, Typography } from "antd";
import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
// import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { MenuShowContext } from "../../components/common/Context";
import useScreenSize from "../../components/hook/useScreenSize";
import { ResultProps } from "../../components/Result/type";
import { Score, Source } from "../../components/styles/search.styles";
import { Context } from "../../components/Update/context";
import { DailyAnimeProps } from "../../components/Update/type";
import { animeUrl } from "../../config/baseUrl";

const SearchResult: NextPage<{ result: ResultProps[] | [] }> = ({ result }) => {
  const router = useRouter();
  const [animeInfo, setAnimeInfo] = useState<ResultProps[]>([]);
  const { height, width } = useScreenSize();
  const { colorMode } = useColorMode();
  const props = useContext(Context);
  const breakpoint = useBreakpoint();
  const getAnimeInfo = useCallback(async () => {
    const res = await fetch(`${animeUrl}/anime/search/${router.query?.name}`);
    const data = await res.json();
    setAnimeInfo(data);
  }, [router.query?.name]);
  useEffect(() => {
    props?.setLoading(true);
    if (result && result.length) {
      setAnimeInfo(result);
      props?.setLoading(false);
    } else {
      getAnimeInfo();
      props?.setLoading(false);
    }
  }, [getAnimeInfo, props, result]);
  const menuProps = useContext(MenuShowContext);
  return (
    <Spin spinning={props?.loading}>
      <Box
        h={height - 60}
        w={[width, menuProps?.menuShow ? "85vw" : "95vw"]}
        overflow={"auto"}
        padding={"16px"}
        overflowX={"hidden"}
      >
        {animeInfo.length !== 0 ? (
          <Box>
            {animeInfo.map((anime, index) => {
              return (
                <Flex key={index} marginBottom={"16px"}>
                  <Box>
                    <Image
                      src={anime.cover_url}
                      alt={anime.title}
                      width={breakpoint === "base" ? 120 : 180}
                      height={breakpoint === "base" ? 160 : 240}
                    />
                  </Box>

                  <Box ml={"16px"} flex={1}>
                    <Heading
                      size={"md"}
                      mb={"8px"}
                      cursor={"pointer"}
                      _hover={{ textDecoration: "underline" }}
                      color={colorMode === "dark" ? "#fff" : "#000"}
                      onClick={() => {
                        props?.setLoading(true);
                        router.push(`/anime/${encodeURIComponent(anime.url)}`);
                      }}
                    >
                      {anime.title}
                    </Heading>
                    <Flex mb={"8px"} align={"center"}>
                      <Heading
                        size={"md"}
                        color={colorMode === "dark" ? "#fff" : "#000"}
                      >
                        ??????:
                      </Heading>
                      <Score>{anime.score}</Score>
                    </Flex>
                    <Flex
                      mb={"16px"}
                      align={"center"}
                      flexWrap={"nowrap"}
                      overflow={"hidden"}
                    >
                      <Heading
                        size={"sm"}
                        minW={"60px"}
                        color={colorMode === "dark" ? "#fff" : "#000"}
                      >
                        ?????????:
                      </Heading>
                      <Source>{anime.module}</Source>
                    </Flex>
                    <Wrap spacing={"8px"} mb={"16px"}>
                      {anime.category.split(",").map((value) => (
                        <Tag key={value}>{value || "????????????"}</Tag>
                      ))}
                    </Wrap>
                    <Box
                      w={["100px", "200px", "300px", "500px", "800px"]}
                      display={["none", "block"]}
                    >
                      <Typography>
                        <Typography.Paragraph
                          style={{
                            whiteSpace: "pre-wrap",
                            fontSize: "15px",
                            color: colorMode === "dark" ? "#fff" : "#000",
                          }}
                          ellipsis={{ rows: 4 }}
                        >
                          {anime.description || "????????????"}
                        </Typography.Paragraph>
                      </Typography>
                    </Box>
                  </Box>
                </Flex>
              );
            })}
          </Box>
        ) : (
          <>
            <Result
              status="404"
              title="404"
              subTitle="??????,????????????????????????"
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  ????????????
                </Button>
              }
            />
          </>
        )}
      </Box>
    </Spin>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${animeUrl}/anime/bangumi/updates`);
  const dailyAnimes: DailyAnimeProps[] = await res.json();

  // Get the paths we want to pre-render based on posts
  // params: { id: post.title },

  let paths: { params: { id: string } }[] = [];
  paths.concat(
    ...dailyAnimes.map((dailyAnime) => {
      return dailyAnime.updates.map((update) => ({
        params: { id: update.title },
      }));
    })
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let name: string = "";
  if (params?.name) {
    if (typeof params.name === "string") {
      name = params.name;
    }
  }
  name = encodeURI(name);
  let result: ResultProps[] = [];
  if (name) {
    const res = await fetch(`${animeUrl}/anime/search/${name}`);
    result = await res.json();
  }
  return {
    props: {
      result,
    },
  };
};

export default SearchResult;
