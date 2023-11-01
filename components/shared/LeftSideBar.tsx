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
      <article className="rounded-lg grow h-full">
        <MyNavigator />
      </article>
    </section>
  );
};

export default LeftSideBar;
