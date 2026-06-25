"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LocaleSwitch from "@/components/LocaleSwitch/LocaleSwitch";
import AdminField from "@/components/admin/AdminField";
import { type Locale } from "@/i18n/config";
import { loginAdmin } from "@/lib/api/client";
import {
  createLoginFormSchema,
  type LoginFormValues,
} from "@/lib/forms/admin/schemas";

export default function LoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale() as Locale;
  const t = useTranslations("admin.login");
  const tv = useTranslations("admin.validation");
  const nextPath = searchParams.get("next") ?? "/admin/products";

  const schema = useMemo(() => createLoginFormSchema(tv), [tv]);
  const defaultValues = useMemo<LoginFormValues>(
    () => ({ email: "", password: "" }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    setLoading(true);

    try {
      await loginAdmin(values.email, values.password);
      router.replace(nextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorDefault"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="admin-card w-full max-w-md p-6 md:p-8">
        <div className="mb-6 flex justify-end">
          <LocaleSwitch locale={locale} />
        </div>

        <p className="text-label text-xs tracking-[0.18em] text-brand-green/60">{t("brand")}</p>
        <h1 className="text-display-prose mt-2 text-2xl font-bold">{t("title")}</h1>
        <p className="text-body mt-2 text-sm text-brand-green/70">{t("subtitle")}</p>

        <form
          className="mt-8 space-y-4"
          onSubmit={event => {
            void handleSubmit(onSubmit)(event);
          }}
          noValidate>
          <AdminField label={t("email")} htmlFor="email" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="admin-input"
              {...register("email")}
            />
          </AdminField>

          <AdminField label={t("password")} htmlFor="password" error={errors.password?.message}>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="admin-input"
              {...register("password")}
            />
          </AdminField>

          {error ? (
            <p className="admin-alert admin-alert-error" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="admin-btn admin-btn-primary w-full"
            disabled={loading}
            data-state={loading ? "loading" : "default"}>
            {loading ? t("submitting") : t("submit")}
          </button>
        </form>

        <p className="text-body mt-6 text-center text-sm text-brand-green/60">
          <Link href="/" className="underline-offset-2 hover:underline">
            {t("backToSite")}
          </Link>
        </p>
      </div>
    </div>
  );
}
