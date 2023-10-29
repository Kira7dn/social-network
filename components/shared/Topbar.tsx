"use client";

import { useConvexAuth } from "convex/react";
import { UserButton } from "@clerk/clerk-react";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Spinner } from "../spinner";
import { useUser } from "@clerk/clerk-react";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";
import SearchBar from "../forms/SearchBar";

export const Topbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0  w-full px-6 py-4 flex justify-center items-center transition-all duration-300",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="max-w-screen-2xl w-full flex justify-between items-center">
        <Logo />
        <SearchBar />
        <div className="md:justify-end justify-between flex items-center gap-x-8">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && redirect("/log-in")}
          {isAuthenticated && !isLoading && (
            <>
              <UserButton
                afterSignOutUrl="/"
                showName
                appearance={{
                  elements: {
                    userButtonOuterIdentifier: "dark:text-white",
                  },
                }}
              />
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
