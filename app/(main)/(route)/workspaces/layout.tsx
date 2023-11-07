"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { Navigation } from "@/app/(main)/(route)/workspaces/_components/Navigation";
import { SearchCommand } from "@/components/sections/SearchCommand";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex-1 flex h-full relative">
      <Navigation />
      <div className="flex-1 h-full">
        <SearchCommand />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
