import "./globals.css";
import Footer from "@/components/Footer/Footer";
import RSCHeader from "@/components/Header/RSCHeader";
import React from "react";

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
        <div>
          {/* @ts-expect-error Server Component */}
          <RSCHeader />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
