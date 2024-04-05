import React from "react";
import Layout from "../../../components/Layout";

import { ProjectCard } from "../../../widgets/cards";
import { Button, Typography } from "@material-tailwind/react";
import { GrAdd } from "react-icons/gr";
import OrganizatiopnCardsData from "../../../data/OrganizatiopnCardsData";
import SearchInput from "../../../common/SearchInput";
import AddModuleModal from "../../../components/Modals/AddModuleModal";
import { Table,Popover } from 'antd';
import AddOrganizationModal from "../../../components/Modals/AddOrganizationModal";
const ProjectTablePage = () => {





const columns = [
  {
    title: 'Sr.no',
    dataIndex: 'sr_no',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.sr_no.length - b.sr_no.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.created_by - b.created_by,
  },
  
  {
    title: 'Created Date',
    dataIndex: 'created_date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.created_date - b.created_date,
   
  },{
    title: 'Modify By',
    dataIndex: 'modify_by',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.modify_by - b.modify_by,
  
  },{
    title: 'Modify Date',
    dataIndex: 'modify_date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.modify_date - b.modify_date,
    
  },{
    title: 'Status',
    dataIndex: 'status',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.status - b.status,
    render: status => {
      let statusLabel;
      switch (status) {
        case 'pending':
          statusLabel = <span className="text-yellow-500">Pending</span>;
          break;
        case 'completed':
          statusLabel = <span className="text-green-500">Completed</span>;
          break;
        case 'inprogress':
          statusLabel = <span className="text-blue-500">In Progress</span>;
          break;
        default:
          statusLabel = <span>{status}</span>;
      }
      return statusLabel;
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => (
      <Popover
        content={
          <div>
            <Button onClick={() => handleEdit(record.key)} type="text">
              {/* <EditOutlined /> */}
               Edit
            </Button>
            <Button onClick={() => handleDelete(record.key)} type="text">
              {/* <DeleteOutlined /> */}
               Delete
            </Button>
          </div>
        }
        trigger="click"
      >
        <Button type="text">Actions</Button>
      </Popover>
    ),
  },
];
const data = [

  { key: '1',sr_no: 1, created_by: 'John', created_date: '2024-04-01', modify_by: 'Alice', modify_date: '2024-04-02', status: 'pending' },
  { key: '2',sr_no: 2, created_by: 'John', created_date: '2024-04-01', modify_by: 'Alice', modify_date: '2024-04-02', status: 'pending' },
  { key: '3',sr_no: 3, created_by: 'John', created_date: '2024-04-01', modify_by: 'Alice', modify_date: '2024-04-02', status: 'completed' },
  { key: '4',sr_no: 4, created_by: 'John', created_date: '2024-04-01', modify_by: 'Alice', modify_date: '2024-04-02', status: 'completed' },
  { key: '5',sr_no: 5, created_by: 'John', created_date: '2024-04-01', modify_by: 'Alice', modify_date: '2024-04-02', status: 'inprogress' },
  { key: '6',sr_no: 6, created_by: 'John', created_date: '2024-04-01', modify_by: 'Alice', modify_date: '2024-04-02', status: 'inprogress' },
  
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};




  return (
    <div>
      <div className="flex justify-between mt-4">
        <Typography className="text-xl text-black font-bold">
        Project 01
        </Typography>
        {/* <SearchInput/> */}
        <AddOrganizationModal/>
        
      </div>

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {/* {OrganizatiopnCardsData.map(({ icon, title, footer, ...rest }) => (
          <ProjectCard key={title} {...rest} title={title} />
        ))} */}
  <div >
  
    </div>

      </div>

      <Table
    className="table-auto min-w-full"
    bordered
    size="middle" // or "small" for smaller size
    columns={columns}
    dataSource={data}
    onChange={onChange}
    showSorterTooltip={{
      target: 'sorter-icon',
    }}
  />
    </div>
  );
};

export default Layout(ProjectTablePage);
