import Footer from "@/components/Footer/Footer";
import React from "react";

export default function RemoteWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
