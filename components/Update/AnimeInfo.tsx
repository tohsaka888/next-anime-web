import { Box, Flex, Text } from "@chakra-ui/react";
import { Typography } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import ScaleElement from "../springs/ScaleElement";
import { UpdatesProps } from "./type";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

function AnimeInfo({ cover_url, title, update_time, update_to }: UpdatesProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Flex
      flexWrap={["wrap", "nowrap"]}
      position={"relative"}
      onClick={() => {
        router.push(`/search/${title}`);
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
          width={"240px"}
          height={"320px"}
          className={styles.image}
          priority={true}
        />
        <Typography style={{ width: "240px", lineHeight: 1.1, marginTop: "8px" }}>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            {title}
          </Typography.Paragraph>
          <Typography.Paragraph ellipsis={{ rows: 1 }}>
            更新时间: {update_time}
          </Typography.Paragraph>
          <Typography.Paragraph ellipsis={{ rows: 1 }}>
            更新至: {update_to}
          </Typography.Paragraph>
        </Typography>
      </ScaleElement>
    </Flex>
  );
}

export default AnimeInfo;
