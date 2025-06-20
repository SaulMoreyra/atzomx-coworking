"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Facebook, Instagram, Phone, PhoneCall } from "react-feather";

import { Mastercard, Visa } from "react-payment-logos/dist/flat";

const ADDRESS =
  "C. de Los Libres 800-letra B, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax.";

const SOCIAL_NETWORKS = [
  {
    icon: Facebook,
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61569786946519",
  },
  {
    icon: Instagram,
    name: "Instagram",
    url: "https://www.instagram.com/atzomx/",
  },
  {
    icon: Phone,
    name: "Whatsapp",
    url: "https://wa.me/5219515155328",
  },
  {
    icon: PhoneCall,
    name: "+52 951 515 5328",
    url: "tel:5219515155328",
  },
];

const Footer = () => {
  const t = useTranslations("home.footer");
  return (
    <section id="contact">
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
      <div className="bg-theme-black flex flex-col gap-10 text-white m-5 rounded-md px-20 py-10">
        <div className="flex flex-col gap-5 md:flex-row justify-around">
          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <h1 className="text-xl font-bold">{t("social_networks")}</h1>
            {SOCIAL_NETWORKS.map(network => (
              <span className="flex items-center gap-2" key={network.name}>
                <network.icon size={24} className="min-w-[24px]" />
                <a href={network.url} target="_blank" rel="noopener noreferrer">
                  {network.name}
                </a>
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <h1 className="text-xl font-bold">{t("address")}</h1>
            <p className="max-w-[80%]">{ADDRESS}</p>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <h1 className="text-xl font-bold">{t("location")}</h1>
            <iframe
              title="atzomx-location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d476.7599133940934!2d-96.7181858!3d17.068773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c723cfaf60de6b%3A0xd4660acd5a3a65bf!2sAtzomx%20Coworking!5e0!3m2!1ses-419!2smx!4v1740720931272!5m2!1ses-419!2smx"
              width="100%"
              height="205"
              allowFullScreen={true}
              loading="lazy"></iframe>
          </div>
        </div>

        <div className="flex justify-between">
          <p>© 2025 ATZOMX</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
