import React, { type FC } from "react";
import { Clock, MapPin, PhoneCall } from "react-feather";
import cx from "classnames";
import { useTranslations } from "next-intl";

interface MenuInformationProps {
  className?: string;
}

const ADDRESS =
  "C. de Los Libres 800-letra B, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax.";
const PHONE = "+52 951 515 5328";

const MenuInformation: FC<MenuInformationProps> = ({ className }) => {
  const t = useTranslations("menu");

  return (
    <section
      className={cx(
        "sticky top-36 bg-gray-100 rounded-lg w-[287px] p-5 pb-6 self-start",
        className
      )}>
      <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-5 uppercase">
        {t("information.title")}
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-1 gap-4">
          <div className="p-2 bg-white rounded-md flex items-center justify-center w-12 h-12">
            <Clock className="w-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t("information.hours")}
            </h2>
            <p className="text-gray-500 text-md">
              {t("information.schedule-days")}
            </p>
            <p className="text-gray-400 text-sm">
              {t("information.schedule-hours")}
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-4">
          <div className="p-2 bg-white rounded-md flex items-center justify-center w-12 h-12">
            <MapPin className="w-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t("information.address")}
            </h2>
            <p className="text-gray-500 text-sm">{ADDRESS}</p>
            <a
              target="_blank"
              href="https://maps.app.goo.gl/oWku9z3EYJRy7iKTA"
              className="text-blue-500 text-sm"
              rel="noreferrer">
              {t("information.button-map")}
            </a>
          </div>
        </div>
        <div className="flex flex-1 gap-4">
          <div className="p-2 bg-white rounded-md flex items-center justify-center w-12 h-12">
            <PhoneCall className="w-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t("information.contact")}
            </h2>
            <p className="text-gray-500 text-md">{PHONE}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuInformation;
