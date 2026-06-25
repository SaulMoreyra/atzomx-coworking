"use client";

import React from "react";
import BlogIndexMasthead from "./BlogIndexMasthead";
import BlogUtilityHeader from "./BlogUtilityHeader";

/* Hallmark · macrostructure: Index-First · tone: editorial · anchor hue: forest-green
 * design-system: DESIGN.md · theme: Atzomx brand (preserved)
 * redesign: HomeSectionIntro masthead · square filters · typographic index list
 */

const BlogBanner = () => (
  <>
    <BlogUtilityHeader />
    <BlogIndexMasthead />
  </>
);

export default BlogBanner;
