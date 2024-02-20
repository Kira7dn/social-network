"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const router = useRouter();
  const create = useMutation(api.workspace.create);
  const onCreate = () => {
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

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/assets/empty.png"
        height={300}
        width={300}
        alt="empty"
        className="dark:hidden"
      />
      <Image
        src="/assets/empty-dark.png"
        height={300}
        width={300}
        alt="empty"
        className="hidden dark:block"
      />
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create new Workspace
      </Button>
    </div>
  );
};

export default DocumentsPage;
