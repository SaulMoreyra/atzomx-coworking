import { type Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import React, { type FC, useTransition } from "react";
import cx from "classnames";

interface LocaleSwitchProps {
  locale: Locale;
  variant?: "default" | "on-green";
}

const LocaleSwitch: FC<LocaleSwitchProps> = ({ locale, variant = "default" }) => {
  const [isPending, startTransition] = useTransition();

  const onChangeLocale: React.ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    const nextLocale = target.value as Locale;
    startTransition(async () => {
      await setUserLocale(nextLocale);
    });
  };

  return (
    <select
      value={locale}
      onChange={onChangeLocale}
      aria-label="Seleccionar idioma"
      className={cx(
        "rounded-brand text-lg focus-brand px-2 py-1 min-h-[44px] cursor-pointer",
        variant === "on-green"
          ? "text-brand-on-green bg-transparent border border-brand-on-green/30"
          : "text-brand-green bg-transparent border border-brand-green/20",
        { "pointer-events-none opacity-60": isPending }
      )}>
      <option value="es">🇲🇽</option>
      <option value="en">🇺🇸</option>
    </select>
  );
};

export default LocaleSwitch;
