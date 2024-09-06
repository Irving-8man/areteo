import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import { Card,CardHeader,CardFooter } from "@fluentui/react-components"

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
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function FourChart() {
  return (
    <Card>
      <CardHeader>
        <p>Bar Chart - Label</p>
        <p>Enero - Junio 2024</p>
      </CardHeader>
      <div>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Pacientes
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrar total de pacientes  en 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
