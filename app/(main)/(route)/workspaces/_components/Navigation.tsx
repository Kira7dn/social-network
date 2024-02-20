"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ChevronLeft,
  ChevronRight,
  PlusCircleIcon,
} from "lucide-react";
import { useRef } from "react";

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const create = useMutation(api.workspace.create);
  const workspaces = useQuery(api.workspace.list);
  const handleCreate = () => {
    const promise = create({ name: "Untitled" }).then(
      (workspaceId) =>
        router.push(`/workspaces/${workspaceId}`)
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -=
        scrollContainer.current.scrollWidth * 0.16;
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft +=
        scrollContainer.current.scrollWidth * 0.16;
    }
  };

  return (
    <>
      <aside
        className={cn(
          "h-20 flex w-full bg-background border-b-2 border-primary "
        )}
      >
        <div className="flex w-full gap-2 relative">
          {/* <button
            onClick={handleCreate}
            className="flex-shrink-0 flex items-center justify-center w-14 text-secondary h-full hover:bg-primary hover:text-white bg-card transition-colors duration-200"
          >
            <PlusCircleIcon size={24} />
          </button> */}
          <div
            ref={scrollContainer}
            className=" flex w-full justify-start gap-2 items-center overflow-x-scroll scrollbar-hide group"
          >
            <button
              onClick={scrollLeft}
              className="absolute left-2 opacity-0 group-hover:opacity-100 hover:text-primary transition-opacity p-2 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-2 opacity-0 group-hover:opacity-100 hover:text-primary transition-opacity p-2 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
            {workspaces?.map((workspace, index) => (
              <div
                key={workspace._id}
                onClick={() =>
                  router.push(
                    `/workspaces/${workspace._id}`
                  )
                }
                className={cn(
                  "flex-shrink-0 flex items-center justify-center w20-minus-05 h-full transition-colors duration-200 cursor-pointer",
                  {
                    "bg-primary text-white":
                      pathname ===
                      `/workspaces/${workspace._id}`,
                    "bg-card text-primary hover:bg-primary hover:text-white transition-colors duration-200":
                      pathname !==
                      `/workspaces/${workspace._id}`,
                  }
                )}
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
