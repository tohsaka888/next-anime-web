import React, { ReactNode } from "react";
import { animated, config, useSpring } from "react-spring";

type Props = {
  isHover?: boolean;
  children: ReactNode;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

function ScaleElement({ isHover = false, children, ...props }: Props) {
  const styles = useSpring({
    transform: isHover ? "scale(1.1)" : "scale(1)",
    cursor: "pointer",
    config: config.gentle,
  });
  return (
    <animated.div style={styles} {...props}>
      {children}
    </animated.div>
  );
}

export default ScaleElement;
