"use client";
import React from "react";
import { sidebarLinks, workspaceLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Workspaces from "./ParentSpaces";

const MyNavigator = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
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
  );
};

export default MyNavigator;
