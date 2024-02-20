"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { Navigation } from "@/app/(main)/(route)/workspaces/_components/Navigation";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    <div className="flex-1 flex flex-col h-full relative bg-card mt-4 max-w-screen-lg rounded-t-3xl overflow-hidden">
      <Navigation />
      {children}
    </div>
  );
};

export default MainLayout;
