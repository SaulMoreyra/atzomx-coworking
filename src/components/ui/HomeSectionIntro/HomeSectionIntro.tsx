import cx from "classnames";
import React, { type FC } from "react";

interface HomeSectionIntroProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  className?: string;
  titleClassName?: string;
  titleAs?: "h2" | "h3";
}

const HomeSectionIntro: FC<HomeSectionIntroProps> = ({
  title,
  subtitle,
  kicker,
  className,
  titleClassName,
  titleAs: TitleTag = "h2",
}) => (
  <header className={cx("max-w-xl min-w-0", className)}>
    {kicker ? (
      <p className="text-label mb-3 text-[10px] tracking-[0.22em] text-brand-green/50 md:text-xs">{kicker}</p>
    ) : null}
    <TitleTag
      className={cx(
        "text-display-prose min-w-0 [overflow-wrap:anywhere] font-bold leading-tight text-brand-green",
        titleClassName ?? "text-2xl md:text-3xl lg:text-4xl"
      )}>
      {title}
    </TitleTag>
    {subtitle ? (
      <>
        <div className="mt-4 h-px w-full max-w-[4rem] bg-brand-green" aria-hidden="true" />
        <p className="text-body mt-4 text-sm leading-relaxed text-brand-green/70 md:text-base">{subtitle}</p>
      </>
    ) : null}
  </header>
);

export default HomeSectionIntro;
