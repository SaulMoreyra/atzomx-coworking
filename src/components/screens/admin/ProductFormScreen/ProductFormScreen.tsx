"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminField from "@/components/admin/AdminField";
import I18nKeysPanel from "@/components/admin/I18nKeysPanel";
import { adminFetch } from "@/lib/api/client";
import type { SerializedCategory, SerializedProduct } from "@/lib/api/admin-types";
import {
  createProductFormSchema,
  type ProductFormValues,
} from "@/lib/forms/admin/schemas";

function buildDefaultValues(type: "MENU" | "PLAN"): ProductFormValues {
  return {
    slug: "",
    type,
    basePrice: "0",
    image: "",
    active: true,
    sortOrder: "0",
    categoryId: "",
    planArea: "co_working",
    variants: [{ slug: "hot", price: "0" }],
    featureKeysText: "",
  };
}

interface ProductFormScreenProps {
  productId?: string;
}

export default function ProductFormScreen({ productId }: ProductFormScreenProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("admin.productForm");
  const tc = useTranslations("admin.common");
  const tv = useTranslations("admin.validation");
  const defaultType = searchParams.get("type") === "PLAN" ? "PLAN" : "MENU";

  const schema = useMemo(() => createProductFormSchema(tv), [tv]);
  const defaultValues = useMemo(() => buildDefaultValues(defaultType), [defaultType]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "variants" });

  const type = watch("type");
  const slug = watch("slug");
  const categoryId = watch("categoryId");

  const [categories, setCategories] = useState<SerializedCategory[]>([]);
  const [loading, setLoading] = useState(Boolean(productId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const categorySlug = useMemo(() => {
    const selected = categories.find(category => category.id === categoryId);
    return selected?.slug ?? "";
  }, [categoryId, categories]);

  useEffect(() => {
    adminFetch<{ items: SerializedCategory[] }>("/api/v1/categories?type=MENU")
      .then(result => {
        setCategories(result.items);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!productId) return;

    adminFetch<SerializedProduct>(`/api/v1/products/${productId}`)
      .then(product => {
        reset({
          type: product.type,
          slug: product.slug,
          basePrice: String(product.basePrice),
          image: product.image ?? "",
          active: product.active,
          sortOrder: String(product.sortOrder),
          categoryId: product.categoryId ?? "",
          planArea: product.planArea ?? "co_working",
          variants: product.variants.length
            ? product.variants.map(variant => ({
                slug: variant.slug,
                price: String(variant.price),
              }))
            : [{ slug: "default", price: String(product.basePrice) }],
          featureKeysText: product.featureKeys.join("\n"),
        });
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : tc("error"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId, reset, tc]);

  const onSubmit = async (values: ProductFormValues) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload = {
      slug: values.slug,
      type: values.type,
      basePrice: Number(values.basePrice),
      image: values.image || null,
      active: values.active,
      sortOrder: Number(values.sortOrder),
      categoryId: values.type === "MENU" ? values.categoryId || null : null,
      planArea: values.type === "PLAN" ? values.planArea : null,
      variants:
        values.type === "MENU"
          ? values.variants
              .filter(variant => variant.slug.trim())
              .map((variant, index) => ({
                slug: variant.slug.trim(),
                price: Number(variant.price),
                sortOrder: index,
              }))
          : undefined,
      features:
        values.type === "PLAN"
          ? values.featureKeysText
              .split("\n")
              .map(line => line.trim())
              .filter(Boolean)
              .map((featureKey, index) => ({ featureKey, sortOrder: index }))
          : undefined,
    };

    try {
      if (productId) {
        await adminFetch(`/api/v1/products/${productId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        setSuccess(t("updated"));
      } else {
        await adminFetch("/api/v1/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setSuccess(t("created"));
        router.push("/admin/products");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!productId) return;
    if (!window.confirm(t("deleteConfirm"))) return;

    try {
      await adminFetch(`/api/v1/products/${productId}`, { method: "DELETE" });
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("deleteError"));
    }
  };

  if (loading) {
    return <p className="text-brand-green/70">{t("loading")}</p>;
  }

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
      <div className="min-w-0">
        <header className="mb-6">
          <Link
            href="/admin/products"
            className="text-label text-xs tracking-[0.12em] text-brand-green/60 hover:text-brand-green">
            {t("backToProducts")}
          </Link>
          <h1 className="text-display-prose mt-2 text-2xl font-bold">
            {productId ? t("editTitle") : t("newTitle")}
          </h1>
        </header>

        <form
          className="admin-card space-y-5 p-5 md:p-6"
          onSubmit={event => {
            void handleSubmit(onSubmit)(event);
          }}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label={t("slug")} htmlFor="slug" error={errors.slug?.message}>
              <input
                id="slug"
                className="admin-input font-mono"
                disabled={Boolean(productId)}
                {...register("slug")}
              />
            </AdminField>
            <AdminField label={t("type")} htmlFor="type">
              <select
                id="type"
                className="admin-input"
                disabled={Boolean(productId)}
                {...register("type")}>
                <option value="MENU">{t("typeMenu")}</option>
                <option value="PLAN">{t("typePlan")}</option>
              </select>
            </AdminField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AdminField
              label={t("basePrice")}
              htmlFor="price"
              error={errors.basePrice?.message}>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                className="admin-input tabular-nums"
                {...register("basePrice")}
              />
            </AdminField>
            <AdminField label={t("sortOrder")} htmlFor="sort">
              <input
                id="sort"
                type="number"
                min="0"
                className="admin-input"
                {...register("sortOrder")}
              />
            </AdminField>
          </div>

          <AdminField label={t("image")} htmlFor="image">
            <input
              id="image"
              className="admin-input font-mono text-sm"
              placeholder={t("imagePlaceholder")}
              {...register("image")}
            />
          </AdminField>

          {type === "MENU" ? (
            <AdminField label={t("category")} htmlFor="category" error={errors.categoryId?.message}>
              <select id="category" className="admin-input" {...register("categoryId")}>
                <option value="">{t("categorySelect")}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.slug}
                  </option>
                ))}
              </select>
            </AdminField>
          ) : (
            <AdminField label={t("planArea")} htmlFor="planArea">
              <select id="planArea" className="admin-input" {...register("planArea")}>
                <option value="cafeteria">{t("planAreaCafeteria")}</option>
                <option value="co_working">{t("planAreaCoWorking")}</option>
                <option value="meeting_room">{t("planAreaMeetingRoom")}</option>
              </select>
            </AdminField>
          )}

          {type === "MENU" ? (
            <fieldset className="space-y-3">
              <legend className="text-label text-xs tracking-[0.12em]">{t("variants")}</legend>
              {fields.map((field, index) => (
                <div key={field.id} className="grid gap-2 md:grid-cols-[1fr_8rem_auto]">
                  <input
                    className="admin-input font-mono text-sm"
                    placeholder={t("variantSlugPlaceholder")}
                    {...register(`variants.${index}.slug`)}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="admin-input tabular-nums"
                    {...register(`variants.${index}.price`)}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => {
                      remove(index);
                    }}>
                    {t("removeVariant")}
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => {
                  append({ slug: "", price: "0" });
                }}>
                {t("addVariant")}
              </button>
            </fieldset>
          ) : (
            <AdminField label={t("featureKeys")} htmlFor="features">
              <textarea
                id="features"
                className="admin-input min-h-[8rem] font-mono text-sm"
                placeholder={t("featureKeysPlaceholder")}
                {...register("featureKeysText")}
              />
            </AdminField>
          )}

          <label className="flex min-h-11 items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 accent-brand-green"
              {...register("active")}
            />
            <span className="text-body text-sm">{t("activeLabel")}</span>
          </label>

          {error ? (
            <p className="admin-alert admin-alert-error" role="alert">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="admin-alert admin-alert-success" role="status">
              {success}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={saving}
              data-state={saving ? "loading" : "default"}>
              {saving ? t("saving") : t("save")}
            </button>
            {productId ? (
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => {
                  void onDelete();
                }}>
                {t("delete")}
              </button>
            ) : null}
          </div>
        </form>
      </div>

      {slug ? (
        <I18nKeysPanel type={type} slug={slug} categorySlug={categorySlug || undefined} />
      ) : null}
    </div>
  );
}
