"use client";

import BlogUtilityHeader from "@/components/BlogBanner/BlogUtilityHeader";
import React from "react";
import MenuMasthead from "./MenuMasthead";

/* Hallmark · macrostructure: Catalogue · tone: editorial · anchor hue: forest-green
 * nav: subpage utility bar · footer: site Footer (unchanged) · enrichment: none
 */

const MenuBanner = ({ itemCount }: { itemCount: number }) => (
  <>
    <BlogUtilityHeader />
    <MenuMasthead itemCount={itemCount} />
  </>
);

export default MenuBanner;
