"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Menu, X, Coffee } from "react-feather";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import Button from "../Button/Button";
import { type Locale } from "@/i18n/config";

const menuLeftItems = ["about", "plans", "reviews", "contact"];

const Header = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const onScrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  const onClickItem = (id: string) => {
    onScrollToElement(id);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header-shell w-full">
      <div
        className={cx(
          "site-header-bar-inner text-brand-green transition-[background-color,box-shadow,border-color] duration-300",
          isScrolled
            ? "border-b border-brand-green/15 bg-brand-cream shadow-md"
            : "border-b border-transparent bg-brand-main"
        )}>
        <div className="section-container flex h-[4.5rem] items-center justify-between">
          <div className="flex items-center h-full">
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="focus-brand min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-green"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}>
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
            <nav className="hidden lg:flex" aria-label="Principal">
              <ul className="flex gap-6 xl:gap-10 items-center h-full">
                {menuLeftItems.map(id => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-label text-brand-green hover:text-brand-green/70 transition-colors duration-200 focus-brand rounded-sm"
                      onClick={e => {
                        e.preventDefault();
                        onScrollToElement(id);
                      }}>
                      {t(id)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3 xl:gap-5">
            <Link href="/menu" className="hidden lg:block">
              <Button variant="accent" size="sm">
                {t("menu")}
              </Button>
            </Link>
            <Link
              href="/menu"
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-green focus-brand rounded-sm"
              aria-label={t("menu")}>
              <Coffee size={22} />
            </Link>
            <LocaleSwitch locale={locale} />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          className="lg:hidden fixed inset-x-0 bottom-0 top-site-header z-header bg-brand-main py-12 px-6 site-header-bar overflow-y-auto"
          aria-label="Menú móvil">
          <ul className="flex flex-col items-center gap-8">
            {menuLeftItems.map(id => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-label text-xl text-brand-green focus-brand"
                  onClick={e => {
                    e.preventDefault();
                    onClickItem(id);
                  }}>
                  {t(id)}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/menu"
                onClick={() => {
                  setIsMenuOpen(false);
                }}>
                <Button variant="primary" size="md">
                  {t("menu")}
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
