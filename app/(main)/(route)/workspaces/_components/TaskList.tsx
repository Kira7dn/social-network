import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React from 'react'
import { TaskItem } from './Schedule'
import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

function TaskItemContent({
  task,
}: {
  task: TaskItem
}) {
  const timeRemaining =
    (task.duration.to ??
      new Date().getTime()) -
    new Date().getTime()
  const timeRemainingInDays = Math.ceil(
    timeRemaining /
      (24 * 60 * 60 * 1000)
  )
  return (
    <div className="item-center flex cursor-pointer flex-row justify-start gap-3 space-y-1 rounded-sm pl-2 hover:bg-lightGray dark:hover:bg-slate-800/50">
      <div className="my-auto">
        <Avatar className="h-4 w-4">
          <AvatarImage
            src={
              task.executor?.imageUrl
            }
          />
        </Avatar>
      </div>
      <div className="flex w-full flex-col items-start">
        <div className="w-[90%] truncate text-base-medium font-light">
          {task.name}
        </div>
        <div className="flex w-2/3 gap-2 text-tiny-medium font-light">
          <div className="">
            {timeRemainingInDays +
              ' days remaining'}
          </div>
          <div className="flex items-center">
            <p className="font-bold">
              ({task.progress + ' %'})
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TaskList({
  workspaceId,
}: {
  workspaceId: Id<'workspace'>
}) {
  const tasks = useQuery(
    api.tasks.listTodayTask,
    {
      workspaceId,
    }
  )

  if (!tasks) {
    return <Spinner />
  }

  return (
    <ScrollArea className="h-full w-full">
      {tasks.length === 0 && (
        <div className="text-center text-base-medium font-light">
          No tasks for today
        </div>
      )}
      {tasks.map((task) => (
        <TaskItemContent
          key={task._id}
          task={task}
        />
      ))}
    </ScrollArea>
  )
}

export default TaskList
