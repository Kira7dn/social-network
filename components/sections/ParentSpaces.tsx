import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { LucideIcon, MoreHorizontal, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FileIcon } from "lucide-react";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";

function ParentSpaces() {
  const router = useRouter();
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: undefined,
  });
  const onRedirect = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`);
  };
  let Workspaces;
  if (documents === undefined) {
    Workspaces = (
      <>
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
      </>
    );
  } else {
    Workspaces = documents.map((document) => (
      <div key={document._id}>
        <Item
          id={document._id}
          onClick={() => onRedirect(document._id)}
          label={document.title}
          icon={FileIcon}
          documentIcon={document.icon}
        />
      </div>
    ));
  }
  return (
    <div className="flex flex-col gap-3 py-2 justify-start">
      <div className="text-base-semibold">WorkSpace</div>
      <div className="flex flex-col gap-2">{Workspaces}</div>
      <div className="text-small-medium cursor-pointer ">View all</div>
    </div>
  );
}

export default ParentSpaces;
interface ItemProps {
  id?: Id<"documents">;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  documentIcon?: string;
}
export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  documentIcon,
}: ItemProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
      )}
    >
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[50%]" />
    </div>
  );
};
