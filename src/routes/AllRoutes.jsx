// import Dashboard from "../layouts/dashboard";
import LoginPage from "../pages/auth/LoginPage";
import Organization from "../pages/dashboard/Organization";
import ProjectsPage from "../pages/dashboard/Projects";
import ProjectDetailsPage from "../pages/dashboard/ProjectDetails";
const AllRoutes = [
  { name: "Login", path: "/", element: <LoginPage />, private: false },
  { name: "Organization", path: "/organization", element: <Organization />, private: false },
  { name: "Organization", path: "/projects", element: <Organization />, private: false },
  { name: "ProjectsPage", path: "/projectsPage", element: <ProjectsPage />, private: false },
  // { name: "Dashboard", path: "/dashboard", element: <Dashboard />, private: false },
  { name: "Dashboard", path: "/ProjectDetailsPage", element: <ProjectDetailsPage />, private: false },
  
   
];
export default AllRoutes;
