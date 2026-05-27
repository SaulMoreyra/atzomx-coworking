"use client";

import cx from "classnames";
import React, { type FC, type ReactNode } from "react";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-green text-brand-on-green border-brand-green hover:bg-brand-green/90 hover:border-brand-green/90",
  accent:
    "bg-brand-accent text-brand-green border-brand-accent hover:bg-brand-accent/80 hover:border-brand-accent/80",
  outline:
    "bg-transparent text-brand-green border-brand-green hover:bg-brand-green hover:text-brand-on-green",
  ghost:
    "bg-transparent text-brand-green border-transparent hover:bg-brand-main hover:border-brand-main",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "py-2 px-4 text-sm min-h-[44px]",
  md: "py-3 px-6 text-base min-h-[44px]",
  lg: "py-4 px-8 text-lg min-h-[48px]",
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  isLoading,
  onClick,
  type = "button",
  variant = "outline",
  size = "lg",
}) => {
  return (
    <button
      className={cx(
        "inline-flex gap-3 items-center justify-center",
        "border rounded-brand whitespace-nowrap text-label",
        "transition-colors duration-200",
        "focus-brand disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={onClick}
      disabled={disabled === true || isLoading}
      type={type}
      aria-busy={isLoading}>
      {children}
    </button>
  );
};

export default Button;
