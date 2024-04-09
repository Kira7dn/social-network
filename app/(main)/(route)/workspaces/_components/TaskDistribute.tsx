import React, { useState } from 'react'
import moment from 'moment'
import 'react-calendar-timeline/lib/Timeline.css'
import {
  CopyPlus,
  EditIcon,
  ListPlus,
} from 'lucide-react'
import ReactCalendarTimeline, {
  DateHeader,
  TimelineHeaders,
  TimelineMarkers,
  CustomMarker,
  CursorMarker,
  ReactCalendarItemRendererProps,
} from 'react-calendar-timeline'
import { TaskSheet } from './TaskSheet'
import { Button } from '@/components/ui/button'
import { TimelineGroupBase } from 'react-calendar-timeline'
import { MergedTaskItem } from './Schedule'
import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar'
import clsx from 'clsx'

const TaskDistribution = ({
  groups,
  items,
}: {
  groups: TimelineGroupBase[]
  items: MergedTaskItem[]
}) => {
  const [defaultTimeStart] = useState(
    moment().add(-12, 'day')
  )
  const [defaultTimeEnd] = useState(
    moment().add(12, 'day')
  )
  const today = Date.now()
  const [task, setTask] = useState<
    MergedTaskItem | undefined
  >(undefined)
  type NewReactCalendarItemRendererProps =
    ReactCalendarItemRendererProps & {
      item: MergedTaskItem
    }
  const itemRenderer = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps,
  }: NewReactCalendarItemRendererProps) => {
    const {
      left: leftResizeProps,
      right: rightResizeProps,
    } = getResizeProps()

    return (
      <div
        {...getItemProps({
          ...item.itemProps,
          className: clsx(
            item.itemProps?.className,
            '!border-none'
          ),
        })}
      >
        {itemContext.useResizeHandle ? (
          <div {...leftResizeProps} />
        ) : null}
        <div
          className={`absolute bottom-0 left-0 top-0 mix-blend-multiply ${item.itemProps?.className} rounded-r-none
          `}
          style={{
            width: `${item.progress}%`,
          }}
        ></div>
        <div
          className={`absolute bottom-0 left-0 top-0 z-[100] flex h-full w-[100%] items-center gap-2 px-1 `}
        >
          <Avatar className="h-6 w-6 border-[1px]">
            <AvatarImage
              src={
                item?.executor?.imageUrl
              }
              alt={
                item?.executor?.fullname
              }
            />
          </Avatar>
          <p className="truncate text-tiny-medium text-white">
            {itemContext.title}
          </p>
        </div>
        {itemContext.useResizeHandle ? (
          <div {...rightResizeProps} />
        ) : (
          ''
        )}
      </div>
    )
  }
  const groupRenderer = ({
    group,
  }: {
    group: TimelineGroupBase
  }) => {
    return (
      <div className="custom-group">
        <span className="title">
          {group.title}
        </span>
        <p className="tip">
          {group.title}
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto h-full w-full rounded-md border border-solid border-secondary px-2 py-2">
      <div className="flex items-center justify-between pb-5 ">
        <h1 className="text-large-semibold">
          Task Distribution
        </h1>
        <div className="flex justify-end gap-2 text-small-medium">
          {task && (
            <>
              <TaskSheet
                item={task}
                key={task.id}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-primary-gradient transition-all duration-300 ease-in-out hover:text-white"
                >
                  <EditIcon
                    size={18}
                    className="mr-2"
                  />
                  Edit Task
                </Button>
              </TaskSheet>
            </>
          )}
          <TaskSheet title="Add new Task">
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-primary-gradient transition-all duration-300 ease-in-out hover:text-white"
            >
              <CopyPlus
                size={18}
                className="mr-2"
              />
              New Task
            </Button>
          </TaskSheet>
        </div>
      </div>

      <ReactCalendarTimeline
        className="my-auto max-w-[1000px] overflow-y-auto"
        groups={groups}
        items={items}
        defaultTimeStart={
          defaultTimeStart
        }
        canMove={false}
        canResize={false}
        canChangeGroup={false}
        defaultTimeEnd={defaultTimeEnd}
        itemRenderer={itemRenderer}
        groupRenderer={groupRenderer}
        minZoom={
          24 * 60 * 60 * 1000 * 3
        }
        maxZoom={24 * 60 * 60}
        stackItems
        lineHeight={60}
        onItemSelect={(
          itemId: number
        ) => {
          const item = items.find(
            (i) => i.id === itemId
          )
          setTask(item)
        }}
        onItemDeselect={() => {
          setTask(undefined)
        }}
      >
        <TimelineHeaders
          className="bg-card text-card-foreground"
          calendarHeaderStyle={{
            border: 'none',
            color:
              'var(--card-foreground)',
          }}
        >
          <DateHeader
            unit="primaryHeader"
            className="border-none bg-card text-large-semibold"
          />
          <DateHeader />
        </TimelineHeaders>
        <TimelineMarkers>
          <CustomMarker date={today}>
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor:
                  'var(--primary)',
                width: '2px',
              }
              return (
                <div
                  style={customStyles}
                />
              )
            }}
          </CustomMarker>
          <CursorMarker />
        </TimelineMarkers>
      </ReactCalendarTimeline>
    </div>
  )
}
export default TaskDistribution
