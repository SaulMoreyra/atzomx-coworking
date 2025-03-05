import Image from "next/image";
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
        "bg-primary-main min-h-[132px] flex items-center",
        className
      )}>
      <div className="flex flex-1 w-full max-w-7xl px-10 mx-auto">
        <div className="flex flex-1 justify-start">
          <Image
            src="/images/logos/logo-symbol.svg"
            alt="logo"
            width={60}
            height={60}
          />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logos/logo-letters.svg"
              alt="logo"
              width={250}
              height={60}
            />
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
