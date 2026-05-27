import React from "react";
import Footer from "@/components/Footer/Footer";
import MenuBanner from "@/components/MenuBanner/MenuBanner";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MenuBanner />
      {children}
      <Footer />
    </>
  );
}
