"use client";

import { TEAM_DEFAULT_AVATAR, TEAM_MEMBERS } from "@/mocks/team";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import Label from "@/components/ui/Label/Label";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const TeamSection = () => {
  const t = useTranslations("home.team");

  return (
    <>
      <OrganicDivider fill="main" variant="cloud" />
      <section id="team" className="w-full bg-brand-main py-14 text-brand-green md:py-20">
        <div className="section-container max-w-5xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12">
            <HighlightShape variant="cloud" fill="accent" size={48} className="opacity-95" />
            <Label as="p" className="text-xs tracking-[0.25em]">
              {t("sectionTitle")}
            </Label>
            <h2 className="text-label text-xl normal-case tracking-wide md:text-2xl">{t("title")}</h2>
            <p className="text-body max-w-2xl text-sm leading-relaxed text-brand-green/70 md:text-base">
              {t("subtitle")}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {TEAM_MEMBERS.map(member => (
              <TeamMemberCard key={member.id} memberId={member.id} image={member.image} linkedIn={member.linkedIn} />
            ))}
          </ul>

          <p className="text-body mt-10 text-center text-sm text-brand-green/65 md:text-base">
            {t("storyPrompt")}{" "}
            <Link
              href="/blog/welcome-atzomx"
              className="text-brand-green underline underline-offset-4 hover:text-brand-green/80 focus-brand rounded-sm">
              {t("storyLink")}
            </Link>
          </p>
        </div>
      </section>
      <OrganicDivider fill="cream" variant="wave" />
    </>
  );
};

const TeamMemberCard: React.FC<{
  memberId: string;
  image: string;
  linkedIn?: string;
}> = ({ memberId, image, linkedIn }) => {
  const t = useTranslations("home.team");
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <li className="flex flex-col items-center gap-4 border border-brand-green/12 bg-brand-cream p-6 text-center md:p-8">
      <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-brand-accent md:h-32 md:w-32">
        <Image
          src={imgSrc}
          alt={t(`members.${memberId}.name`)}
          fill
          className="object-cover"
          sizes="128px"
          onError={() => {
            if (imgSrc !== TEAM_DEFAULT_AVATAR) setImgSrc(TEAM_DEFAULT_AVATAR);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-label text-sm normal-case tracking-wide md:text-base">
          {t(`members.${memberId}.name`)}
        </h3>
        <p className="text-body text-sm text-brand-green/65">{t(`members.${memberId}.role`)}</p>
      </div>
      {linkedIn ? (
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-label min-h-[44px] text-[10px] tracking-[0.14em] text-brand-green/60 underline underline-offset-4 hover:text-brand-green focus-brand">
          LinkedIn
        </a>
      ) : null}
    </li>
  );
};

export default TeamSection;
