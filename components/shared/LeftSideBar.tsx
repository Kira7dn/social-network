"use client";
import React from "react";
import MyNavigator from "../sections/MyNavigator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { sidebarLinks, workspaceLinks } from "@/constants";
import Link from "next/link";
import Workspaces from "../sections/Workspaces";

type Props = {};

const LeftSideBar = (props: Props) => {
  const path = usePathname();
  const isHome = path === "/";
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <aside
      className={cn(
        "rounded-lg overflow-y-auto w-60 h-full",
        !isHome && "hidden"
      )}
    >
      <div className="h-full flex flex-col gap-2 px-6 py-4">
        <div className="flex flex-col border-b-[1px] py-2 gap-2">
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            if (link.route === "/profile") {
              link.route = `${link.route}/${userId}`;
            }
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`rounded-xl flex gap-2 py-2 px-2 ${
                  isActive && "bg-primary"
                }`}
              >
                <div className={`${isActive && "text-primary-foreground"}`}>
                  {link.component}
                </div>
                <p
                  className={`${
                    isActive && "text-primary-foreground"
                  } max-md:hidden text-base-semibold`}
                >
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
        <Workspaces />
      </div>
    </aside>
  );
};

export default LeftSideBar;
