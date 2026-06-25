"use client";

import BlogUtilityHeader from "@/components/BlogBanner/BlogUtilityHeader";
import React from "react";
import MenuMasthead from "./MenuMasthead";

/* Hallmark · macrostructure: Catalogue · tone: editorial · anchor hue: forest-green
 * design-system: DESIGN.md · theme: Atzomx brand (preserved)
 * redesign: HomeSectionIntro masthead · square nav pills · alternating bands · typographic rows
 */

const MenuBanner = ({ itemCount }: { itemCount: number }) => (
  <>
    <BlogUtilityHeader />
    <MenuMasthead itemCount={itemCount} />
  </>
);

export default MenuBanner;
