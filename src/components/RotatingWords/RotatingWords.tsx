"use client";

import cx from "classnames";
import React, { type FC } from "react";
import RotatingWordDisplay from "./RotatingWordDisplay";
import { maxSegmentCount, useRotatingTypewriter } from "./useRotatingTypewriter";

interface RotatingWordsProps {
  words: string[];
  className?: string;
}

const RotatingWords: FC<RotatingWordsProps> = ({ words, className }) => {
  const { displayed, showCursor } = useRotatingTypewriter(words);
  const lineCount = maxSegmentCount(words);

  return (
    <div
      className={cx(
        "flex w-full items-center justify-center overflow-hidden text-center",
        lineCount === 1 && "min-h-[1.2em]",
        lineCount === 2 && "min-h-[2.6em] lg:min-h-[1.2em]",
        lineCount >= 3 && "min-h-[4em] lg:min-h-[1.2em]",
        className
      )}
      aria-live="polite"
      aria-atomic="true">
      <RotatingWordDisplay text={displayed} showCursor={showCursor} />
    </div>
  );
};

export default RotatingWords;
