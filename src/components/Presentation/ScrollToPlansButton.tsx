"use client";

import { getScrollBehavior } from "@/components/MenuCatalog/menuUtils";
import React, { type FC, type ReactNode } from "react";

interface ScrollToPlansButtonProps {
  className?: string;
  children: ReactNode;
}

const ScrollToPlansButton: FC<ScrollToPlansButtonProps> = ({
  className,
  children,
}) => (
  <button
    type="button"
    onClick={() => {
      document
        .getElementById("plans")
        ?.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
    }}
    className={className}>
    {children}
  </button>
);

export default ScrollToPlansButton;
