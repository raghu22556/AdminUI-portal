import Layout from "../../../components/Layout";
import { Button, Typography } from "@material-tailwind/react";
import { GrAdd } from "react-icons/gr";
import LineChart from "./Charts/LineChart";
import ProgresBar from "./Charts/ProgresBar";
import Cards from "./Cards";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";

// import "ag-grid-community/styles//ag-grid.css";
// import "ag-grid-community/styles//ag-theme-quartz.css";

const Dashboard = () => {
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between mt-4">
          <Typography className="text-xl font-poppins text-black font-bold text-center  lg:text-left mb-4 lg:mb-0">
            Dashboard
          </Typography>
          {/* Dashboard */}
          <div className="flex flex-col lg:flex-row gap-2">
            <Button className="flex items-center gap-3 border border-[#6499E9] text-[#6499E9] bg-transparent mb-2 lg:mb-0 font-normal font-semibold">
              <GrAdd />
              Create Table
            </Button>

            <Button className="flex items-center gap-3 bg-[#95A4FC] mb-2 lg:mb-0  font-semibold">
              <GrAdd />
              Add Module
            </Button>

            <Button className="flex items-center gap-3 bg-[#6499E9] mb-2 lg:mb-0 font-semibold">
              <GrAdd />
              Create Project
            </Button>
          </div>
        </div>
        <Cards />
        {/* Linecharts and Progresbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="overflow-x-auto w-full lg:w-auto shadow-lg">
            <LineChart className="mb-4 lg:mb-0 " />
          </div>
          <div className="w-[100] lg:w-auto">
            <ProgresBar />
          </div>
        </div>
        {/* BarChart and PieChart */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-6">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full md:w-1/2 mb-4 lg:mb-0 shadow-md">
              <BarChart />
            </div>
            <div className="w-full mg:w-1/4">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout(Dashboard);
