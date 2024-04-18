import ReactApexChart from "react-apexcharts";

const chartData = {
  series: [38.6, 22.5, 30.8, 8.1],
  options: {
    chart: {
      type: "donut",
    },
    labels: ["Completed", "Pendings", "Ongoing", "On hold"],
    colors: ["#C6C7F8", "#95A4FC", "#BAEDBD", "#B1E3FF"],
  },
};

const PieChart = () => {
  return (
    <div className="flex justify-center mt-3">
      <div className="lg:w-[100%]  bg-white p-5 rounded-lg shadow-lg w-[420px]  mt-[-10px] ">
        <ReactApexChart
          height={400}
          options={chartData.options}
          series={chartData.series}
          type="donut"
        />
      </div>
    </div>
  );
};

export default PieChart;
