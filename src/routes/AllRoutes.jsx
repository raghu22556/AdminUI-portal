// import Dashboard from "../layouts/dashboard";
import LoginPage from "../pages/auth/LoginPage";
import Organization from "../pages/dashboard/Organization";
import ProjectsPage from "../pages/dashboard/Projects";
import ProjectDetailsPage from "../pages/dashboard/ProjectDetails";
import UsersPage from "../pages/dashboard/UsersPage";
import ProjectPage from "../pages/dashboard/ProjectPage";
const AllRoutes = [
  { name: "Login", path: "/", element: <LoginPage />, private: false },
  { name: "Organization", path: "/organization", element: <Organization />, private: false },
  { name: "Organization", path: "/projects", element: <ProjectPage />, private: false },
  { name: "ProjectsPage", path: "/projectsPage", element: <ProjectsPage />, private: false },
  // { name: "Dashboard", path: "/dashboard", element: <Dashboard />, private: false },
  { name: "Dashboard", path: "/ProjectDetailsPage", element: <ProjectDetailsPage />, private: false },
  
  { name: "UserPage", path: "/userpage", element: <UsersPage />, private: false },
  
  organization

   
];
export default AllRoutes;
