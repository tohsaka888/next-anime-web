import React, { ReactNode } from "react";
import { animated, useSpring, config } from "react-spring";

type Props = {
  children: ReactNode;
};

function JumpCard({ children }: Props) {
  const styles = useSpring({
    from: { transform: "translate3d(0px, 50px, 0px)" },
    to: { transform: "translate3d(0px, 0px, 0px)" },
    config: config.gentle,
  });
  return <animated.div style={styles}>{children}</animated.div>;
}

export default JumpCard;
