import Image from "next/image";
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
    <header
      className={cx(
        "bg-brand-cream border-b border-brand-green/15 text-brand-green min-h-[88px] md:min-h-[96px] flex items-center site-header-bar-inner shadow-sm",
        className
      )}>
      <div className="section-container flex w-full items-center gap-4">
        <Link href="/" className="flex flex-1 justify-start focus-brand rounded-sm" aria-label="Inicio">
          <Image
            src="/images/logos/logo-symbol.svg"
            alt="Atzomx"
            width={44}
            height={44}
          />
        </Link>
        <Link href="/" className="flex flex-1 justify-center focus-brand rounded-sm">
          <Image
            src="/images/logos/logo-letters.svg"
            alt="Atzomx"
            width={180}
            height={44}
            className="hidden sm:block"
          />
        </Link>
        <div className="flex flex-1 justify-end">
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
