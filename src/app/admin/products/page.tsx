"use client";

import { useTranslations } from "next-intl";
import React, { Suspense } from "react";
import ProductsListScreen from "@/components/screens/admin/ProductsListScreen/ProductsListScreen";

export default function AdminProductsPage() {
  const t = useTranslations("admin.common");

  return (
    <Suspense fallback={<div className="text-brand-green/70">{t("loading")}</div>}>
      <ProductsListScreen />
    </Suspense>
  );
}
