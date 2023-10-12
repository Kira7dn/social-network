import { fetchUser } from "@/lib/actions/user.action";
import { SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "../forms/SearchBar";

const UserComponent = async () => {
  return (
    <div className="flex items-center gap-1">
      <div className="md:block hidden ">
        <SignedIn>
          <div className="flex justify-start items-center gap-4">
            <div className="flex gap-5 items-center">
              <div className="cursor-pointer p-2">
                <Image
                  src="/assets/notification.svg"
                  alt="notification"
                  width={20}
                  height={20}
                />
              </div>
              <div className="cursor-pointer p-2">
                <Image
                  src="/assets/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="w-10">
              <UserButton
                appearance={{
                  elements: {
                    userButtonOuterIdentifier:
                      "text-base1-semibold text-primary-500 capitalize",
                    userButtonBox: "flex items-center gap-4",
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <Link
            href="/sign-in"
            className="rounded-lg bg-primary-500 cursor-pointer flex gap-2 items-center px-2 py-1"
          >
            <Image src="/assets/login.svg" alt="login" width="20" height="20" />
            <p className="text-base-regular text-light-1">Sign in with Clerk</p>
          </Link>
        </SignedOut>
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer bg-primary-500 rounded-md p-2">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

const Topbar = async () => {
  return (
    <div className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={46} height={46} />
        <p className="text-heading3-bold text-dark-1 max-xs:hidden">
          Workspace
        </p>
      </Link>
      <SearchBar />
      <UserComponent />
    </div>
  );
};

export default Topbar;
