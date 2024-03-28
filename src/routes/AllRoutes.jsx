import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

const AllRoutes = [
  { name: "Login", path: "/", element: <LoginPage />, private: false },
  { name: "Signup", path: "/signup", element: <SignupPage />, private: false },
];
export default AllRoutes;
