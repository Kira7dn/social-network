"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import ParentSpaces from "./ParentSpaces";
import { useConvexAuth } from "convex/react";
import { Spinner } from "../../spinner";
import { Logo } from "../TopBar/Logo";
import ProgressChart from "./ProgressChart";

type Props = {};

const LeftSideBar = (props: Props) => {
  const path = usePathname();
  const isHome = path === "/";
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "w-28 pr-2 transition-all ease-out duration-300",
        isHome && "w-3/12"
      )}
    >
      <div
        className={cn(
          "pt-3 fixed top-0 w-24 transition-all ease-out duration-300",
          isHome && "w-72"
        )}
      >
        <article className="h-screen px-3 flex flex-col gap-10 shadow-sidebar rounded-tr-2xl pt-3">
          <section className="w-full">
            <Logo expanded={isHome} />
          </section>
          <section
            className={cn(
              "flex flex-col transition-all ease-out duration-300 h-2/5 justify-center overflow-hidden",
              !isHome && "h-0 opacity-0"
            )}
          >
            <p
              className={cn(
                "text-large-bold",
                !isHome && "opacity-0 text-[0px]"
              )}
            >
              Tasks Progress
            </p>
            <div className="w-full h-full">
              <ProgressChart />
            </div>
          </section>
          <section className="h-full flex flex-col pb-6">
            <div className="flex flex-col justify-between h-3/5">
              {sidebarLinks.map((link) => {
                const isActive =
                  (pathname.includes(link.route) &&
                    link.route.length > 1) ||
                  pathname === link.route;
                return (
                  <Link
                    href={link.route}
                    key={link.label}
                    className={`rounded-sm hover:text-primary flex gap-2 py-1 px-2 ${
                      isActive && "bg-primary"
                    } ${!isHome && "scale-up"}`}
                  >
                    <div
                      className={`${
                        isActive &&
                        "text-primary-foreground"
                      } `}
                    >
                      {link.component}
                    </div>
                    <p
                      className={cn(
                        "max-md:hidden text-base-semibold",
                        isActive &&
                          "text-primary-foreground",
                        !isHome && "hidden"
                      )}
                    >
                      {link.label}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        </article>
      </div>
    </aside>
  );
};

export default LeftSideBar;
