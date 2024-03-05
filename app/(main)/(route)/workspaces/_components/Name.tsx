"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, usePathname } from "next/navigation";

interface NameProps {
  initialName: string | undefined;
}

export const Name = ({ initialName }: NameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.workspace.update);
  const params = useParams();
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setName(initialName);
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
    setName(event.target.value);
    update({
      id: params.workspaceId as Id<"workspace">,
      name: event.target.value || "Untitled",
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
    <div className="flex items-center w-full h-full text-large-normal">
      {isEditing ? (
        <Input
          type="text"
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={name}
          className="w-full flex justify-start p-0 border-0 h-8 rounded-none text-large-semibold bg-transparent"
        />
      ) : (
        <div
          onClick={enableInput}
          className="w-full flex justify-start p-0 border-0 cursor-text h-8 items-center text-large-semibold"
        >
          <span className="truncate">{initialName}</span>
        </div>
      )}
    </div>
  );
};

Name.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-full h-6" />;
};
