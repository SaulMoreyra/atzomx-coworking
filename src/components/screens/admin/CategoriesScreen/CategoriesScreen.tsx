"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminField from "@/components/admin/AdminField";
import { adminFetch } from "@/lib/api/client";
import type { SerializedCategory } from "@/lib/api/admin-types";
import {
  createCategoryFormSchema,
  type CategoryFormValues,
} from "@/lib/forms/admin/schemas";

export default function CategoriesScreen() {
  const t = useTranslations("admin.categories");
  const tc = useTranslations("admin.common");
  const tv = useTranslations("admin.validation");

  const schema = useMemo(() => createCategoryFormSchema(tv), [tv]);
  const defaultValues = useMemo<CategoryFormValues>(() => ({ slug: "" }), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [items, setItems] = useState<SerializedCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminFetch<{ items: SerializedCategory[] }>("/api/v1/categories?type=MENU")
      .then(result => {
        setItems(result.items);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : tc("error"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (values: CategoryFormValues) => {
    setError(null);

    try {
      await adminFetch("/api/v1/categories", {
        method: "POST",
        body: JSON.stringify({ slug: values.slug, type: "MENU", sortOrder: items.length }),
      });
      reset(defaultValues);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("createError"));
    }
  };

  const onToggle = async (category: SerializedCategory) => {
    try {
      await adminFetch(`/api/v1/categories/${category.id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !category.active }),
      });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("updateError"));
    }
  };

  return (
    <div className="min-w-0">
      <header className="mb-6 md:mb-8">
        <p className="text-label text-xs tracking-[0.18em] text-brand-green/60">{t("section")}</p>
        <h1 className="text-display-prose mt-1 text-2xl font-bold md:text-3xl">{t("title")}</h1>
        <p className="text-body mt-2 max-w-2xl text-sm text-brand-green/70">
          {t("description")}{" "}
          <code className="font-mono text-xs">{t("descriptionCode")}</code>
        </p>
      </header>

      <form
        className="admin-card mb-6 grid gap-3 p-4 md:grid-cols-[1fr_auto] md:p-5"
        onSubmit={event => {
          void handleSubmit(onCreate)(event);
        }}>
        <AdminField label={t("newSlug")} htmlFor="slug" error={errors.slug?.message}>
          <input
            id="slug"
            className="admin-input font-mono"
            placeholder={t("slugPlaceholder")}
            {...register("slug")}
          />
        </AdminField>
        <div className="flex items-end">
          <button type="submit" className="admin-btn admin-btn-primary w-full md:w-auto">
            {t("add")}
          </button>
        </div>
      </form>

      {error ? (
        <p className="admin-alert admin-alert-error mb-4" role="alert">
          {error}
        </p>
      ) : null}

      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">{t("table.slug")}</th>
              <th scope="col">{t("table.order")}</th>
              <th scope="col">{t("table.status")}</th>
              <th scope="col">{t("table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-brand-green/60">
                  {t("loading")}
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id}>
                  <td className="font-mono text-sm">{item.slug}</td>
                  <td className="tabular-nums">{item.sortOrder}</td>
                  <td>{item.active ? t("statusActive") : t("statusInactive")}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary min-h-10 px-3 text-[0.6875rem]"
                      onClick={() => {
                        void onToggle(item);
                      }}>
                      {item.active ? t("deactivate") : t("activate")}
                    </button>
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
