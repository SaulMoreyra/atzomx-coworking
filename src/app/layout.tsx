import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import "./globals.css";

export const metadata = {
  title: "ATZOMX | Cafe & Coworking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
