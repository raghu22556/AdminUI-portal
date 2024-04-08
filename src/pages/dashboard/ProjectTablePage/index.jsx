import React from "react";
import Layout from "../../../components/Layout";

import { ProjectCard } from "../../../widgets/cards";
import { IconButton, Typography } from "@material-tailwind/react";
import { GrAdd } from "react-icons/gr";
import OrganizatiopnCardsData from "../../../data/OrganizatiopnCardsData";
import SearchInput from "../../../common/SearchInput";
import AddModuleModal from "../../../components/Modals/AddModuleModal";
// import { Table, Popover } from "antd";


import { Table, Popover, Button, Space } from 'antd';
import { EllipsisOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import AddOrganizationModal from "../../../components/Modals/AddOrganizationModal";
// import { EditIcon } from "../../../assets";
import EditIcon from './../../../assets/editicon.svg'
import StatusIcon from "../../../assets/StatusIcon";
const ProjectTablePage = () => {
  const columns = [
    {
      title: "Sr.no",
      dataIndex: "sr_no",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.sr_no.length - b.sr_no.length,
      sortDirections: ["descend"],
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.created_by - b.created_by,
    },

    {
      title: "Created Date",
      dataIndex: "created_date",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.created_date - b.created_date,
    },
    {
      title: "Modify By",
      dataIndex: "modify_by",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.modify_by - b.modify_by,
    },
    {
      title: "Modify Date",
      dataIndex: "modify_date",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.modify_date - b.modify_date,
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",

      sorter: (a, b) => a.status - b.status,
      render: (status) => {
        let statusLabel;
        switch (status) {
          case "pending":
            // statusLabel = <span className="text-yellow-500">Pending</span>;
            statusLabel = <div className=" flex justify-center">
              <StatusIcon color={'#59A8D4'}/> 
              <span className="text-[#59A8D4]">Pending</span>
            </div>;
            break;
          case "completed":
            // statusLabel = <span className="text-green-500">Completed</span>;
            statusLabel = <div className=" flex justify-center">
            <StatusIcon color={'#4AA785'}/> 
            <span className="text-[#4AA785]">Completed</span>
          </div>;
            break;
          case "inprogress":
            // statusLabel = <span className="text-blue-500">In Progress</span>;
            statusLabel = <div className=" flex justify-center">
            <StatusIcon color={'#59A8D4'} className=" "/> 
            <span className="text-[#59A8D4]">Progress</span>
          </div>;
            break;
          default:
            statusLabel = <span>{status}</span>;
        }
        return statusLabel;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",

      render: (text, record) => (
        <Popover
          content={
            <Space>
              <Button onClick={() => handleEdit(record.key)} type="text">
                <EditOutlined /> View Tables
              </Button>
              <Button onClick={() => handleDelete(record.key)} type="text">
                <DeleteOutlined /> View Tables
              </Button>
            </Space>
          }
          trigger="click"
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Popover>
      ),
    
      // render: (text, record) => (
      //   <Popover
      //     content={
      //       <div className="">
      //         <Button onClick={() => handleEdit(record.key)} type="text">
      //           Edit
      //         </Button>
      //         <Button onClick={() => handleDelete(record.key)} type="text">
      //           Delete
      //         </Button>
      //       </div>
      //     }
      //     trigger="click"
      //   >
      //     {/* <Button type="text"><EditIcon/></Button> */}
      //     {/* <EditIcon/> */}
      //     <IconButton color="white">
      //       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      //         <path d="M4 7C4.55228 7 5 7.44772 5 8C5 8.55229 4.55228 9 4 9C3.44772 9 3 8.55229 3 8C3 7.44772 3.44772 7 4 7Z" fill="#1C1C1C" />
      //         <path d="M8 7C8.55228 7 9 7.44772 9 8C9 8.55229 8.55228 9 8 9C7.44772 9 7 8.55229 7 8C7 7.44772 7.44772 7 8 7Z" fill="#1C1C1C" />
      //         <path d="M13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55229 11.4477 9 12 9C12.5523 9 13 8.55229 13 8Z" fill="#1C1C1C" />
      //       </svg>

      //     </IconButton>


      //   </Popover>
      // ),
    },
  ];
  const data = [
    {
      key: "1",
      sr_no: 1,
      created_by: "John",
      created_date: "2024-04-01",
      modify_by: "Alice",
      modify_date: "2024-04-02",
      status: "pending",
    },
    {
      key: "2",
      sr_no: 2,
      created_by: "John",
      created_date: "2024-04-01",
      modify_by: "Alice",
      modify_date: "2024-04-02",
      status: "pending",
    },
    {
      key: "3",
      sr_no: 3,
      created_by: "John",
      created_date: "2024-04-01",
      modify_by: "Alice",
      modify_date: "2024-04-02",
      status: "completed",
    },
    {
      key: "4",
      sr_no: 4,
      created_by: "John",
      created_date: "2024-04-01",
      modify_by: "Alice",
      modify_date: "2024-04-02",
      status: "completed",
    },
    {
      key: "5",
      sr_no: 5,
      created_by: "John",
      created_date: "2024-04-01",
      modify_by: "Alice",
      modify_date: "2024-04-02",
      status: "inprogress",
    },
    {
      key: "6",
      sr_no: 6,
      created_by: "John",
      created_date: "2024-04-01",
      modify_by: "Alice",
      modify_date: "2024-04-02",
      status: "inprogress",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        <Typography className="text-xl text-black font-bold">
          Project 01
        </Typography>
        {/* <SearchInput/> */}
        <AddOrganizationModal />
      </div>

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {/* {OrganizatiopnCardsData.map(({ icon, title, footer, ...rest }) => (
          <ProjectCard key={title} {...rest} title={title} />
        ))} */}
        <div></div>
      </div>
      <div className="overflow-x-auto">
      <Table
        className="table-auto min-w-full"
        bordered
        size="middle" // or "small" for smaller size
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
   </div>
    </div>
  );
};

export default Layout(ProjectTablePage);
