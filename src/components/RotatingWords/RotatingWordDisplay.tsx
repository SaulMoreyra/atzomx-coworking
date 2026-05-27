import cx from "classnames";
import React, { type FC } from "react";
import TypewriterCursor from "./TypewriterCursor";
import { splitWordSegments } from "./useRotatingTypewriter";

interface RotatingWordDisplayProps {
  text: string;
  showCursor?: boolean;
  className?: string;
}

const wordClassName =
  "font-sans text-3xl font-bold uppercase tracking-wide text-brand-green md:text-5xl lg:text-6xl";

/**
 * Mobile: one segment per line (vertical stack).
 * Tablet: wrapped row of segments.
 * Desktop: single horizontal line.
 */
const RotatingWordDisplay: FC<RotatingWordDisplayProps> = ({
  text,
  showCursor = false,
  className,
}) => {
  const segments = splitWordSegments(text);

  if (segments.length === 0) {
    return (
      <div className={cx("flex items-center justify-center", className)}>
        <span className={cx(wordClassName, "invisible")}>.</span>
        {showCursor ? <TypewriterCursor /> : null}
      </div>
    );
  }

  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center gap-0.5",
        "sm:flex-row sm:flex-wrap sm:gap-x-2 sm:gap-y-1",
        "lg:flex-nowrap lg:gap-x-2",
        className
      )}>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        if (isLast && showCursor) {
          return (
            <span
              key={`${index}-${segment}`}
              className="inline-flex items-center justify-center lg:inline-flex">
              <span className={wordClassName}>{segment}</span>
              <TypewriterCursor />
            </span>
          );
        }

        return (
          <span
            key={`${index}-${segment}`}
            className={cx(wordClassName, "block text-center sm:inline-block lg:inline-block")}>
            {segment}
          </span>
        );
      })}
    </div>
  );
};

export default RotatingWordDisplay;
