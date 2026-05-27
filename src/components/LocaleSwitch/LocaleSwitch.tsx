"use client";

import {
  LOCALE_SEGMENTED_MAX,
  localeLabels,
  locales,
  type Locale,
} from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import cx from "classnames";
import React, {
  type FC,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import { Check, Globe } from "react-feather";

interface LocaleSwitchProps {
  locale: Locale;
  variant?: "default" | "on-green";
}

const useSelectLocale = (locale: Locale) => {
  const [isPending, startTransition] = useTransition();

  const selectLocale = useCallback(
    (next: Locale) => {
      if (next === locale || isPending) return;
      startTransition(async () => {
        await setUserLocale(next);
      });
    },
    [isPending, locale]
  );

  return { isPending, selectLocale };
};

interface VariantStyles {
  group: string;
  segmentActive: string;
  segmentInactive: string;
  menuTrigger: string;
  menuPanel: string;
  menuItemActive: string;
  menuItemInactive: string;
}

const variantStyles: Record<NonNullable<LocaleSwitchProps["variant"]>, VariantStyles> = {
  default: {
    group: "border-brand-green/20 bg-brand-cream/40",
    segmentActive: "bg-brand-green text-brand-cream",
    segmentInactive: "text-brand-green hover:bg-brand-main/70",
    menuTrigger:
      "border-brand-green/20 text-brand-green hover:bg-brand-main/50 focus-brand",
    menuPanel: "border-brand-green/15 bg-brand-cream shadow-md",
    menuItemActive: "bg-brand-main text-brand-green font-medium",
    menuItemInactive: "text-brand-green hover:bg-brand-main/60",
  },
  "on-green": {
    group: "border-brand-on-green/30 bg-brand-green/20",
    segmentActive: "bg-brand-cream text-brand-green",
    segmentInactive: "text-brand-on-green/80 hover:bg-brand-green/40",
    menuTrigger:
      "border-brand-on-green/30 text-brand-on-green hover:bg-brand-green/40 focus-brand",
    menuPanel: "border-brand-on-green/20 bg-brand-green shadow-md",
    menuItemActive: "bg-brand-cream/15 text-brand-on-green font-medium",
    menuItemInactive: "text-brand-on-green/90 hover:bg-brand-cream/10",
  },
};

const SegmentedLocaleSwitch: FC<LocaleSwitchProps & { isPending: boolean; onSelect: (l: Locale) => void }> = ({
  locale,
  variant = "default",
  isPending,
  onSelect,
}) => {
  const groupId = useId();
  const styles = variantStyles[variant];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = locales.indexOf(locale);
    if (currentIndex === -1) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      onSelect(locales[(currentIndex + 1) % locales.length]);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      onSelect(locales[(currentIndex - 1 + locales.length) % locales.length]);
    }
  };

  return (
    <div
      id={groupId}
      role="radiogroup"
      aria-label="Seleccionar idioma"
      aria-busy={isPending}
      onKeyDown={onKeyDown}
      className={cx(
        "inline-flex max-w-full rounded-brand border p-0.5",
        styles.group,
        isPending && "pointer-events-none opacity-60"
      )}>
      {locales.map(code => {
        const isActive = code === locale;
        const { name, short } = localeLabels[code];

        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={name}
            title={name}
            disabled={isPending}
            onClick={() => {
              onSelect(code);
            }}
            className={cx(
              "min-h-[44px] min-w-[44px] shrink-0 rounded-[calc(0.75rem-2px)] px-2 sm:px-3",
              "text-label text-xs tracking-[0.14em] transition-colors duration-200",
              "focus-brand focus-visible:z-10",
              isActive ? styles.segmentActive : styles.segmentInactive
            )}>
            {short}
          </button>
        );
      })}
    </div>
  );
};

const MenuLocaleSwitch: FC<LocaleSwitchProps & { isPending: boolean; onSelect: (l: Locale) => void }> = ({
  locale,
  variant = "default",
  isPending,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const styles = variantStyles[variant];
  const current = localeLabels[locale];

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (next: Locale) => {
    onSelect(next);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={`Idioma: ${current.name}. Cambiar idioma`}
        disabled={isPending}
        onClick={() => {
          setIsOpen(open => !open);
        }}
        className={cx(
          "inline-flex min-h-[44px] items-center gap-2 rounded-brand border px-3",
          "text-label text-xs tracking-[0.12em] transition-colors duration-200",
          styles.menuTrigger,
          isPending && "pointer-events-none opacity-60"
        )}>
        <Globe size={16} aria-hidden="true" />
        <span>{current.short}</span>
      </button>

      {isOpen && (
        <ul
          id={menuId}
          role="menu"
          aria-label="Idiomas disponibles"
          className={cx(
            "absolute right-0 z-overlay mt-1 min-w-[11rem] overflow-hidden rounded-brand border py-1",
            styles.menuPanel
          )}>
          {locales.map(code => {
            const isActive = code === locale;
            const { name } = localeLabels[code];

            return (
              <li key={code} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => {
                    handleSelect(code);
                  }}
                  className={cx(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left",
                    "text-sm transition-colors duration-200 focus-brand",
                    isActive ? styles.menuItemActive : styles.menuItemInactive
                  )}>
                  <span>{name}</span>
                  {isActive && <Check size={16} aria-hidden="true" className="shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const LocaleSwitch: FC<LocaleSwitchProps> = props => {
  const { isPending, selectLocale } = useSelectLocale(props.locale);
  const useSegmented = locales.length <= LOCALE_SEGMENTED_MAX;

  if (useSegmented) {
    return (
      <SegmentedLocaleSwitch
        {...props}
        isPending={isPending}
        onSelect={selectLocale}
      />
    );
  }

  return (
    <MenuLocaleSwitch {...props} isPending={isPending} onSelect={selectLocale} />
  );
};

export default LocaleSwitch;
