"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { Spinner } from "@/components/spinner";
import { UserItem } from "./UserItem";
import Link from "next/link";

export const TopbarMarketing = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "py-2 w-full flex justify-between items-center transition-all duration-300 z-50 bg-card sticky top-0",
        scrolled && "shadow-sm"
      )}
    >
      <div className="px-6 w-full flex justify-between items-center">
        <Logo expanded size={40} />
        <div className="justify-between flex gap-x-8 items-center">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <SignInButton
              mode="modal"
              afterSignInUrl="/dashboard"
              redirectUrl="/dashboard"
            >
              <Button
                size="sm"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all ease-in-out duration-300"
              >
                Try Free
              </Button>
            </SignInButton>
          )}
          {isAuthenticated && !isLoading && (
            <div className="flex gap-2">
              <Link href="/dashboard">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-all ease-in-out duration-300"
                >
                  Dashboard
                </Button>
              </Link>
              <UserItem />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
