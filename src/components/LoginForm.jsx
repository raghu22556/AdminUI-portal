import { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
import CustomPasswordInput from "../common/CustomPasswordInput";
import CustomEmailInput from "../common/CustomEmailInput";
import AppleSignUpBtn from "../common/AppleSignUpBtn";
import GoogleSignUpBtn from "../common/GoogleSignUpBtn";
// import LoginForm from "../../../components/LoginForm";
//import Divider from '@mui/material/Divider';

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => setShowPass((prev) => !prev);
  return (
    <div className="">
      <Card
        className="px-4  max-w-lg laptopM:w-full "
        color="transparent"
        shadow={false}
      >
        <form onSubmit={(value) => {}}>
          <CardBody className="flex flex-col laptopM:gap-3 ">
            <CustomEmailInput
              crossOrigin={""}
              label="Email"
              size="lg"
              color="blue"
              required
              className=""
            />
            <CustomPasswordInput
              crossOrigin={""}
              label="Password"
              type={`${false ? "text" : "password"}`}
              size="lg"
              color="blue"
              icon={
                showPass ? (
                  <EyeIcon
                    onClick={handleShowPass}
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={handleShowPass}
                    className="h-5 w-5 cursor-pointer"
                  />
                )
              }
              required
            />
            <div className=" flex laptopM:justify-between   ">
              <Checkbox
                variant="paragraph"
                label="Keep Me Login"
                className="text-sm"
                color="blue"
              />

              <Typography
                className="text-sm mt-2.5 ml-16"
                style={{ color: "#6499E9" }}
              >
                Forgot Password?
              </Typography>
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              className=" bg-primary font-poppins laptopM:w-full w-72 ml-6 laptopM:ml-0"
              type="submit"
              shadow={false}
              
              // color="blue"
              disabled={false}
            >
              Log In
            </Button>
            <Typography variant="small" className="mt-3 flex laptopM:justify-center ml-8 ">
              Don&apos;t have an account?
              <Link to="/signup" className="ml-1 font-bold text-blue-500">
                Create Account
              </Link>
            </Typography>

            <Typography variant="small" className="mt-5 flex laptopM:justify-center mobile:justify-center ">
              OR Login With
            </Typography>

            <div className="flex gap-3 mt-4 mobile:flex-col  laptopM:flex-row">
              <AppleSignUpBtn />
              <GoogleSignUpBtn />
            </div>
          </CardFooter>
        </form>
      </Card>

      <div className="lg:mt-12  ">
        <div className="flex laptop:justify-between items-center lg:w-full mobile:flex-col laptopM:flex-row ">
          <div className="text-black laptop:text-xs text-start mt-3 -ml-24 mobile:text-[10px]">
            Copyright © 2022 Maiden Cube Pvt Ltd . All rights reserved.
          </div>
          <div className="laptop:text-xs laptop:mt-3 laptopM:-mr-24 mobile:text-[10px] mobile:-ml-20 ">
            Privacy Policy terms & Condition
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
