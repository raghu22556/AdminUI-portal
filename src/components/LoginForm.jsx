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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = () => {
    const userData = {
      email: email,
      password: password,
    };
    const userDataJSON = JSON.stringify(userData);
    alert(userDataJSON);

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
        className="px-4  max-w-lg laptopM:w-full "
        color="transparent"
        shadow={false}
      >
        <CardBody className="flex flex-col laptopM:gap-3 ">
          <CustomEmailInput
            onChange={(event) => setEmail(event.target.value)}
          />
          <CustomPasswordInput
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className=" flex justify-between mobile:text-xs mobile:text-center laptop:text-sm mobile:-ml-4  laptop:flex-row  ">
            <Checkbox
              variant="paragraph"
              label="Keep Me Login"
              className="text-sm mobile:h-4 mobile:w-4"
              color="blue"
            />

            <Typography
              className="laptop:text-sm laptop:mt-2.5 laptop:ml-16 mobile:text-start  mobile:text-xs  mt-3  "
              style={{ color: "#6499E9" }}
            >
              Forgot Password?
            </Typography>
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <div>
            <Button
              className=" bg-primary font-poppins laptopM:w-full mobile:w-80 mobile:justify-center laptopM:ml-0"
              type="submit"
              shadow={false}
              // color="blue"
              disabled={false}
              onClick={onLoginClick}
            >
              Log In
            </Button>
            <Typography className="mt-3 flex laptopM:justify-center laptop:ml-8  laptop:text-sm mobile:text-xs mobile:justify-center ">
              Don&apos;t have an account?
              <Link to="/signup" className="ml-1 font-bold text-blue-500">
                Create Account
              </Link>
            </Typography>
          </div>

          <Typography className="mt-5 flex laptopM:justify-center laptop:text-sm mobile:text-xs  mobile:justify-center ">
            OR Login With
          </Typography>

          <div className="flex gap-3 mt-4 mobile:flex-col  laptopM:flex-row mobile:items-center  ">
            <AppleSignUpBtn />
            <GoogleSignUpBtn />
          </div>
        </CardFooter>
      </Card>

      <div className="mt-12  mobile:items-center ">
        <div className="flex laptop:justify-between  items-center w-full mobile:flex-col laptopM:flex-row laptop:-ml-24">
          <div className="text-black laptop:text-xs  mt-3 mobile:text-[11px]">
            Copyright © 2022 Maiden Cube Pvt Ltd . All rights reserved.
          </div>
          <div className="laptop:text-xs laptop:mt-3 mobile:text-[11px] ">
            Privacy Policy terms & Condition
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
