"use client";

import { useTranslations } from "next-intl";
import React, { Suspense } from "react";
import LoginScreen from "@/components/screens/admin/LoginScreen/LoginScreen";

export default function AdminLoginPage() {
  const t = useTranslations("admin.login");

  return (
    <Suspense fallback={<div className="p-8 text-center text-brand-green/70">{t("loading")}</div>}>
      <LoginScreen />
    </Suspense>
  );
}
