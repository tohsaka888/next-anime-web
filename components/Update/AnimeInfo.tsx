import { Box, Flex, Text } from "@chakra-ui/react";
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
          width={"180px"}
          height={"240px"}
          className={styles.image}
          priority={true}
        />
        <Typography
          style={{ width: "180px", lineHeight: 1.1, marginTop: "8px" }}
        >
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            style={{ fontSize: "1rem", fontWeight: "bold", margin: "5px 0px" }}
          >
            {title}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            style={{ margin: "5px 0px", fontSize: "12px" }}
          >
            更新时间: {update_time}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            style={{ margin: "5px 0px", fontSize: "12px" }}
          >
            更新至: {update_to}
          </Typography.Paragraph>
        </Typography>
      </ScaleElement>
    </Flex>
  );
}

export default AnimeInfo;
