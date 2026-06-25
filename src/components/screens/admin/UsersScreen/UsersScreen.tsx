"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminField from "@/components/admin/AdminField";
import { adminFetch, fetchCurrentAdmin } from "@/lib/api/client";
import type { AdminUserRecord } from "@/lib/api/admin-types";
import { createUserFormSchema, type UserFormValues } from "@/lib/forms/admin/schemas";

export default function UsersScreen() {
  const t = useTranslations("admin.users");
  const tc = useTranslations("admin.common");
  const tv = useTranslations("admin.validation");

  const schema = useMemo(() => createUserFormSchema(tv), [tv]);
  const defaultValues = useMemo<UserFormValues>(
    () => ({
      email: "",
      name: "",
      password: "",
      role: "STAFF",
    }),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);

  const load = () => {
    adminFetch<{ items: AdminUserRecord[] }>("/api/v1/users")
      .then(result => {
        setUsers(result.items);
      })
      .catch(err => {
        if (String(err).includes("Forbidden")) {
          setForbidden(true);
        }
        setError(err instanceof Error ? err.message : tc("error"));
      });
  };

  useEffect(() => {
    fetchCurrentAdmin()
      .then(result => {
        if (result.user.role !== "ADMIN") {
          setForbidden(true);
        } else {
          load();
        }
      })
      .catch(() => {
        setForbidden(true);
      });
  }, []);

  const onCreate = async (values: UserFormValues) => {
    setError(null);

    try {
      await adminFetch("/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          name: values.name?.trim() ? values.name.trim() : undefined,
          password: values.password,
          role: values.role,
        }),
      });
      reset(defaultValues);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("createError"));
    }
  };

  const onToggle = async (user: AdminUserRecord) => {
    await adminFetch(`/api/v1/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !user.active }),
    });
    load();
  };

  if (forbidden) {
    return (
      <p className="admin-alert admin-alert-error" role="alert">
        {t("forbidden")}
      </p>
    );
  }

  return (
    <div className="min-w-0">
      <header className="mb-6 md:mb-8">
        <p className="text-label text-xs tracking-[0.18em] text-brand-green/60">{t("section")}</p>
        <h1 className="text-display-prose mt-1 text-2xl font-bold md:text-3xl">{t("title")}</h1>
      </header>

      <form
        className="admin-card mb-6 grid gap-4 p-4 md:grid-cols-2 md:p-5"
        onSubmit={event => {
          void handleSubmit(onCreate)(event);
        }}>
        <AdminField label={t("email")} htmlFor="email" error={errors.email?.message}>
          <input id="email" type="email" className="admin-input" {...register("email")} />
        </AdminField>
        <AdminField label={t("name")} htmlFor="name" error={errors.name?.message}>
          <input id="name" className="admin-input" {...register("name")} />
        </AdminField>
        <AdminField label={t("password")} htmlFor="password" error={errors.password?.message}>
          <input id="password" type="password" className="admin-input" {...register("password")} />
        </AdminField>
        <AdminField label={t("role")} htmlFor="role">
          <select id="role" className="admin-input" {...register("role")}>
            <option value="STAFF">{t("roleStaff")}</option>
            <option value="ADMIN">{t("roleAdmin")}</option>
          </select>
        </AdminField>
        <div className="md:col-span-2">
          <button type="submit" className="admin-btn admin-btn-primary">
            {t("create")}
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
              <th scope="col">{t("table.email")}</th>
              <th scope="col">{t("table.role")}</th>
              <th scope="col">{t("table.status")}</th>
              <th scope="col">{t("table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="text-sm">{user.email}</div>
                  {user.name ? (
                    <div className="text-xs text-brand-green/60">{user.name}</div>
                  ) : null}
                </td>
                <td>{user.role}</td>
                <td>{user.active ? t("statusActive") : t("statusInactive")}</td>
                <td>
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary min-h-10 px-3 text-[0.6875rem]"
                    onClick={() => {
                      void onToggle(user);
                    }}>
                    {user.active ? t("deactivate") : t("activate")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
