import Link from "next/link";
import React from "react";
import cx from "classnames";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import { useLocale } from "next-intl";
import { type Locale } from "@/i18n/config";

interface MenuHeaderProps {
  className?: string;
}

const MenuHeader = ({ className }: MenuHeaderProps) => {
  const locale = useLocale() as Locale;

  return (
    <header className={cx("site-header-shell site-header-bar w-full", className)}>
      <div className="site-header-bar-inner flex items-center bg-brand-main text-brand-green max-md:border-b-0 md:border-b md:border-brand-green/10">
        <div className="section-container flex h-[4.5rem] w-full items-center justify-between">
          <Link
            href="/"
            className="text-display rounded-sm text-xl tracking-wide focus-brand sm:text-2xl"
            aria-label="Inicio">
            ATZOMX
          </Link>
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
