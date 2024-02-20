import { cn } from "@/lib/utils";
import Image from "next/image";

type props = {
  expanded: boolean;
};
export const Logo = ({ expanded }: props) => {
  return (
    <div className="flex items-center gap-x-4 justify-start">
      <Image
        src="/assets/logo.svg"
        height="48"
        width="48"
        alt="Logo"
        className="dark:hidden w-auto"
        priority
      />
      <Image
        src="/assets/logo-dark.svg"
        height="48"
        width="48"
        alt="Logo"
        className="hidden dark:block w-auto"
        priority
      />
      <p
        className={cn(
          "transition-all ease-out duration-300 overflow-hidden text-secondary text-heading4-bold",
          !expanded && "opacity-0"
        )}
      >
        Workspace
      </p>
    </div>
  );
};
