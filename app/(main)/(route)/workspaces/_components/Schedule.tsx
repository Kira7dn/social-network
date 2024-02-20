import React, { useState } from "react";
import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";
import { ListPlus } from "lucide-react";
import ReactCalendarTimeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker,
  IntervalRenderer,
} from "react-calendar-timeline";
import Image from "next/image";

export interface TaskItem {
  color: any;
  selectedBgColor: any;
  id: number;
  group: number;
  title: string;
  start_time: moment.Moment;
  end_time: moment.Moment;
  bgColor?: string;
  itemProps?: {
    style: {
      background: string;
      color: string;
    };
  };
  height?: number;
}

interface Group {
  id: number;
  title: string;
}

const groups: Group[] = [
  { id: 1, title: "System Design" },
  { id: 2, title: "Coding/Programming" },
];

const items: TaskItem[] = [
  {
    id: 1,
    group: 1,
    title: "Implement security and data privacy measures",
    start_time: moment().add(-5, "day"),
    end_time: moment().add(5, "day"),
    color: "var(--secondary)",
    selectedBgColor: "yellow",
    bgColor: "var(--blue)",
    itemProps: {
      style: {
        background: "#f0f0f0",
        color: "black",
      },
    },
    height: 60,
  },
  {
    id: 2,
    group: 1,
    title:
      "Test the app across different devices and operating systems.",
    start_time: moment().add(-5, "day"),
    end_time: moment().add(5, "day"),
    color: "var(--secondary)",
    selectedBgColor: "yellow", // Add the selectedBgColor property
    bgColor: "var(--blue)",
    itemProps: {
      style: {
        background: "#f0f0f0",
        color: "black",
      },
    },
  },
  {
    id: 3,
    group: 2,
    title: "Estimate the time required for each task",
    start_time: moment().add(-5, "day"),
    end_time: moment().add(5, "day"),
    color: "var(--secondary)",
    selectedBgColor: "yellow",
    bgColor: "var(--blue)",
    itemProps: {
      style: {
        background: "#f0f0f0",
        color: "black",
      },
    },
  },
  // Repeat items in accordance with your specified interaction or duplication requirements
];

const TaskDistribution: React.FC = () => {
  const [defaultTimeStart] = useState(
    moment().add(-12, "day")
  );
  const [defaultTimeEnd] = useState(
    moment().add(12, "day")
  );
  const today = Date.now();

  const itemRenderer = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps,
  }: {
    item: TaskItem;
    itemContext: any; // Replace 'any' with the appropriate type for 'itemContext'
    getItemProps: any; // Replace 'any' with the appropriate type for 'getItemProps'
    getResizeProps: any; // Replace 'any' with the appropriate type for 'getResizeProps'
  }) => {
    const {
      left: leftResizeProps,
      right: rightResizeProps,
    } = getResizeProps();

    const backgroundColor = itemContext.selected
      ? itemContext.dragging
        ? "red"
        : item.selectedBgColor
      : item.bgColor;
    const borderColor = itemContext.resizing
      ? "red"
      : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            borderColor,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
          },
        })}
      >
        {itemContext.useResizeHandle ? (
          <div {...leftResizeProps} />
        ) : null}

        <div className="flex gap-2 items-center px-1 h-full">
          <div className="w-4 h-4 flex-shrink-0">
            <Image
              src="/assets/sampleUser.png"
              alt="User"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          <p
            style={{
              height: "100%",
              overflow: "hidden",
              paddingLeft: 3,
              whiteSpace: "nowrap",
            }}
            className="text-tiny-medium text-card-foreground text-ellipsis flex items-center"
          >
            {itemContext.title}
          </p>
        </div>
        {itemContext.useResizeHandle ? (
          <div {...rightResizeProps} />
        ) : null}
      </div>
    );
  };
  return (
    <div className="container mx-auto px-4 py-5 bg-card rounded-md border border-solid border-card-foreground text-card-foreground">
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-large-semibold">
          Task Distribution
        </h1>
        <button className="flex items-center gap-3 px-2 py-1 text-base rounded bg-primary-gradient text-primary-foreground">
          <ListPlus size={16} />
          New Task
        </button>
      </div>
      <ReactCalendarTimeline
        groups={groups}
        items={items}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        itemRenderer={itemRenderer}
        minZoom={24 * 60 * 60 * 1000 * 3}
        maxZoom={24 * 60 * 60}
        stackItems
        canMove={true}
        canChangeGroup={false}
        itemTouchSendsClick={false}
        lineHeight={60}
        traditionalZoom={false}
      >
        <TimelineHeaders
          className="bg-card text-card-foreground"
          calendarHeaderStyle={{
            border: "none",
            color: "var(--card-foreground)",
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
                backgroundColor: "var(--primary)",
                width: "2px",
              };
              return <div style={customStyles} />;
            }}
          </CustomMarker>
          <CursorMarker />
        </TimelineMarkers>
      </ReactCalendarTimeline>
    </div>
  );
};

export default TaskDistribution;
