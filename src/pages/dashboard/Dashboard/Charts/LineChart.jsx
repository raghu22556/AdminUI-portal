import { LineChart } from "@mui/x-charts/LineChart";

const uData = [5000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 4000, 3908, 4800, 3800, 4300];
const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SimpleLineChart() {
  return (
    <div className="mt-6 max-w-screen-md mx-auto bg-white p-4 shadow-md rounded-lg scrollBars">
      <div className="overflow-x-auto">
        <LineChart
          width={620}
          height={170}
          series={[{ data: pData }, { data: uData }]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </div>
    </div>
  );
}
