import Footer from "@/components/Footer/Footer";
import RemoteWorkBanner from "@/components/RemoteWorkBanner/RemoteWorkBanner";
import React from "react";

export default function RemoteWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RemoteWorkBanner />
      {children}
      <Footer />
    </>
  );
}
