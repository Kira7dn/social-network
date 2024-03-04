"use client";

import { ChevronsLeftRight } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/clerk-react";

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../../ui/menubar";

export const UserItem = () => {
  const { user } = useUser();

  return (
    <Menubar className="border-transparent px-2">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer py-0 px-0 ">
          <div
            role="button"
            className="flex items-center text-sm w-full h-full rounded-lg"
          >
            <div className="w-full h-full gap-x-2 flex items-center max-w-[200px]">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <span className="text-start font-medium line-clamp-1">
                {user?.fullName}
              </span>
            </div>
            <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
          </div>
        </MenubarTrigger>
        <MenubarContent
          className="w-80"
          align="center"
          alignOffset={11}
          forceMount
        >
          <div className="flex flex-col space-y-4 p-2 z-10">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
            <div className="flex items-center gap-x-2">
              <div>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
              </div>
              <div className="space-y-1">
                <p className="text-sm line-clamp-2">
                  {user?.fullName}
                </p>
              </div>
            </div>
          </div>
          <MenubarSeparator />
          <MenubarItem
            asChild
            className="w-full cursor-pointer text-muted-foreground"
          >
            <SignOutButton>Log out</SignOutButton>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
