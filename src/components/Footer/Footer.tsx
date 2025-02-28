"use client";

import Link from "next/link";
import React from "react";
import { Facebook, Instagram, Phone } from "react-feather";

import { Visa, Mastercard } from "react-payment-logos/dist/logo";

const Footer = () => {
  return (
    <div>
      <div className="mt-5 px-5 text-center w-full md:px-64">
        All major payment methods accepted!
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
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-around">
          <span className="flex flex-col gap-2 w-full md:w-1/3">
            <h1 className="text-xl font-bold">Ubicación</h1>
            <Link href="/">
              C. de Los Libres 800-letra B, RUTA INDEPENDENCIA, Centro, 68000
              Oaxaca de Juárez, Oax.
            </Link>
          </span>
          <span className="flex flex-col gap-2 w-full md:w-1/3">
            <h1 className="text-xl font-bold">Nuestras Redes Sociales</h1>
            <div className="flex items-center gap-2">
              <Facebook size={24} className="min-w-[24px]" />
              <a
                href="https://www.facebook.com/profile.php?id=61569786946519"
                target="_blank"
                rel="noopener noreferrer">
                Facebook
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Instagram size={24} className="min-w-[24px]" />
              <a
                href="https://www.instagram.com/atzomx/"
                target="_blank"
                rel="noopener noreferrer">
                Instagram
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={24} className="min-w-[24px]" />
              <a
                href="https://wa.me/5219515155328"
                target="_blank"
                rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </span>
          <span className="flex flex-col gap-2 w-full md:w-1/3">
            <h1 className="text-xl font-bold">Encuéntranos en</h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d476.7599133940934!2d-96.7181858!3d17.068773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c723cfaf60de6b%3A0xd4660acd5a3a65bf!2sAtzomx%20Coworking!5e0!3m2!1ses-419!2smx!4v1740720931272!5m2!1ses-419!2smx"
              width="100%"
              height="205"
              allowFullScreen={true}
              loading="lazy"></iframe>
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
