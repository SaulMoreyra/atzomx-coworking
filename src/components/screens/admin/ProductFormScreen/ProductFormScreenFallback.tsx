"use client";

import { useTranslations } from "next-intl";
import React from "react";

export default function ProductFormScreenFallback() {
  const t = useTranslations("admin.productForm");

  return <div className="text-brand-green/70">{t("loadingFallback")}</div>;
}
