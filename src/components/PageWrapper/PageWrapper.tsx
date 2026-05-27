import React, { type FC, type ReactNode } from "react";
import cx from "classnames";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper: FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <main className={cx("w-full section-container flex flex-col min-h-screen-header gap-6 py-4", className)}>
      {children}
    </main>
  );
};

export default PageWrapper;
