"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import TaskList from "../_components/Tasks";
import TaskActivity from "../_components/TaskActivity";
import Schedule from "../_components/Schedule";
import TaskMember from "../_components/TaskMember";
import { Cover } from "../_components/cover";

interface WorkspaceIdPageProps {
  params: {
    workspaceId: Id<"workspace">;
  };
}

const DocumentIdPage = ({
  params,
}: WorkspaceIdPageProps) => {
  const workspace = useQuery(api.workspace.getById, {
    workspaceId: params.workspaceId,
  });
  console.log(workspace);

  const update = useMutation(api.workspace.update);

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex flex-col">
      <Cover
        url={workspace?.coverImage}
        icon={workspace?.iconImage}
        name={workspace?.name}
        title={workspace?.title}
      />
      <div className="flex flex-col py-2 px-3">
        <div className="flex justify-between py-2  gap-2 h-60">
          <TaskList />
          <TaskActivity />
          <TaskMember members={workspace?.members} />
        </div>
        <Schedule />
      </div>
    </div>
  );
};

export default DocumentIdPage;
