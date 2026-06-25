"use client";

import { BRAND_CONTACT } from "@/design-system";
import { trackWhatsAppConversion } from "@/lib/analytics";
import React, { type AnchorHTMLAttributes, type FC, type ReactNode } from "react";

interface WhatsAppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  message?: string;
  children: ReactNode;
}

const WhatsAppLink: FC<WhatsAppLinkProps> = ({
  message,
  children,
  onClick,
  target = "_blank",
  rel = "noopener noreferrer",
  ...rest
}) => {
  const href = message
    ? `${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
    : BRAND_CONTACT.whatsapp;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={event => {
        trackWhatsAppConversion();
        onClick?.(event);
      }}
      {...rest}>
      {children}
    </a>
  );
};

export default WhatsAppLink;
