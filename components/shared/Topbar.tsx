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
        "z-50 bg-card fixed top-0 w-full flex justify-center items-center transition-all duration-300 h-14 pr-4",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="px-6 w-full flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <div className="md:justify-end justify-start flex items-center gap-x-8">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && redirect("/sign-in")}
          {isAuthenticated && !isLoading && <UserItem />}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
