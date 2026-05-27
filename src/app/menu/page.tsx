import React from "react";

import MenuCatalog from "@/components/MenuCatalog/MenuCatalog";

export default async function MenuPage() {
  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <h1 className="sr-only">Menú de Atzomx Café — Centro de Oaxaca</h1>
      <MenuCatalog />
    </div>
  );
}
