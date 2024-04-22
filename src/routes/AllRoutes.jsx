// import Dashboard from "../layouts/dashboard";
import LoginPage from "../pages/auth/LoginPage";
import AcceptTermPage from "../pages/auth/AcceptTermPage";
import Organization from "../pages/dashboard/Organization";
import NewOrganization from "../pages/dashboard/NewOrganization";
import ProjectsPage from "../pages/dashboard/Projects";
import ProjectDetailsPage from "../pages/dashboard/ProjectDetails";
import UsersPage from "../pages/dashboard/UsersPage";
import ProjectPage from "../pages/dashboard/ProjectPage";
import SignupPage from "../pages/auth/SignupPage";
import Screen3 from "../common/Screen3";
import ProjectTablePage from "../pages/dashboard/ProjectTablePage";
import Dashboard from "../pages/dashboard/Dashboard";
import MuiComponents from "../Material-UI";
import CardsLayout from "../components/CardsLayout";

import { Forms } from "../maiden-core";

const AllRoutes = [
  { name: "Login", path: "/", element: <LoginPage />, private: false },
  { name: "Signup", path: "/signup", element: <SignupPage />, private: false },
  { name: "Scree3", path: "/screen3", element: <Screen3 />, private: false },
  { name: "Forms", path: "/forms", element: <Forms />, private: false },
  {
    name: "NewOrganization",
    path: "/neworganization",
    element: <NewOrganization />,
    private: false,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    element: <Dashboard />,
    private: false,
  },
  {
    name: "MuiComponents",
    path: "/muiComponents",
    element: <MuiComponents />,
    private: false,
  },
  {
    name: "AcceptTerm",
    path: "/acceptterm",
    element: <AcceptTermPage />,
    private: false,
  },
  {
    name: "Organization",
    path: "/organization",
    element: <Organization />,
    private: false,
  },
  {
    name: "Project",
    path: "/projects",
    element: <ProjectPage />,
    private: false,
  },
  {
    name: "ProjectTable",
    path: "/projectTable",
    element: <ProjectTablePage />,
    private: false,
  },
  {
    name: "ProjectsPage",
    path: "/projectsPage",
    element: <ProjectsPage />,
    private: false,
  },
  // { name: "Dashboard", path: "/dashboard", element: <Dashboard />, private: false },
  {
    name: "Dashboard",
    path: "/ProjectDetailsPage",
    element: <ProjectDetailsPage />,
    private: false,
  },

  {
    name: "UserPage",
    path: "/userpage",
    element: <UsersPage />,
    private: false,
  },
];

let menu = JSON.parse(localStorage.getItem("menu"));

menu.forEach((menuItem) => {
  console.log(menuItem.displayText);

  AllRoutes.push({
    name: menuItem.displayText,
    path: "/" + menuItem.url,
    element: <CardsLayout item={menuItem} />,
    private: false,
  });
});

export default AllRoutes;
