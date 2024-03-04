import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Completed", value: 400 },
  { name: "In Progress", value: 300 },
  { name: "Upcoming", value: 300 },
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
        className="text-heading3-bold"
        x={cx}
        y={cy}
        dy={-40}
        textAnchor="middle"
        fill={fill}
      >
        {payload.value}
      </text>
      <text
        className="text-base-semibold"
        x={cx}
        y={cy}
        dy={-20}
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
export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_: any, index: any) => {
    this.setState({
      activeIndex: index,
    });
  };
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="110%"
            startAngle={180}
            endAngle={0}
            innerRadius="140%"
            outerRadius="180%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
