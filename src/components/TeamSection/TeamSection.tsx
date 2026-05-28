"use client";

import { TEAM_DEFAULT_AVATAR, TEAM_MEMBERS } from "@/mocks/team";
import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const TeamSection = () => {
  const t = useTranslations("home.team");

  return (
    <section id="team" data-header-surface="main" className="w-full border-t border-brand-green/10 bg-brand-main py-14 text-brand-green md:py-20">
      <div className="section-container max-w-5xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-20">
          <div className="min-w-0 lg:sticky lg:top-[calc(4.5rem+1.5rem+env(safe-area-inset-top,0px))] lg:self-start">
            <HomeSectionIntro kicker={t("sectionTitle")} title={t("title")} subtitle={t("subtitle")} />
            <p className="text-body mt-8 text-sm leading-relaxed text-brand-green/65 md:text-base">
              {t("storyPrompt")}{" "}
              <Link
                href="/blog/welcome-atzomx"
                className="rounded-sm text-brand-green underline underline-offset-4 hover:text-brand-green/80 focus-brand">
                {t("storyLink")}
              </Link>
            </p>
          </div>

          <ul className="flex min-w-0 flex-col gap-6 md:gap-8" role="list">
            {TEAM_MEMBERS.map(member => (
              <TeamMemberRow key={member.id} memberId={member.id} image={member.image} linkedIn={member.linkedIn} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const TeamMemberRow: React.FC<{
  memberId: string;
  image: string;
  linkedIn?: string;
}> = ({ memberId, image, linkedIn }) => {
  const t = useTranslations("home.team");
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <li className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-5 border-b border-brand-green/12 pb-6 last:border-b-0 md:grid-cols-[6.5rem_minmax(0,1fr)] md:gap-6 md:pb-8">
      <div className="relative h-20 w-20 overflow-hidden border border-brand-green/12 bg-brand-cream md:h-[6.5rem] md:w-[6.5rem]">
        <Image
          src={imgSrc}
          alt={t(`members.${memberId}.name`)}
          fill
          className="object-cover"
          sizes="104px"
          onError={() => {
            if (imgSrc !== TEAM_DEFAULT_AVATAR) setImgSrc(TEAM_DEFAULT_AVATAR);
          }}
        />
      </div>
      <div className="min-w-0">
        <h3 className="text-display-prose text-base font-bold text-brand-green md:text-lg">
          {t(`members.${memberId}.name`)}
        </h3>
        <p className="text-body mt-1 text-sm text-brand-green/65">{t(`members.${memberId}.role`)}</p>
        {linkedIn ? (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label mt-3 inline-flex min-h-[44px] items-center text-[10px] tracking-[0.14em] text-brand-green/60 underline underline-offset-4 hover:text-brand-green focus-brand">
            LinkedIn
          </a>
        ) : null}
      </div>
    </li>
  );
};

export default TeamSection;
