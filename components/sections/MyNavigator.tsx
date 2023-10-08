"use client";
import React from "react";
import { sidebarLinks, workspaceLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type Props = {};

const MyNavigator = (props: Props) => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <div className="flex w-full flex-1 flex-col gap-2 px-6 py-4">
      <div className="flex w-full flex-1 flex-col gap-2">
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
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={`/assets/${link.label.toLocaleLowerCase()}${
                  isActive ? "" : "-gray"
                }.svg`}
                alt={link.label}
                width={24}
                height={24}
              />
              <p
                className={`${
                  isActive ? "text-light-1" : "text-dark-2"
                } max-lg:hidden text-base-semibold`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="w-full h-px bg-dark-2"></div>
      <div className="flex flex-col gap-2">
        <div className="text-base-semibold text-dark-2">WorkSpace</div>
        <div className="flex flex-col gap-1">
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
                <p className="text-small-medium text-dark-2">{link.label}</p>
              </Link>
            );
          })}
        </div>
        <div className="text-subtle-medium-regular text-dark-2 cursor-pointer">
          View all
        </div>
      </div>
    </div>
  );
};

export default MyNavigator;
