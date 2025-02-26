"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import cx from "classnames";
import { Menu, X } from "react-feather";
import Image from "next/image";

enum MenuItems {
  ABOUT = "About",
  PLANS = "Plans",
  MENU = "Menu",
  REVIEWS = "Reviews",
  CONTACT = "Contact",
}

const menuItems = [
  { label: MenuItems.ABOUT, route: "/" },
  { label: MenuItems.PLANS, route: "/" },
  { label: MenuItems.MENU, route: "/" },
  { label: MenuItems.REVIEWS, route: "/" },
  { label: MenuItems.CONTACT, route: "/" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="relative bg-gray-50 items-center justify-between py-7 px-4 md:px-20 z-30">
        <div className="flex gap-20 items-center pr-5 md:pr-0 h-full">
          <div className="absolute left-[50%] -translate-x-[50%] h-full">
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
          <div className="hidden lg:block">
            <ul className="flex gap-10 items-center h-full text-xl">
              {menuItems.map(({ label, route }, index) => (
                <li key={index}>
                  <Link href={route} aria-haspopup="menu">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="block lg:hidden transition-all duration-300">
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
        </div>
      </div>
      <div
        className={cx(
          "block lg:hidden",
          "absolute min-h-screen bg-gray-50 left-0 w-full py-10 px-10 transition-all duration-300 z-10",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
        <ul className="flex flex-col items-center gap-10 h-full text-xl">
          {menuItems.map(({ label, route }, index) => (
            <li key={index}>
              <Link onClick={toggleMenu} href={route} aria-haspopup="menu">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
