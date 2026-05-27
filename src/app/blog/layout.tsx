import React from "react";
import Footer from "@/components/Footer/Footer";
import BlogBanner from "@/components/BlogBanner/BlogBanner";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogBanner />
      {children}
      <Footer />
    </>
  );
}
