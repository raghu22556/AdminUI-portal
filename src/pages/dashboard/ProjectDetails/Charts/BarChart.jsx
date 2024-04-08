import { BarChart } from "@mui/x-charts/BarChart"; // Importing the BarChart component from the @mui/x-charts library
import { useRef } from "react"; // Importing the useRef hook from React

export default function BasicBars() {
  const barChartRef = useRef(null);

  const colorScheme = [
    "#ff7f0e",
    "#2ca02c",
    "#1f77b4",
    "#d62728",
    "#9467bd",
    "#8c564b",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <BarChart
        ref={barChartRef}
        xAxis={[
          {
            scaleType: "band",
            data: [
              "Project 1",
              "Project 2",
              "Project 3",
              "Project 4",
              "Project 5",
              "Project 6",
            ],
            paddingInner: 0.2,
            paddingOuter: 0.3,
          },
        ]}
        series={[{ data: [4, 1, 2, 3, 5, 2] }]}
        width={550}
        height={250}
      >
        {({ bars }) =>
          bars.map((barGroup, groupIndex) =>
            barGroup.map((bar, barIndex) => (
              <rect
                key={`${groupIndex}-${barIndex}`}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={colorScheme[barIndex]}
              />
            ))
          )
        }
      </BarChart>
    </div>
  );
}
