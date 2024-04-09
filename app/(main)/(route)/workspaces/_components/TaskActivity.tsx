import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { TaskSummary } from '@/lib/type'
import { useQuery } from 'convex/react'
import React, {
  FunctionComponent,
} from 'react'
import {
  ResponsiveContainer,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Rectangle,
  ReferenceLine,
  CartesianGrid,
} from 'recharts'

const ActivityChart = ({
  data,
}: {
  data: TaskSummary[]
}) => {
  const renderColorfulLegendText = (
    value: string,
    entry: any
  ) => {
    const { color } = entry

    return (
      <span
        style={{ color }}
        className="text-tiny-medium capitalize"
      >
        {value}
      </span>
    )
  }
  const CustomizedAxisTick: FunctionComponent<
    any
  > = (props: any) => {
    const { x, y, payload } = props

    return (
      <g
        transform={`translate(${x},${y})`}
      >
        <text
          x={0}
          y={10}
          dy={0}
          textAnchor="middle"
          fill="#666"
          className="truncate text-tiny-medium"
          width={20}
        >
          {payload.value.slice(0, 10)}
        </text>
      </g>
    )
  }
  const CustomLabel: FunctionComponent<
    any
  > = (props: {
    x: any
    y: any
    value: any
  }) => {
    const { x, y, value } = props

    return (
      <text
        x={x + 20}
        y={y - 5}
        dy={0}
        fill="#666"
        fontSize={10}
        textAnchor="middle"
        className="text-tiny-medium"
      >
        {value}
      </text>
    )
  }
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={data}
        barGap="-60%"
        barCategoryGap="20%"
        margin={{
          top: 5,
          right: 5,
          bottom: 0,
          left: 5,
        }}
      >
        <Legend
          wrapperStyle={{
            top: 0,
            right: 0,
          }}
          height={1}
          formatter={
            renderColorfulLegendText
          }
        />
        <XAxis
          dataKey="group"
          angle={90}
          className="text-tiny-semibold"
          tick={<CustomizedAxisTick />}
        />
        <YAxis
          width={20}
          type="number"
          domain={[
            (dataMin: number) =>
              0 - Math.abs(dataMin),
            (dataMax: number) =>
              Math.round(dataMax * 1.2),
          ]}
          className="text-tiny-medium"
        />
        <CartesianGrid strokeDasharray="1 3" />

        <Bar
          dataKey="total"
          fill="var(--secondary)"
          strokeDasharray={2}
          strokeWidth={0.5}
          label={<CustomLabel />}
        />
        <Bar
          dataKey="completed"
          fill="var(--blue)"
          strokeWidth={0.5}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

function TaskActivity({
  workspaceId,
}: {
  workspaceId: Id<'workspace'>
}) {
  const data = useQuery(
    api.tasks.getTaskSummary,
    {
      workspaceId,
    }
  )
  if (!data) {
    return <Spinner />
  }
  return (
    <div className="h-44 w-full">
      <ActivityChart data={data} />
    </div>
  )
}

export default TaskActivity
