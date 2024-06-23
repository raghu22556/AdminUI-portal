// import Dashboard from "../layouts/dashboard";
import React, { useState } from 'react';
import LoginPage from '../pages/auth/LoginPage';
import AcceptTermPage from '../pages/auth/AcceptTermPage';
import Organization from '../pages/dashboard/Organization';
import NewOrganization from '../pages/dashboard/NewOrganization';
import ProjectsPage from '../pages/dashboard/Projects';
import ProjectDetailsPage from '../pages/dashboard/ProjectDetails';
import UsersPage from '../pages/dashboard/UsersPage';
import ProjectPage from '../pages/dashboard/ProjectPage';
import SignupPage from '../pages/auth/SignupPage';
import Screen3 from '../common/Screen3';
import ProjectTablePage from '../pages/dashboard/ProjectTablePage';
import Dashboard from '../pages/dashboard/Dashboard';
import MuiComponents from '../Material-UI';
import CardsLayout from '../components/CardsLayout';
// import LookUpType from "../pages/views/LookUpType"
import DynamicBaseView from '../components/DynamicBaseView';
import { Forms } from '../maiden-core';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import PasswordUpdate from '../pages/dashboard/UserProfile/PasswordUpdate';
import UserProfileUpdate from '../pages/dashboard/UserProfile/UserProfileUpdate';
import UploadPDF from '../pages/dashboard/UploadPDF';
import Chat from '../components/Chat';

// const pages = {
//   LookUpType: <LookUpType/>
// }

const AllRoutes = [
  { name: 'Login', path: '/', element: <LoginPage />, private: false },
  { name: 'Signup', path: '/signup', element: <SignupPage />, private: false },
  { name: 'Scree3', path: '/screen3', element: <Screen3 />, private: false },
  { name: 'Forms', path: '/forms', element: <Forms />, private: false },
  { name: 'password', path: '/password', element: <PasswordUpdate />, private: false },
  { name: 'uploadPDF', path: '/uploadPDF', element: <UploadPDF />, private: false },
  {
    name: 'userProfileUpdate',
    path: '/userProfileUpdate',
    element: <UserProfileUpdate />,
    private: false,
  },

  {
    name: 'NewOrganization',
    path: '/neworganization',
    element: <NewOrganization />,
    private: false,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    private: false,
  },
  {
    name: 'MuiComponents',
    path: '/muiComponents',
    element: <MuiComponents />,
    private: false,
  },
  {
    name: 'AcceptTerm',
    path: '/acceptterm',
    element: <AcceptTermPage />,
    private: false,
  },
  {
    name: 'Organization',
    path: '/organization',
    element: <Organization />,
    private: false,
  },
  {
    name: 'Project',
    path: '/projects',
    element: <ProjectPage />,
    private: false,
  },
  {
    name: 'ProjectTable',
    path: '/projectTable',
    element: <ProjectTablePage />,
    private: false,
  },
  {
    name: 'ProjectsPage',
    path: '/projectsPage',
    element: <ProjectsPage />,
    private: false,
  },
  // { name: "Dashboard", path: "/dashboard", element: <Dashboard />, private: false },
  {
    name: 'Dashboard',
    path: '/ProjectDetailsPage',
    element: <ProjectDetailsPage />,
    private: false,
  },

  {
    name: 'UserPage',
    path: '/userpage',
    element: <UsersPage />,
    private: false,
  },
];

const Components = {
  Chat
};

if (localStorage.getItem('menu') !== null) {
  const DynamicComponent = (tableName) => {
    const [drawer, setDrawer] = useState(false);
    const handleToggle = () => setDrawer(!drawer);
    return (
      <div className="flex relative h-screen overflow-hidden dark:bg-gray-900">
        {/* Sidebar */}
        <section
          id="sidebar"
          style={{
            width: '23%',
            // borderRight:'2px solid red'
          }}
          // className={`w-80 z-50 lg:w-80 overflow-y-auto md:w-96 shadow border-gray-200 bg-white p-2 md:static absolute h-full transition-all duration-50 ${
          //   drawer ? "md:hidden left-0" : "-left-full"
          // }`}
          className={`w-60 z-50 lg:w-60 overflow-y-auto md:w-60  border-gray-200 bg-white p-2 md:static absolute h-full transition-all duration-50 dark:bg-gray-900 ${
            drawer ? 'md:hidden left-0' : '-left-full'
          }`}
        >
          <Sidebar handleToggle={handleToggle} />
        </section>

        {/* Navbar & Child */}
        <section className="overflow-auto h-full w-full bg-[rgb(247,245,250)]">
          <Navbar handleToggle={handleToggle} drawer={drawer} />
          <div className="p-4 h-auto">
            <DynamicBaseView {...tableName} />
          </div>
        </section>
      </div>
    );
  };

  let menu = JSON.parse(localStorage.getItem('menu') || '[]');
  let masterConfig = JSON.parse(localStorage.entityMapping || '{}');
  menu.forEach((menuItem) => {
    console.log(menuItem.displayText);
    if (menuItem.children) {
      AllRoutes.push(
        ...menuItem.children.map((childItem) => {
          let element;
          if (masterConfig[childItem.tableName]) {
            element = <DynamicComponent tableName={childItem.tableName} />;
          } else if (Components[childItem.url]) {
            let DComponent = Components[childItem.url];
            element = <DComponent />;
          } else {
            element = <div>Need to Implement</div>;
          }
          return {
            name: menuItem.displayText,
            path: '/' + menuItem.url + '/' + childItem.url,
            element,
            private: false,
          };
        }),
      );
    }
    AllRoutes.push({
      name: menuItem.displayText,
      path: '/' + menuItem.url,
      element: <CardsLayout item={menuItem} />,
      private: false,
    });
  });
}
export default AllRoutes;
