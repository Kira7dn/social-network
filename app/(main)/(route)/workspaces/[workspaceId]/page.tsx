'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Skeleton } from '@/components/ui/skeleton'
import TaskList from '../_components/TaskList'
import TaskActivity from '../_components/TaskActivity'
import Schedule from '../_components/Schedule'
import TaskMember from '../_components/TaskMember'
import WallPaper from '../_components/WallPaper'
import { useMembers } from '@/hooks/use-members'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

interface WorkspaceIdPageProps {
  params: {
    workspaceId: Id<'workspace'>
  }
}

const DocumentIdPage = ({
  params,
}: WorkspaceIdPageProps) => {
  const workspace = useQuery(
    api.workspace.getById,
    {
      workspaceId: params.workspaceId,
    }
  )
  const memberModal = useMembers()

  const handleOpen = () => {
    if (params.workspaceId) {
      memberModal.onOpen(
        params.workspaceId as Id<'workspace'>
      )
    }
  }

  if (!workspace) {
    return (
      <div className="flex flex-col">
        <WallPaper.Skeleton />
        <div className="mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <WallPaper
        url={
          workspace.coverImage
            ? workspace.coverImage
            : '/assets/default-cover-image.jpg'
        }
        icon={
          workspace.iconImage
            ? workspace.iconImage
            : '/assets/logo.svg'
        }
        name={workspace.name}
        title={workspace.title}
      />
      <div className="flex flex-col gap-2">
        <div className="grid h-60 grid-rows-[auto_auto_auto] justify-between gap-2 py-2 md:grid-cols-3">
          <div className="row-span-2 grid grid-rows-subgrid rounded-md border border-solid border-card-foreground p-2">
            <h2 className="items-center text-large-semibold text-card-foreground">
              Today Task
            </h2>
            <TaskList
              workspaceId={
                params.workspaceId
              }
            />
          </div>
          <div className="row-span-2 grid grid-rows-subgrid rounded-md border border-solid border-card-foreground p-2">
            <h2 className="items-center text-large-semibold text-card-foreground">
              Task Activity
            </h2>
            <TaskActivity
              workspaceId={
                params.workspaceId
              }
            />
          </div>
          <div className="row-span-2 grid grid-rows-subgrid rounded-md border border-solid border-card-foreground p-2">
            <div className="flex h-7 w-full justify-between">
              <h2 className="items-center text-large-semibold text-card-foreground">
                Member
              </h2>
              <Button
                className="h-full rounded-md px-2 py-1.5 text-small-regular shadow-sm hover:text-primary"
                variant="ghost"
                onClick={handleOpen}
              >
                <Edit />
              </Button>
            </div>
            <TaskMember />
          </div>
        </div>
        <Schedule
          workspaceId={
            params.workspaceId
          }
        />
      </div>
    </div>
  )
}

export default DocumentIdPage
