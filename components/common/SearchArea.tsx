import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useRouter } from "next/router";
import { wsAnimeUrl } from "../../config/baseUrl";
import { Popover } from "antd";
import PopoverContent from "./PopoverContent";
import { ResultProps } from "../Result/type";

function SearchArea() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<ResultProps[]>([]);
  useEffect(() => {
    const ws = new WebSocket(`${wsAnimeUrl}/anime/search`);
    ws.onopen = () => {
      setResult([]);
      // console.log("websocket已建立");
      ws.send(value);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setResult((result) => [...result, data]);
    };

    return () => {
      ws.close();
    };
  }, [value]);
  return (
    <InputGroup mb={["16px", "0px"]}>
      <Popover
        placement="bottomLeft"
        trigger={"focus"}
        content={<PopoverContent result={result} setValue={setValue} />}
      >
        <Input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          placeholder={"请输入搜索内容"}
        />
      </Popover>
      <InputRightElement>
        <IconButton
          icon={<MdSearch size={25} />}
          aria-label={""}
          onClick={() => {
            const encodeTitle = encodeURIComponent(value);
            router.push(`/search/${encodeTitle}`);
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchArea;
