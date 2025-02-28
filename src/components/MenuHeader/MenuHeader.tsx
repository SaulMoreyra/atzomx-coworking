import Image from "next/image";
import React from "react";
import cx from "classnames";

interface MenuHeaderProps {
  className?: string;
}

const MenuHeader = ({ className }: MenuHeaderProps) => {
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
          <select className="px-2 py-2 rounded-md text-white focus:outline-none bg-transparent">
            <option value="es">🇲🇽 ES</option>
            <option value="en">🇺🇸 EN</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
