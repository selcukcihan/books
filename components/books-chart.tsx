'use client'

import { ResponsiveBar } from "@nivo/bar"

const getColor = (datum: any) => {
  const tones = [
    "#4793AF", // this won't display anyway, as the data is 0
    "#4793AF",
    "#3F8199",
    "#367085",
    "#2E5F70",
    "#264E5C",
  ]
  return tones[datum.value < tones.length ? datum.value : tones.length - 1]
}

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
        colors={getColor}
        colorBy="indexValue"
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
