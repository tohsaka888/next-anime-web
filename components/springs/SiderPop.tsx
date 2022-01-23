import React, { ReactNode } from "react";
import { useSpring, animated } from "react-spring";
import useScreenSize from "../hook/useScreenSize";
import { useRouter } from "next/router";
import { useBreakpoint } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isShow?: boolean;
};

function SiderPop({ children, isShow = true }: Props) {
  const { height } = useScreenSize();
  const router = useRouter();
  const breakpoint = useBreakpoint();

  const styles = useSpring<{ width: string; position: string; height: string }>(
    {
      width: isShow ? "15vw" : "5vw",
      position: "fixed",
      height: height - 60,
      display:
        router.pathname.includes("/anime") || breakpoint === "base"
          ? "none"
          : "block",
    }
  );
  return <animated.div style={styles}>{children}</animated.div>;
}

export default SiderPop;
