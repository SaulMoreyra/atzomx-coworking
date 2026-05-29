"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import cx from "classnames";
import { adminFetch } from "@/lib/api/client";
import type { SerializedProduct } from "@/lib/api/admin-types";

export default function ProductsListScreen() {
  const searchParams = useSearchParams();
  const t = useTranslations("admin.products");
  const tc = useTranslations("admin.common");
  const initialType = searchParams.get("type") === "PLAN" ? "PLAN" : "MENU";
  const [type, setType] = useState<"MENU" | "PLAN">(initialType);
  const [items, setItems] = useState<SerializedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    adminFetch<{ items: SerializedProduct[] }>(
      `/api/v1/products?type=${type}&limit=100`
    )
      .then(result => {
        setItems(result.items);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : tc("error"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tc, type]);

  const title = useMemo(
    () => (type === "MENU" ? t("menuTitle") : t("plansTitle")),
    [t, type]
  );

  return (
    <div className="min-w-0">
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-label text-xs tracking-[0.18em] text-brand-green/60">{t("catalog")}</p>
          <h1 className="text-display-prose mt-1 text-2xl font-bold md:text-3xl">{t("title")}</h1>
          <p className="text-body mt-2 text-sm text-brand-green/70">{title}</p>
        </div>
        <Link href={`/admin/products/new?type=${type}`} className="admin-btn admin-btn-primary">
          {t("newProduct")}
        </Link>
      </header>

      <div className="mb-6 flex gap-2" role="tablist" aria-label={t("tabListAria")}>
        {(["MENU", "PLAN"] as const).map(tab => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={type === tab}
            className={cx(
              "admin-btn min-h-11 px-4",
              type === tab ? "admin-btn-primary" : "admin-btn-secondary"
            )}
            onClick={() => {
              setType(tab);
            }}>
            {tab === "MENU" ? t("tabMenu") : t("tabPlans")}
          </button>
        ))}
      </div>

      {error ? (
        <p className="admin-alert admin-alert-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">{t("table.slug")}</th>
              <th scope="col">{t("table.price")}</th>
              <th scope="col">{t("table.categoryOrArea")}</th>
              <th scope="col">{t("table.status")}</th>
              <th scope="col">{t("table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-body py-8 text-center text-brand-green/60">
                  {t("loading")}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-body py-8 text-center text-brand-green/60">
                  {t("empty")}
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id}>
                  <td className="font-mono text-sm">{item.slug}</td>
                  <td className="tabular-nums">${item.basePrice}</td>
                  <td className="text-sm">
                    {item.type === "MENU"
                      ? (item.categorySlug ?? "—")
                      : (item.planArea ?? "—")}
                  </td>
                  <td>
                    <span
                      className={cx(
                        "admin-badge",
                        item.active ? "admin-badge-active" : "admin-badge-inactive"
                      )}>
                      {item.active ? t("statusActive") : t("statusInactive")}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/admin/products/${item.id}`}
                      className="text-label text-xs tracking-[0.12em] underline-offset-2 hover:underline">
                      {t("edit")}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
