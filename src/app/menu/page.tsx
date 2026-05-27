import React from "react";

import MenuList from "@/components/MenuList/MenuList";
import MenuListMobile from "@/components/MenuListMobile/MenuListMobile";
import MenuInformation from "@/components/MenuInformation/MenuInformation";

export default async function MenuPage() {
  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream max-md:bg-brand-main">
      <h1 className="sr-only">Menú de Atzomx Café — Centro de Oaxaca</h1>
      <MenuList />
      <MenuListMobile />

      <section className="border-t border-brand-green/10 bg-brand-main/25 py-10 lg:hidden">
        <div className="section-container max-w-lg">
          <MenuInformation className="static border-brand-green/15" />
        </div>
      </section>
    </div>
  );
}
