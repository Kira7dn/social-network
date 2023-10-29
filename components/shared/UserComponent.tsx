import { useConvexAuth } from "convex/react";
import React from "react";
import { Spinner } from "../spinner";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

function UserComponent() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
      {isLoading && <Spinner />}
      {!isAuthenticated && !isLoading && redirect("/sign-in")}
      {isAuthenticated && !isLoading && (
        <>
          <UserButton afterSignOutUrl="/" />
        </>
      )}

      <ModeToggle />
    </div>
  );
}

export default UserComponent;
