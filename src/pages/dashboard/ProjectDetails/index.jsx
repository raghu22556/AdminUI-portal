import React from "react";
import Layout from "../../../components/Layout";
import ProjectCardsData from "../../../data/ProjectCardsData";
import { ProjectCard } from "../../../widgets/cards";
import Sidebar from "../../../components/Sidebar";
import { Button, Typography } from "@material-tailwind/react";
import { GrAdd } from "react-icons/gr";
import { AgGridReact } from "ag-grid-react";
import LineChart from "../ProjectDetails/Charts/LineChart";
import ProgresBar from "./Charts/ProgresBar";
import Cards from "./Cards";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";

import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-quartz.css";

const ProjectDetailsPage = ({ cardNumber, cardTitle }) => {
  const rowData = [
    {
      headerModule: "Module 1",
      createdBy: "Admin",
      createdDate: "20.02.2023",
      modifyBy: "Admin",
      modifyDate: "22.02.2023",
      status: "Pending",
      action: "Edit",
    },
    // Add more data as needed
  ];

  const columnDefs = [
    {
      headerName: "Select",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Header Module", field: "headerModule" },
    { headerName: "Created By", field: "createdBy" },
    { headerName: "Created Date", field: "createdDate" },
    { headerName: "Modify By", field: "modifyBy" },
    { headerName: "Modify Date", field: "modifyDate" },
    { headerName: "Status", field: "status" },
    { headerName: "Action", field: "action" },
  ];

  const gridOptions = {
    pagination: true,
    paginationPageSize: 10, // Number of rows per page
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        <Typography className="text-xl font-poppins text-black font-bold">
          Dashboard
        </Typography>
        <div className="flex flex-col md:flex-row gap-2">
          <Button className="flex items-center gap-3 border border-[#6499E9] text-[#6499E9] bg-transparent mb-2 md:mb-0 font-normal font-semibold">
            <GrAdd />
            Create Table
          </Button>

          <Button className="flex items-center gap-3 bg-[#95A4FC] mb-2 md:mb-0  font-semibold">
            <GrAdd />
            Add Module
          </Button>

          <Button className="flex items-center gap-3 bg-[#6499E9] mb-2 md:mb-0 font-semibold">
            <GrAdd />
            Create Project
          </Button>
        </div>
      </div>
      <Cards />
      <div className="flex flex-col items-center md:flex-row md:items-start justify-between gap-6">
        <LineChart className="mb-4 md:mb-0" />
        <ProgresBar />
      </div>
      <div className="flex justify-between items-center mt-6 bg-gray-100 p-4 ">
        <div className="flex gap-5">
          <BarChart />
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Layout(ProjectDetailsPage);
