import cx from "classnames";
import React, { type FC } from "react";

interface HeadingProps {
  children: string;
  className?: string;
  variant?: "section" | "display";
}

const Heading: FC<HeadingProps> = ({
  children,
  className,
  variant = "section",
}) => {
  const words = children.split(" ");
  const emphasisedWord = words.pop() ?? "";
  const nonEmphasisedWords = words.join(" ");

  if (variant === "display") {
    return (
      <h2
        className={cx(
          "text-display text-4xl md:text-5xl lg:text-6xl text-brand-green text-center",
          className
        )}>
        {children}
      </h2>
    );
  }

  return (
    <div
      className={cx(
        "flex flex-wrap gap-x-2 gap-y-1 justify-center text-2xl md:text-4xl lg:text-5xl text-brand-green",
        className
      )}>
      {nonEmphasisedWords && (
        <p className="text-label font-normal">{nonEmphasisedWords}</p>
      )}
      <div className="relative">
        <p className="text-label font-semibold">{emphasisedWord}</p>
        <div className="absolute right-0 bg-brand-main -translate-y-[4px] h-2 w-full rounded-sm" />
      </div>
    </div>
  );
};

export default Heading;
