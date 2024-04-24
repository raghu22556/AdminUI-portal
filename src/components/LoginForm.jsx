import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
  Button,
  Alert,
} from "@material-tailwind/react";
import {
  CustomEmailInput,
  CustomPasswordInput,
} from "../maiden-core/ui-components";

import axios from "axios";
import AppleSignUpBtn from "../common/AppleSignUpBtn";
import GoogleSignUpBtn from "../common/GoogleSignUpBtn";
import Footer from "../common/Footer";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value.toLowerCase();
    setEmail(value);
    setError(null); // Clear error when typing in email input
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(null); // Clear error when typing in password input
  };

  const handleBlur = () => {
    // Do nothing on blur for now
  };

  const onLoginClick = () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Email is invalid");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (!numberRegex.test(password)) {
      setError("Password must contain at least one number");
      return;
    }

    if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character");
      return;
    }

    const params = {
      email: "webuser@confess.com",
      password: "Demo@145",
      OrganizationId: "2f6eca88-278d-49ee-8c25-e916a24c6019",
    };

    axios
      .post(
        "https://maidenconfessapp.azurewebsites.net/api/v1/Registration/VerifyAdminUser",
        params,
      )
      .then((response) => {
        localStorage.setItem("menu", JSON.stringify(response.data.menu));
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/neworganization");
        }, 2000);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Login failed. Please try again.");
      });
  };

  return (
    <div>
      <Card
        className=" laptopM:w-[550px] mobileM:w-[95vw] mobileM:mt-2"
        color="transparent"
        shadow={false}
      >
        <CardBody className="flex flex-col laptopM:gap-3 mobile:gap-3">
          <CustomEmailInput
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlur}
            onFocus={() => {
              setError(null);
              setLoginSuccess(false);
            }}
          />
          <CustomPasswordInput
            value={password}
            onChange={handlePasswordChange}
            onBlur={handleBlur}
            onFocus={() => {
              setError(null);
              setLoginSuccess(false);
            }}
          />
          {error && (
            <Alert
              style={{
                background: "#DF4A4A",
                padding: "5px",
                fontSize: "10px",
                opacity: "1",
                transition: "opacity 0.2s ease-in-out",
              }}
            >
              {error}
            </Alert>
          )}
          {loginSuccess && (
            <Alert
              style={{
                background: "#4CAF50",
                padding: "5px",
                fontSize: "10px",
                opacity: "1",
                transition: "opacity 0.2s ease-in-out",
              }}
            >
              Login successful!
            </Alert>
          )}
          <Typography className=" m-[-5px] flex justify-between items-center laptop:text-sm mobile:text-xs text-black font-medium">
            <Checkbox
              variant="paragraph"
              label="Keep Me Logged In"
              className="text-xs"
              color="blue"
            />
            <Link to="/forgot-password" className="text-[#056EE9]">
              Forgot Password?
            </Link>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <div>
            <Button
              className="bg-[#056EE9] font-poppins laptopM:w-full mobileM:w-[100%] mobile:w-[90vw] mobile:justify-center laptopM:ml-0"
              type="submit"
              disabled={false}
              onClick={onLoginClick}
              style={{ shadow: "none" }}
            >
              Log In
            </Button>
            <Typography className="mt-3 flex laptopM:justify-center laptop:ml-8 laptop:text-sm mobile:text-xs mobile:justify-center text-black font-medium">
              Don&apos;t have an account?
              <Link to="/signup" className="ml-1 font-normal text-[#056EE9]">
                Create Account
              </Link>
            </Typography>
          </div>

          <Typography className="mt-5 flex laptopM:justify-center laptop:text-sm mobile:text-xs mobile:justify-center">
            OR Login With
          </Typography>
          <div className="flex justify-center gap-3 mt-3 mobile:flex-col laptop:w-[100%] laptopM:flex-row mobile:items-center">
            <AppleSignUpBtn />
            <GoogleSignUpBtn />
          </div>
        </CardFooter>
      </Card>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default LoginForm;
