import { useBreakpoint } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { MenuShowContext } from "../common/Context";

type Props = {
  children: ReactNode;
};

function ContentPop({ children }: Props) {
  const props = useContext(MenuShowContext);
  const router = useRouter();
  const breakpoint = useBreakpoint();
  const styles = useSpring({
    marginLeft:
      router.pathname.includes("/anime") || breakpoint === "base"
        ? "0px"
        : props?.menuShow
        ? "15vw"
        : "5vw",
  });
  return <animated.div style={styles}>{children}</animated.div>;
}

export default ContentPop;
