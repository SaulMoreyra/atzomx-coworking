import React from "react";

import MenuList from "@/components/MenuList/MenuList";
import MenuListMobile from "@/components/MenuListMobile/MenuListMobile";
import MenuInformation from "@/components/MenuInformation/MenuInformation";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";

export default async function MenuPage() {
  return (
    <div className="bg-brand-cream min-h-screen flex flex-col flex-1 site-main">
      <h1 className="sr-only">Menú de Atzomx Café — Centro de Oaxaca</h1>
      <MenuList />
      <MenuListMobile />

      <OrganicDivider fill="main" variant="clover" />
      <div className="w-full bg-brand-main lg:hidden pb-10 pt-2">
        <div className="section-container">
          <MenuInformation className="static max-w-lg mx-auto border-brand-green/15" />
        </div>
      </div>
    </div>
  );
}
