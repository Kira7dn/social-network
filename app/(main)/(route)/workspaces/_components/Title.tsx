"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

interface TitleProps {
  initialTitle: string | undefined;
}

export const Title = ({ initialTitle }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.workspace.update);
  const params = useParams();
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(initialTitle);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        0,
        inputRef.current.value.length
      );
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
    update({
      id: params.workspaceId as Id<"workspace">,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center w-full h-1/2">
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="w-full flex justify-start p-0 border-0 h-6 rounded-none text-body-medium bg-transparent"
        />
      ) : (
        <div
          onClick={enableInput}
          className="w-full flex justify-start p-0 border-0 cursor-text h-6 items-center text-body-medium"
        >
          <span className="truncate">{initialTitle}</span>
        </div>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-full h-4" />;
};
