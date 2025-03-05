"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Menu, X, Coffee } from "react-feather";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import { type Locale } from "@/i18n/config";

const menuLeftItems = ["about", "plans", "reviews", "contact"];

const Header = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onScrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onClickItem = (id: string) => {
    onScrollToElement(id);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full">
      <div className="relative bg-gray-50 items-center justify-between py-7 px-10 xl:px-20 z-30">
        <div className="flex items-center h-full">
          <div className="flex lg:hidden flex-1 transition-all duration-300">
            <X
              onClick={toggleMenu}
              size={20}
              className={cx("min-w-[40px]", isMenuOpen ? "block" : "hidden")}
            />
            <Menu
              onClick={toggleMenu}
              size={20}
              className={cx("min-w-[40px]", isMenuOpen ? "hidden" : "block")}
            />
          </div>
          <div className="hidden lg:flex flex-1">
            <ul className="flex gap-5 xl:gap-10 items-center h-full text-lg lg:text-xl">
              {menuLeftItems.map((id, index) => (
                <li
                  className="cursor-pointer"
                  key={index}
                  onClick={() => {
                    onScrollToElement(id);
                  }}>
                  {t(id)}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full">
            <Link
              href="/"
              className="flex flex-col items-center h-full justify-center">
              <div className="font-druk text-4xl">
                <Image
                  src="/images/logos/logo-symbol.svg"
                  width={42}
                  height={42}
                  alt="Logo"
                  className="invert"
                />
              </div>
            </Link>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <ul className="flex gap-3 xl:gap-5 items-center h-full text-lg lg:text-xl">
              <li>
                <Link
                  href="/menu"
                  target="_blank"
                  className="flex items-center gap-1">
                  <Coffee
                    onClick={toggleMenu}
                    size={20}
                    className={"min-w-[40px] block lg:hidden"}
                  />
                  <span className="hidden lg:block cursor-pointer">
                    {t("menu")}
                  </span>
                </Link>
              </li>
              <li>
                <LocaleSwitch locale={locale} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={cx(
          "block lg:hidden",
          "absolute min-h-screen bg-gray-50 left-0 w-full py-10 px-10 transition-all duration-300 z-10",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
        <ul className="flex flex-col items-center gap-10 h-full text-xl">
          {menuLeftItems.map((id, index) => (
            <li
              key={index}
              onClick={() => {
                onClickItem(id);
              }}>
              {t(id)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
