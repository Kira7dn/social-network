import { workspaceLinks } from "@/constants";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Workspaces() {
  return (
    <div className="flex flex-col gap-3 py-2 justify-start">
      <div className="text-base-semibold text-dark-2 dark:text-light-1">
        WorkSpace
      </div>
      <div className="flex justify-start p-2 cursor-pointer">
        <div className="hover:text-primary-500 flex items-center gap-2 text-dark-1 dark:text-light-1">
          <PlusCircle />
          <span className="text-subtle-semibold">Create new</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {/* {workspaceLinks.map((link) => {
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
        })} */}
      </div>
      <div className="text-small-medium text-dark-2 cursor-pointer dark:text-light-1">
        View all
      </div>
    </div>
  );
}

export default Workspaces;
