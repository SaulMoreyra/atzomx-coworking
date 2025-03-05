import React from "react";

import MenuInformation from "@/components/MenuInformation/MenuInformation";
import MenuList from "@/components/MenuList/MenuList";
import MenuListMobile from "@/components/MenuListMobile/MenuListMobile";

export default async function Home() {
  return (
    <>
      <div className="w-full px-10 gap-5 max-w-7xl pt-9 mx-auto flex flex-col md:flex-row">
        <MenuList />
        <MenuInformation className="hidden lg:block" />
      </div>
      <MenuListMobile />
      <MenuInformation className="block lg:hidden min-w-[100%] mb-0 p-5 md:px-10" />
    </>
  );
}
