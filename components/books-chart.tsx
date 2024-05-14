'use client'

import { ResponsiveBar } from "@nivo/bar"

export default function BooksChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveBar
        maxValue={props.bookshelf.chartData.reduce((acc: number, item: any) => Math.max(acc, item.count), 0) + 1}
        data={props.bookshelf.chartData}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 10, right: 0, bottom: 40, left: 40 }}
        padding={0.4}
        colors={["#4793AF"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}
