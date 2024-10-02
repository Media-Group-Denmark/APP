"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/(admin)/components/shadcn/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/(admin)/components/shadcn/ui/chart";
import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";

export const description = "An interactive bar chart"

const chartConfig = {
    amount: {
      label: "amount",
      color: "hsl(var(--chart-2))",
    },
  views: {
    label: "views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BarChartPublished( data: Article[] ) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("amount")


    let aggregation = new Map();

  data.data.forEach(article => {

    const date = new Date(article.publishedAt).toISOString().split('T')[0];

    const startEntry = aggregation.get(date) || { date, amount: 0, views: 0 };

    startEntry.amount += 1;               // Tæller antal artikeler
    startEntry.views += article.views;  // Tæller antal visninger

    aggregation.set(date, startEntry);
  });

  // Konverter Map til array for at bruge i grafen
  const chartData = Array.from(aggregation.values());

  const total = React.useMemo(
    () => ({
      amount: chartData.reduce((acc, curr) => acc + curr.amount, 0),
      views: chartData.reduce((acc, curr) => acc + curr.views, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Antal artikler udgivet / besøgt</CardTitle>
          <CardDescription>
            Viser de sidste 1000 artikler fordelt på dato / antal visninger
          </CardDescription>
        </div>
        <div className="flex">
          {["amount", "views"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
