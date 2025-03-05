import { type Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import React, { type FC, useTransition } from "react";
import cx from "classnames";

interface LocaleSwitchProps {
  locale: Locale;
}

const LocaleSwitch: FC<LocaleSwitchProps> = ({ locale }) => {
  const [isPending, startTransition] = useTransition();

  const onChangeLocale: React.ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    const locale = target.value as Locale;
    startTransition(async () => {
      await setUserLocale(locale);
    });
  };

  return (
    <select
      value={locale}
      onChange={onChangeLocale}
      className={cx(
        "rounded-md text-gray-400 text-2xl focus:outline-none bg-transparent",
        { "pointer-events-none opacity-60": isPending }
      )}>
      <option value="es">🇲🇽</option>
      <option value="en">🇺🇸</option>
    </select>
  );
};

export default LocaleSwitch;
