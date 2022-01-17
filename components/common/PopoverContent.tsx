import { Box, Divider, Flex, Heading, Tag } from "@chakra-ui/react";
import { List } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { ResultProps } from "../Result/type";

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
        setValue(item.title);
        router.push(`/search/${item.title}`);
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
      style={{ width: "40vw" }}
    />
  );
}

export default PopoverContent;
