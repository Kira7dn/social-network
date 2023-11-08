"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => setTheme("light")}>Light</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => setTheme("dark")}>Dark</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => setTheme("system")}>System</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
