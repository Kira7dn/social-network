import React, { PureComponent, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ActivitiesProps = {
  data: {
    task: string;
    name: string;
    value: number;
  }[];
};

const data = [
  { task: "System Design", name: "Completed", value: 400 },
  {
    task: "System Design",
    name: "In Progress",
    value: 400,
  },
  { task: "Coding/Program", name: "Completed", value: 400 },
  {
    task: "Coding/Program",
    name: "In Progress",
    value: 400,
  },
];
const COLORS = [
  "var(--green)",
  "var(--yellow)",
  "var(--brightGreen)",
];

const renderActiveShape = (props: unknown) => {
  const specificProps = props as {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: any;
    payload: { name: string; value: number };
    percent: number;
    value: number;
  };
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = specificProps;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 6) * cos;
  const sy = cy + (outerRadius + 6) * sin;
  const mx = cx + (outerRadius + 6) * cos;
  const my = cy + (outerRadius + 6) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 4;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        className="text-large-bold"
        x={cx}
        y={cy}
        dy={0}
        textAnchor="middle"
        fill={fill}
      >
        {payload.value}
      </text>
      <text
        className="text-tiny-semibold"
        x={cx}
        y={cy}
        dy={20}
        textAnchor="middle"
        fill={fill}
      >
        {`${payload.name} ${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};
const renderLegend = (props: any) => {
  const { payload } = props;

  return (
    <ul className="flex justify-between w-full px-4">
      {payload.map((entry: any, index: number) => {
        if (entry.value === "Completed")
          return (
            <li
              key={`item-${index}`}
              className="text-small-semibold"
              style={{ color: entry.color }}
            >
              {entry.payload.task}
            </li>
          );
      })}
    </ul>
  );
};
const ActivityChart = ({ data }: ActivitiesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={340} height={340}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((_entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend
          content={renderLegend}
          verticalAlign="bottom"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

function TaskActivity() {
  return (
    <section className="w-4/12 flex flex-col items-center p-2 bg-card rounded-md border border-solid border-card-foreground text-body-normal text-secondary">
      <header className="self-start text-large-semibold text-card-foreground">
        Task Activity
      </header>
      <div className="w-full h-44">
        <ActivityChart data={data} />
      </div>
    </section>
  );
}

export default TaskActivity;
