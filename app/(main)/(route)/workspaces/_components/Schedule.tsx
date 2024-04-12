import React from 'react'
import 'react-calendar-timeline/lib/Timeline.css'
import {
  TimelineGroupBase,
  TimelineItemBase,
} from 'react-calendar-timeline'
import TaskDistribution from './TaskDistribute'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Spinner } from '@/components/spinner'
import { User } from '@/lib/type'

export interface TaskItem {
  _id: string
  name: string
  description?: string
  duration: {
    from?: number
    to?: number
  }
  taskGroup?: string
  progress?: number
  workspace?: Id<'workspace'>
  executor: User | null
  initiator?: User | null
  supporter?: User | null
}
export type MergedTaskItem = TaskItem &
  TimelineItemBase<any>
function Schedule({
  workspaceId,
}: {
  workspaceId: Id<'workspace'>
}) {
  const data: TaskItem[] | undefined =
    useQuery(
      api.tasks.listByWorkspace,
      {
        workspaceId,
      }
    )
  if (!data) {
    return <Spinner />
  }
  function getTasks({
    data,
  }: {
    data: TaskItem[]
  }) {
    const colors = [
      'bg-green-600',
      'bg-brightGreen',
      'bg-yellow-500',
    ]
    const groupCounts: {
      [key: string]: number
    } = {}

    const result = data.reduce(
      (acc, task) => {
        const groupId =
          task.taskGroup || 'Common'
        if (
          !acc.groups.some(
            (g) => g.id === groupId
          )
        ) {
          acc.groups.push({
            id: groupId,
            title: groupId,
          })
          groupCounts[groupId] = 0
        }
        const colorIndex =
          groupCounts[groupId] %
          colors.length
        groupCounts[groupId] += 1
        acc.items.push({
          ...task,
          id: task._id,
          group: groupId,
          title: task.name,
          start_time:
            task.duration.from ||
            task.duration.to ||
            '',
          end_time:
            task.duration.to ||
            task.duration.from ||
            '',
          itemProps: {
            className: `${colors[colorIndex]} rounded-md`,
          },
        })
        return acc
      },
      {
        groups:
          [] as TimelineGroupBase[],
        items: [] as MergedTaskItem[],
      }
    )
    result.groups.sort((a, b) => {
      if (a.id === 'Common') return -1
      if (b.id === 'Common') return 1
      return 0
    })

    return result
  }

  const { groups, items } = getTasks({
    data,
  })
  return (
    <TaskDistribution
      groups={groups}
      items={items}
    />
  )
}

export default Schedule
