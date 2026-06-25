"use client";

import cx from "classnames";
import React, { type FC } from "react";
import RotatingWordDisplay from "./RotatingWordDisplay";
import { useRotatingTypewriter } from "./useRotatingTypewriter";

interface RotatingWordsProps {
  words: string[];
  className?: string;
  align?: "left" | "center";
  wordClassName?: string;
}

const RotatingWords: FC<RotatingWordsProps> = ({
  words,
  className,
  align = "center",
  wordClassName,
}) => {
  const { displayed, showCursor } = useRotatingTypewriter(words);

  return (
    <div
      className={cx(
        "flex w-full min-h-[1.2em] overflow-hidden",
        align === "left"
          ? "items-start justify-start text-left"
          : "items-center justify-center text-center",
        className
      )}
      aria-live="polite"
      aria-atomic="true">
      <RotatingWordDisplay
        text={displayed}
        showCursor={showCursor}
        align={align}
        wordClassName={wordClassName}
      />
    </div>
  );
};

export default RotatingWords;
