import React from "react";
import MenuBanner from "@/components/MenuBanner/MenuBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MenuBanner />
      {children}
    </>
  );
}
