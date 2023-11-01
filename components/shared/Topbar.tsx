"use client";

import { useConvexAuth } from "convex/react";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Spinner } from "../spinner";
import { redirect } from "next/navigation";
import { UserItem } from "../sections/UserItem";
import Link from "next/link";

export const Topbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 w-full  flex justify-center items-center transition-all duration-300",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="px-6 py-4 max-w-screen-2xl w-full flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        {/* <SearchBar /> */}
        <div className="md:justify-end justify-between flex items-center gap-x-8">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && redirect("/log-in")}
          {isAuthenticated && !isLoading && <UserItem />}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
