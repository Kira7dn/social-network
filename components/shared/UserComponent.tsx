import { useScrollTop } from "@/hooks/use-scroll-top";
import { useConvexAuth } from "convex/react";
import React from "react";
import { Spinner } from "../spinner";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";

function UserComponent() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
      {isLoading && <Spinner />}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </SignInButton>
          <SignInButton mode="modal">
            <Button size="sm">Get Jotion free</Button>
          </SignInButton>
        </>
      )}
      {isAuthenticated && !isLoading && (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/documents">Enter Jotion</Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </>
      )}

      <ModeToggle />
    </div>
  );
}

export default UserComponent;
