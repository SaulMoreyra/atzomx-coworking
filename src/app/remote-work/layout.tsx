import Footer from "@/components/Footer/Footer";
import IntlMessages from "@/components/IntlMessages/IntlMessages";
import React from "react";

export default function RemoteWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IntlMessages>{children}</IntlMessages>
      <Footer />
    </>
  );
}
