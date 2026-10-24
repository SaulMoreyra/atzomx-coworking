import Image from "next/image";
import React, { type FC } from "react";
import BrandIllustration from "../ui/BrandIllustration/BrandIllustration";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";
import WhatsAppLink from "../WhatsAppLink/WhatsAppLink";
import ScrollToPlansButton from "./ScrollToPlansButton";
import { useTranslations } from "next-intl";

const Presentation: FC = () => {
  const t = useTranslations("home.presentation");

  return (
    <section
      id="home"
      className="relative z-content min-h-[calc(100dvh-4.5rem-env(safe-area-inset-top,0px))] w-full overflow-x-clip bg-brand-main flex flex-col pt-6 pb-0 md:pt-10 text-brand-green"
      data-header-surface="main">
      <div className="flex flex-1 flex-col items-center px-5 w-full">
        <h1 className="sr-only">Café y Coworking en el Centro de Oaxaca</h1>

        {/* Top — logo */}
        <div className="flex flex-col items-center w-full shrink-0">
          <div className="hero-fade-up">
            <Image
              src="/images/logos/logo-atzomx-full.svg"
              alt="Atzomx"
              width={237}
              height={74}
              priority
              unoptimized
              className="h-auto w-[min(100%,237px)] md:w-[min(100%,280px)]"
            />
          </div>
        </div>

        {/* Center — fachada (~45% mockup) */}
        <div className="hero-rise [animation-delay:100ms] w-full flex-1 flex items-center justify-center py-4 md:py-8 min-h-[38vh] md:min-h-[42vh]">
          <BrandIllustration
            id="facade"
            priority
            className="w-full max-w-[min(100%,400px)] md:max-w-[440px]"
            sizes="(max-width: 768px) 100vw, 440px"
          />
        </div>

        {/* Bottom — horario + CTAs discretos */}
        <div className="flex flex-col items-center gap-5 w-full shrink-0 mb-8 md:mb-10">
          <div className="hero-fade-up [animation-delay:200ms] flex flex-col items-center gap-3">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] border border-brand-green rounded-full px-6 py-2 text-brand-green">
              {t("scheduleLabel")}
            </span>
            <p className="text-schedule text-brand-green">
              {t("scheduleHours")}
            </p>
          </div>

          <div className="hero-fade-up [animation-delay:300ms] flex flex-wrap justify-center gap-x-5 gap-y-2 pt-1">
            <ScrollToPlansButton className="text-label text-xs md:text-sm text-brand-green underline-offset-4 hover:underline focus-brand rounded-sm">
              {t("plans")}
            </ScrollToPlansButton>
            <span
              className="text-brand-green/30 hidden sm:inline"
              aria-hidden="true">
              ·
            </span>
            <WhatsAppLink className="text-label text-xs md:text-sm text-brand-green/70 hover:text-brand-green underline-offset-4 hover:underline focus-brand rounded-sm">
              {t("whatsapp")}
            </WhatsAppLink>
          </div>
        </div>
      </div>

      <OrganicDivider
        fill="cream"
        variant="cloud"
        className="w-full shrink-0"
      />
    </section>
  );
};

export default Presentation;
