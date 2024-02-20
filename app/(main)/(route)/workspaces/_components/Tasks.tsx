import { Input } from "@/components/ui/input";
import React from "react";
type ItemProps = {
  title: string;
  timestamp: string;
  checked: boolean;
};

function TaskItem({
  title,
  timestamp,
  checked,
}: ItemProps) {
  return (
    <div className="flex justify-between w-full pr-6">
      <div className="flex flex-col">
        <p className="text-small-regular text-ellipsis text-card-foreground">
          {title}
        </p>
        <p className="text-tiny-medium text-secondary">
          {timestamp}
        </p>
      </div>
      <div className="flex items-center">
        <Input
          type="checkbox"
          defaultChecked={checked}
          className="h-4 w-4"
        />
      </div>
    </div>
  );
}

function TaskList() {
  const tasks = [
    {
      title: "Create Detail Booking",
      timestamp: "2 min ago",
      checked: true,
    },
    {
      title: "Create Invoice",
      timestamp: "5 min ago",
      checked: false,
    },
    {
      title: "Send Email",
      timestamp: "10 min ago",
      checked: false,
    },
    {
      title: "Update Database",
      timestamp: "15 min ago",
      checked: false,
    },
  ];

  return (
    <section className="w-4/12 flex flex-col items-center p-2 bg-card rounded-md border border-solid border-card-foreground text-body-normal text-secondary">
      <header className="self-start text-large-semibold text-card-foreground">
        Today Task
      </header>
      <div className="w-full h-48 overflow-auto gap-2 flex flex-col">
        {tasks.map((task, index) => (
          <TaskItem key={index} {...task} />
        ))}
      </div>
    </section>
  );
}

export default TaskList;
