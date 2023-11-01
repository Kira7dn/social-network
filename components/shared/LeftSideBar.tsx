"use client";
import React from "react";
import MyNavigator from "../sections/MyNavigator";
import { usePathname } from "next/navigation";

type Props = {};

const LeftSideBar = (props: Props) => {
  const path = usePathname();
  const isHome = path === "/";
  console.log(path);

  return (
    <section className={`w-3/12 h-full ${!isHome && "hidden"}`}>
      <aside className="rounded-lg grow h-full bg-background dark:bg-[#1F1F1F] overflow-y-auto w-60">
        <MyNavigator />
      </aside>
    </section>
  );
};

export default LeftSideBar;
