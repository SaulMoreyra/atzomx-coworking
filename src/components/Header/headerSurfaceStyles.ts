import { type HeaderSurface } from "@/design-system/header";
import cx from "classnames";

export function getHeaderBarClassName({
  surface,
  isScrolled,
  isDynamic,
}: {
  surface: HeaderSurface;
  isScrolled: boolean;
  isDynamic: boolean;
}): string {
  if (!isDynamic) {
    return cx(
      "site-header-bar-inner text-brand-green transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none",
      isScrolled
        ? "border-b border-brand-green/15 bg-brand-cream shadow-md"
        : "border-b border-transparent bg-brand-main"
    );
  }

  const surfaceBg: Record<HeaderSurface, string> = {
    main: "bg-brand-main",
    cream: "bg-brand-cream",
    accent: "bg-brand-accent",
  };

  return cx(
    "site-header-bar-inner text-brand-green transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none",
    surfaceBg[surface],
    isScrolled ? "border-b border-brand-green/15 shadow-md" : "border-b border-transparent"
  );
}
