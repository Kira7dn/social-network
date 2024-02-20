"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useIconImage } from "@/hooks/use-icon-image";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Title } from "./Title";
import { Name } from "./Name";

interface CoverImageProps {
  url?: string;
  icon?: string;
  name?: string;
  title?: string;
  preview?: boolean;
}

export const Cover = ({
  url,
  icon,
  name,
  title,
  preview,
}: CoverImageProps) => {
  const coverImage = useCoverImage();
  const iconImage = useIconImage();

  return (
    <div
      className={cn(
        "relative w-full h-40 group border-b-[1px] border-muted-foreground"
      )}
    >
      {!!url && (
        <Image
          src={url}
          fill
          alt="Cover"
          className="object-cover opacity-30"
          priority
        />
      )}
      <div className="absolute bottom-4 left-16 flex items-center gap-9">
        <Avatar className="w-24 h-24 border-[3px] border-card shadow-sm shadow-secondary">
          <AvatarImage
            src={icon}
            className="object-cover border-[1px] border-secondary"
          />
          <AvatarFallback className="bg-card"></AvatarFallback>
        </Avatar>
        <div className="w-52 h-16 bg-card shadow-sm shadow-secondary rounded-lg py-2 px-4">
          {<Name initialName={name} />}
          {<Title initialTitle={title} />}
        </div>
      </div>

      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={() => iconImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change icon
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="relative w-full h-40 rounded-none">
      <div className="absolute bottom-4 left-16 flex items-center gap-9">
        <Skeleton className="w-24 h-24 rounded-full shadow-sm shadow-secondary"></Skeleton>
        <div className="w-52 h-16 shadow-sm shadow-secondary rounded-lg py-2 px-4 flex flex-col justify-between"></div>
      </div>
    </Skeleton>
  );
};
