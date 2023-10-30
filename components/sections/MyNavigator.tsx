"use client";
import React from "react";
import { sidebarLinks, workspaceLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const MyNavigator = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <div className="h-full flex flex-col justify-between px-6 py-4">
      <div className="flex flex-col border-b-[1px] h-3/5 py-2 gap-2">
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
                isActive && "bg-primary-300 dark:bg-light-1"
              }`}
            >
              <div
                className={`${
                  isActive
                    ? "text-light-1 dark:text-dark-1"
                    : "text-dark-2 dark:text-light-1"
                }`}
              >
                {link.component}
              </div>
              <p
                className={`${
                  isActive
                    ? "text-light-1 dark:text-dark-1"
                    : "text-dark-2 dark:text-light-1"
                } max-md:hidden text-base-semibold`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-3 py-2 justify-start">
        <div className="text-base-semibold text-dark-2 dark:text-light-1">
          WorkSpace
        </div>
        <div className="flex flex-col gap-2">
          {workspaceLinks.map((link) => {
            return (
              <Link
                href={link.route}
                key={link.label}
                className="flex gap-2 cursor-pointer"
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                />
                <p className="text-small-medium text-dark-2 dark:text-light-1">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="text-small-medium text-dark-2 cursor-pointer dark:text-light-1">
          View all
        </div>
      </div>
    </div>
  );
};

export default MyNavigator;
