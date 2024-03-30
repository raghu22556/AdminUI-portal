import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import Screen3 from "../common/Screen3";

const AllRoutes = [
  { name: "Login", path: "/", element: <LoginPage />, private: false },
  { name: "Signup", path: "/signup", element: <SignupPage />, private: false },
  { name: "Scree3", path: "/screen3", element: <Screen3 />, private: false },
];
export default AllRoutes;
