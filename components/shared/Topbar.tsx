"use client";

import React from "react";
import SearchBar from "../forms/SearchBar";

import { Logo } from "./Logo";
import UserComponent from "./UserComponent";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

const Topbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <UserComponent />
    </div>
  );
};

export default Topbar;
