"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

import { Visa, Mastercard } from "react-payment-logos/dist/flat";

const Footer = () => {
  const t = useTranslations("home.footer");
  return (
    <div>
      <div className="mt-5 px-5 text-center w-full md:px-64">
        {t("payments")}
      </div>
      <div className="flex justify-center pb-5 items-center">
        <Visa
          id="visa"
          style={{ margin: 10, width: 50 }}
          className="payment-icon"
        />
        <Mastercard
          id="mastercard"
          style={{ margin: 10, width: 50 }}
          className="payment-icon"
        />
        {/*
        <PaypalTransparent
          id="paypal"
          style={{ margin: 10, width: 50 }}
          className="payment-icon"
        />
        <Applepay
          id="appleplay"
          style={{ margin: 10, width: 50 }}
          className="payment-icon"
        />
        <Googlepay
          id="googleplay"
          style={{ margin: 10, width: 50 }}
          className="payment-icon"
        /> */}
      </div>
      <div className="bg-theme-black flex flex-col gap-20 text-white m-5 rounded-md px-20 py-10">
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
          <span className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Help and Information</h1>
            <Link href="/">Support</Link>
            <Link href="/">Track your order</Link>
            <Link href="/">Delivery and returns</Link>
          </span>
          <span className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">About</h1>
            <Link href="/">About us</Link>
            <Link href="/">Careers</Link>
          </span>
          <span className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">More</h1>
            <Link href="/">Mobile application</Link>
            <Link href="/">Gift cards</Link>
          </span>
          <span className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Connect</h1>
            <Link href="/">Twitter</Link>
            <Link href="/">Instagram</Link>
          </span>
        </div>

        <div className="flex justify-between">
          <p>© 2025 ATZOMX</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
