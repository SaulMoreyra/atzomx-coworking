"use client";

import cx from "classnames";
import React, { type FC, type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  isLoading,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className={cx(
        "bg-transparent text-black border-[1px] border-black",
        "hover:bg-black hover:text-white hover:transform hover:scale-105",
        "flex gap-5 transition-colors items-center justify-center",
        "py-4 px-8 rounded-md whitespace-nowrap normal-case text-2xl",
        className
      )}
      onClick={onClick}
      disabled={disabled === true || isLoading}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
