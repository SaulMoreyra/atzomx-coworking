import React from "react";
import Footer from "@/components/Footer/Footer";
import IntlMessages from "@/components/IntlMessages/IntlMessages";

export default function BlogLayout({
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
