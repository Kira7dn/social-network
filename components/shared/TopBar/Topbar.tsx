"use client";

import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Spinner } from "../../spinner";
import { UserItem } from "./UserItem";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export const Topbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={cn(
        "w-full flex justify-between items-center transition-all duration-300 h-14 z-50 bg-card sticky top-0",
        scrolled && "shadow-sm"
      )}
    >
      <div className="px-6 w-full flex justify-between items-center">
        <div className="text-large-semibold text-secondary w-96">
          {formattedDate}
        </div>{" "}
        {/* Display the formatted date */}
        <SearchBar />
        <div className="md:justify-end justify-between flex gap-x-8 w-[400px] items-center">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton
                mode="redirect"
                afterSignInUrl="/dashboard"
              >
                <Button
                  size="sm"
                  className="bg-primary-gradient"
                >
                  Login
                </Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && <UserItem />}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
