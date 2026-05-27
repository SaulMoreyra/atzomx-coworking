"use client";

import Link from "next/link";
import React, { useEffect, useId, useRef, useState } from "react";
import cx from "classnames";
import { ChevronDown, Menu, X, Coffee } from "react-feather";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import Button from "../Button/Button";
import { type Locale } from "@/i18n/config";
import { useHeaderSurface } from "@/hooks/useHeaderSurface";
import { DEFAULT_HEADER_SURFACE } from "@/design-system/header";
import { getHeaderBarClassName } from "./headerSurfaceStyles";

/** High-intent destinations — always visible on desktop */
const primaryHashNavItems = ["plans", "gallery"] as const;
const primaryLinkNavItems = [
  { id: "remoteWork", href: "/remote-work" },
  { id: "blog", href: "/blog" },
] as const;

/** Secondary — grouped under "More" to avoid header overflow */
const secondaryHashNavItems = ["about", "faq", "reviews", "contact"] as const;

const navLinkClass =
  "text-label whitespace-nowrap text-[10px] tracking-[0.14em] text-brand-green transition-colors duration-200 hover:text-brand-green/70 focus-brand rounded-sm xl:text-xs";

const Header = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.header");
  const moreMenuId = useId();
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const morePanelRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionSurface = useHeaderSurface(!isMenuOpen);
  const isDynamicHeader = sectionSurface !== null;
  const activeSurface = sectionSurface ?? DEFAULT_HEADER_SURFACE;

  const onScrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  const onClickHashItem = (id: string) => {
    onScrollToElement(id);
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    setIsMoreOpen(false);
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

  useEffect(() => {
    if (!isMoreOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const inMorePanel = morePanelRef.current?.contains(target) ?? false;
      const inMoreButton = moreButtonRef.current?.contains(target) ?? false;
      if (inMorePanel || inMoreButton) {
        return;
      }
      setIsMoreOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMoreOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMoreOpen]);

  return (
    <header className="site-header-shell w-full">
      <div
        className={getHeaderBarClassName({
          surface: activeSurface,
          isScrolled,
          isDynamic: isDynamicHeader,
        })}>
        <div className="section-container flex h-[4.5rem] items-center justify-between gap-3 xl:gap-4">
          {/* Left: mobile menu + logo + desktop nav */}
          <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4 xl:gap-6">
            <button
              type="button"
              onClick={toggleMenu}
              className="focus-brand flex min-h-[44px] min-w-[44px] items-center justify-center text-brand-green lg:hidden"
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isMenuOpen}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link
              href="/#home"
              className="text-display shrink-0 rounded-sm text-lg tracking-wide focus-brand xl:text-xl"
              onClick={e => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  onClickHashItem("home");
                }
              }}>
              ATZOMX
            </Link>

            <nav className="hidden min-w-0 lg:flex" aria-label={t("navPrimary")}>
              <ul className="flex items-center gap-3 xl:gap-5">
                {primaryHashNavItems.map(id => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={navLinkClass}
                      onClick={e => {
                        e.preventDefault();
                        onScrollToElement(id);
                      }}>
                      {t(id)}
                    </a>
                  </li>
                ))}
                {primaryLinkNavItems.map(item => (
                  <li key={item.id}>
                    <Link href={item.href} className={navLinkClass}>
                      {t(item.id)}
                    </Link>
                  </li>
                ))}
                <li className="relative">
                  <button
                    ref={moreButtonRef}
                    type="button"
                    id={`${moreMenuId}-button`}
                    aria-haspopup="menu"
                    aria-expanded={isMoreOpen}
                    aria-controls={`${moreMenuId}-menu`}
                    onClick={() => {
                      setIsMoreOpen(prev => !prev);
                    }}
                    className={cx(
                      navLinkClass,
                      "inline-flex min-h-[44px] items-center gap-1 px-1"
                    )}>
                    {t("more")}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={cx("transition-transform duration-200", isMoreOpen && "rotate-180")}
                    />
                  </button>
                  {isMoreOpen ? (
                    <div
                      ref={morePanelRef}
                      id={`${moreMenuId}-menu`}
                      role="menu"
                      aria-labelledby={`${moreMenuId}-button`}
                      className="absolute left-0 top-full z-header mt-1 min-w-[11rem] border border-brand-green/12 bg-brand-cream py-2 shadow-[0_10px_28px_-12px_rgba(47,62,34,0.22)]">
                      {secondaryHashNavItems.map(id => (
                        <a
                          key={id}
                          href={`#${id}`}
                          role="menuitem"
                          className="text-label block px-4 py-2.5 text-[10px] tracking-[0.14em] text-brand-green transition-colors duration-200 hover:bg-brand-main/50 focus-brand xl:text-xs"
                          onClick={e => {
                            e.preventDefault();
                            onClickHashItem(id);
                          }}>
                          {t(id)}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </li>
              </ul>
            </nav>
          </div>

          {/* Right: menu CTA + locale */}
          <div className="flex shrink-0 items-center gap-2 xl:gap-3">
            <Link href="/menu" className="hidden lg:block">
              <Button variant="accent" size="sm">
                {t("menu")}
              </Button>
            </Link>
            <Link
              href="/menu"
              className="focus-brand flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-brand-green lg:hidden"
              aria-label={t("menu")}>
              <Coffee size={22} />
            </Link>
            <LocaleSwitch locale={locale} />
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          className="site-header-bar fixed inset-x-0 bottom-0 top-site-header z-header overflow-y-auto bg-brand-main px-6 py-10 lg:hidden"
          aria-label={t("navMobile")}>
          <ul className="mx-auto flex max-w-sm flex-col gap-6">
            <li>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-green/45">
                {t("navPrimary")}
              </p>
              <ul className="mt-3 flex flex-col gap-4">
                {primaryHashNavItems.map(id => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-label text-lg text-brand-green focus-brand"
                      onClick={e => {
                        e.preventDefault();
                        onClickHashItem(id);
                      }}>
                      {t(id)}
                    </a>
                  </li>
                ))}
                {primaryLinkNavItems.map(item => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-label text-lg text-brand-green focus-brand"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}>
                      {t(item.id)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-green/45">
                {t("more")}
              </p>
              <ul className="mt-3 flex flex-col gap-4">
                {secondaryHashNavItems.map(id => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-label text-lg text-brand-green focus-brand"
                      onClick={e => {
                        e.preventDefault();
                        onClickHashItem(id);
                      }}>
                      {t(id)}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="pt-2">
              <Link
                href="/menu"
                onClick={() => {
                  setIsMenuOpen(false);
                }}>
                <Button variant="primary" size="md" className="w-full">
                  {t("menu")}
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
