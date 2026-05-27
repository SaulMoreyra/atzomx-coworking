import cx from "classnames";
import React, { type FC, type HTMLAttributes } from "react";

type LabelElement = "span" | "p" | "h1" | "h2" | "h3" | "h4";

interface LabelProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: LabelElement;
  className?: string;
}

/** Uppercase UI label with brand tracking — subtitles, nav, metadata */
const Label: FC<LabelProps> = ({ children, as: Tag = "span", className, ...props }) => {
  return (
    <Tag className={cx("text-label text-brand-green", className)} {...props}>
      {children}
    </Tag>
  );
};

export default Label;
