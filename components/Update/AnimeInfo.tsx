import { Box, Flex, Text, useBreakpoint, useColorMode } from "@chakra-ui/react";
import { Typography } from "antd";
import Image from "next/image";
import React, { useContext, useState } from "react";
import ScaleElement from "../springs/ScaleElement";
import { UpdatesProps } from "./type";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { Context } from "./context";

function AnimeInfo({ cover_url, title, update_time, update_to }: UpdatesProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const router = useRouter();
  const props = useContext(Context);
  const breakpoint = useBreakpoint();
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexWrap={["wrap", "nowrap"]}
      position={"relative"}
      onClick={() => {
        props?.setLoading(true);
        router.push(`/search/${title}`).then(() => {
          props?.setLoading(false);
        });
      }}
    >
      <ScaleElement
        isHover={isHover}
        onMouseOver={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <Image
          src={cover_url}
          alt="title"
          width={breakpoint === "base" ? "150px" : "180px"}
          height={breakpoint === "base" ? "200px" : "240px"}
          className={styles.image}
          priority={true}
        />
        <Typography
          style={{
            width: breakpoint === "base" ? "150px" : "180px",
            lineHeight: 1.2,
            margin: "8px 0px",
          }}
        >
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              margin: "5px 0px",
              color: colorMode === "dark" ? "#fff" : "#000",
            }}
          >
            {title}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            style={{
              margin: "5px 0px",
              fontSize: "12px",
              color: colorMode === "dark" ? "#fff" : "#000",
            }}
          >
            更新时间: <br /> {update_time}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            style={{
              margin: "5px 0px",
              fontSize: "12px",
              color: colorMode === "dark" ? "#fff" : "#000",
            }}
          >
            更新至: {update_to}
          </Typography.Paragraph>
        </Typography>
      </ScaleElement>
    </Flex>
  );
}

export default AnimeInfo;
