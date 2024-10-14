import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card,CardFooter,CardHeader } from "@fluentui/react-components"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"


const chartData = [
  { month: "Enero", desktop: 186 },
  { month: "Febrero", desktop: 305 },
  { month: "Marzo", desktop: 237 },
  { month: "Abril", desktop: 73 },
  { month: "Mayo", desktop: 209 },
  { month: "Junio", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Pacientes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ThreChart() {
  return (
    <Card>
      <CardHeader>
        <p>Area Chart - Linear</p>
        <p>
          Showing total visitors for the last 6 months
        </p>
      </CardHeader>
      <div>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Pacientes
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Enero - Junio 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
