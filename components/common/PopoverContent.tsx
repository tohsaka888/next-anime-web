import {
  Box,
  Divider,
  Flex,
  Heading,
  Tag,
  useBreakpoint,
} from "@chakra-ui/react";
import { List } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useScreenSize from "../hook/useScreenSize";
import { ResultProps } from "../Result/type";
import { Context } from "../Update/context";

const RenderItem = ({
  item,
  index,
  setValue,
}: {
  item: ResultProps;
  index: number;
  setValue: Function;
}) => {
  const tagArr = item.category.split(",");
  const router = useRouter();
  const props = useContext(Context);
  return (
    <Flex
      w={"100%"}
      height="36px"
      align={"center"}
      justify={"space-between"}
      cursor="pointer"
      padding={"8px"}
      _hover={{ background: "#E6f7ff" }}
      borderRadius="5px"
      key={index}
      onClick={() => {
        props?.setLoading(true);
        setValue(item.title);
        const encodeTitle = encodeURIComponent(item.title);
        router.push(`/search/${encodeTitle}`).then(() => {
          props?.setLoading(false);
        });
      }}
    >
      <Heading size={"sm"} _hover={{ color: "#1890ff" }}>
        {item.title}
      </Heading>
      <Box>
        {tagArr.map((value) => (
          <Tag mr={"3px"} key={value}>
            {value || "暂无标签"}
          </Tag>
        ))}
      </Box>
    </Flex>
  );
};

function PopoverContent({
  result,
  setValue,
}: {
  result: ResultProps[];
  setValue: Function;
}): JSX.Element {
  const breakpoint = useBreakpoint();
  const { width } = useScreenSize();

  return (
    <List
      dataSource={result.slice(0, 15)}
      header={
        <Flex justify={"space-between"}>
          <span>{"共有" + result.length + "条搜索结果"}</span>
          <span>仅显示前15条搜索结果</span>
        </Flex>
      }
      renderItem={(item, index) => (
        <RenderItem item={item} index={index} setValue={setValue} />
      )}
      style={{ width: breakpoint === "base" ? width - 30 : "40vw" }}
    />
  );
}

export default PopoverContent;
