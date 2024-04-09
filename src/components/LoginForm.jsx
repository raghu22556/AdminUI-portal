import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import AppleSignUpBtn from "../common/AppleSignUpBtn";
import GoogleSignUpBtn from "../common/GoogleSignUpBtn";
import {
  CustomEmailInput,
  CustomPasswordInput,
} from "../maiden-core/ui-components";
import axios from "axios";
// import LoginForm from "../../../components/LoginForm";
//import Divider from '@mui/material/Divider';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const handleShowPass = () => setShowPass((prev) => !prev);
  const onLoginClick = () => {
    alert(email);
    var params = {
      email: "webuser@confess.com",
      password: "Demo@145",
      OrganizationId: "2f6eca88-278d-49ee-8c25-e916a24c6019",
    };
    axios
      .post(
        "https://maidenconfessapp.azurewebsites.net/api/v1/Registration/VerifyAdminUser",
        params
      )
      .then((response) => {
        localStorage.setItem("menu", JSON.stringify(response.data.menu));
        navigate("/screen3");
      });
  };

  return (
    <div className="">
      <Card
        className="px-4  max-w-lg w-full "
        color="transparent"
        shadow={false}
      >
        <CardBody className="flex flex-col gap-3 ">
          <CustomEmailInput onChange={event => setEmail(event.target.value)}/>
          <CustomPasswordInput />
          <div className=" flex justify-between ">
            <Checkbox
              variant="paragraph"
              label="Keep Me Login"
              className="text-sm"
              color="blue"
            />

            <Typography className="text-sm mt-2.5" style={{ color: "#6499E9" }}>
              Forgot Password?
            </Typography>
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <Button
            className=" bg-primary font-poppins  "
            type="submit"
            shadow={false}
            fullWidth
            // color="blue"
            disabled={false}
            onClick={onLoginClick}
          >
            Log In
          </Button>
          <Typography variant="small" className="mt-3 flex justify-center ">
            Don&apos;t have an account?
            <Link to="/signup" className="ml-1 font-bold text-blue-500">
              Create Account
            </Link>
          </Typography>

          <Typography variant="small" className="mt-5 flex justify-center">
            OR Login With
          </Typography>

          <div className="flex gap-3 mt-4 ">
            <AppleSignUpBtn />
            <GoogleSignUpBtn />
          </div>
        </CardFooter>
      </Card>

      <div className="lg:mt-12  ">
        <div className="flex justify-between items-center lg:w-full">
          <div className="text-black text-xs text-start mt-3 -ml-24">
            Copyright © 2022 Maiden Cube Pvt Ltd . All rights reserved.
          </div>
          <div className="text-xs mt-3 -mr-24">
            Privacy Policy terms & Condition
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
