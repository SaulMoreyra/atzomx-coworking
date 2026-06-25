"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import cx from "classnames";
import LocaleSwitch from "@/components/LocaleSwitch/LocaleSwitch";
import { type Locale } from "@/i18n/config";
import { fetchCurrentAdmin, logoutAdmin } from "@/lib/api/client";
import type { AdminUser } from "@/lib/api/admin-types";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const t = useTranslations("admin.layout");
  const isLogin = pathname === "/admin/login";
  const [user, setUser] = useState<AdminUser | null>(null);

  const navItems = useMemo(
    () => [
      { href: "/admin/products", label: t("nav.products") },
      { href: "/admin/categories", label: t("nav.categories") },
      { href: "/admin/users", label: t("nav.users"), adminOnly: true },
    ],
    [t]
  );

  useEffect(() => {
    if (isLogin) return;

    fetchCurrentAdmin()
      .then(result => {
        setUser(result.user);
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [isLogin, router]);

  if (isLogin) {
    return <div className="admin-shell font-sans text-brand-green">{children}</div>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.replace("/admin/login");
  };

  return (
    <div className="admin-shell font-sans text-brand-green">
      <div className="admin-layout flex min-h-dvh">
        <aside className="admin-sidebar flex shrink-0 flex-col p-4 md:p-6">
          <div className="mb-8">
            <p className="text-label text-xs tracking-[0.18em] text-brand-green/60">{t("brand")}</p>
            <h1 className="text-display-prose mt-1 text-xl font-bold">{t("title")}</h1>
          </div>

          <nav className="flex flex-col gap-1" aria-label={t("navAriaLabel")}>
            {navItems
              .filter(item => !item.adminOnly || user?.role === "ADMIN")
              .map(item => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "text-label flex min-h-11 items-center px-3 text-xs tracking-[0.14em] transition-colors duration-150",
                      active
                        ? "bg-brand-green text-brand-cream"
                        : "text-brand-green/75 hover:bg-brand-green/5 hover:text-brand-green"
                    )}
                    aria-current={active ? "page" : undefined}>
                    {item.label}
                  </Link>
                );
              })}
          </nav>

          <div className="mt-auto border-t border-brand-green pt-4">
            {user ? (
              <p className="text-body text-sm text-brand-green/70">
                {user.name ?? user.email}
                <span className="mt-1 block text-xs uppercase tracking-[0.12em]">
                  {user.role}
                </span>
              </p>
            ) : null}
            <div className="mt-4">
              <LocaleSwitch locale={locale} />
            </div>
            <button
              type="button"
              className="admin-btn admin-btn-secondary mt-4 w-full"
              onClick={() => {
                void handleLogout();
              }}>
              {t("logout")}
            </button>
          </div>
        </aside>

        <main className="admin-main min-w-0 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
