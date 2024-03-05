import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type props = {
  expanded: boolean;
  size: number;
};
export const Logo = ({ expanded, size }: props) => {
  return (
    <Link
      className="flex items-center gap-x-4 justify-start"
      href="/dashboard"
    >
      <Image
        src="/assets/logo.svg"
        height={size}
        width={size}
        alt="Logo"
        className="dark:hidden"
        priority
      />
      <Image
        src="/assets/logo-dark.svg"
        height={size}
        width={size}
        alt="Logo"
        className="hidden dark:block"
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
    </Link>
  );
};
