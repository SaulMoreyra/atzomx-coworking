import cx from "classnames";
import React, { type FC } from "react";

interface TypewriterCursorProps {
  className?: string;
}

const TypewriterCursor: FC<TypewriterCursorProps> = ({ className }) => (
  <span
    className={cx(
      "ml-0.5 inline-block h-[0.85em] w-[3px] shrink-0 animate-pulse bg-brand-green md:w-1",
      className
    )}
    aria-hidden="true"
  />
);

export default TypewriterCursor;
