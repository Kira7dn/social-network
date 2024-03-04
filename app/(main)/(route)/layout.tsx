"use client";
import { Topbar } from "@/components/shared/TopBar/Topbar";
import LeftSideBar from "@/components/shared/LeftSideBar/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar/RightSideBar";
import Bottombar from "@/components/shared/Bottombar";
import LayoutComponent2 from "@/components/hocs/layoutComponent2";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return <Spinner />;
  }
  if (!isAuthenticated) {
    redirect("/");
  }
  return (
    <LayoutComponent2
      left={<LeftSideBar />}
      right={<RightSideBar />}
      top={<Topbar />}
      bottom={<Bottombar />}
    >
      {children}
    </LayoutComponent2>
  );
}
