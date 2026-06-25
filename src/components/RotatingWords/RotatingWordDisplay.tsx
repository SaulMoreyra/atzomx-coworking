import cx from "classnames";
import React, { type FC } from "react";
import TypewriterCursor from "./TypewriterCursor";

interface RotatingWordDisplayProps {
  text: string;
  showCursor?: boolean;
  align?: "left" | "center";
  wordClassName?: string;
}

const defaultWordClassName =
  "text-display text-3xl leading-none text-brand-green md:text-5xl lg:text-6xl";

const RotatingWordDisplay: FC<RotatingWordDisplayProps> = ({
  text,
  showCursor = false,
  align = "center",
  wordClassName = defaultWordClassName,
}) => {
  const isLeft = align === "left";

  return (
    <span
      className={cx(
        "inline-flex max-w-full items-baseline whitespace-nowrap",
        isLeft ? "justify-start" : "justify-center"
      )}>
      <span className={cx(wordClassName, !text && "invisible")}>
        {text || "."}
      </span>
      {showCursor ? <TypewriterCursor /> : null}
    </span>
  );
};

export default RotatingWordDisplay;
