import { FormEvent, useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
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

import SignupForm from "../../../components/SignupForm";
const SignupPage = () => {
  // return (
  //   <main className="h-screen w-full flex flex-col bg-sky-300" >
  //   <div className="w-full mx-auto flex justify-center items-center flex-1 px-4">
  //     <WavesSvg/>
  // <LoginForm/>
  //   </div>
  // </main>

  // );

  return (
    <main className="h-screen w-full flex flex-col ">
      <div class="lg:flex h-full">
        <div class="lg:w-1/2   h-full  ">
          {/* <Card   variant="gradient" color="red" className="h-full w-full"></Card> */}
          <div class="w-full h-full bg-white shadow-lg  overflow-hidden">
            <div className="flex justify-center items-center bg-gradient-to-r from-[#DC216D] to-[#336AEA] h-screen">
              <div className="text-start m-4">
                <Typography variant="h5" color="white">
                  MaidanCube
                </Typography>
                <Typography variant="h1" color="white" className="mt-4">
                  Your gateway
                </Typography>
                <Typography variant="h1" color="white">
                  to progress.
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2 h-full">
          <main className="h-screen w-full flex flex-col bg-sky-300  justify-center items-center ">
            <div className="text-start -ml-20 ">
              <Typography
                style={{ color: "#6499E9" }}
                className=" font-poppinss font-black  text-3xl "
              >
                MaidanCube
              </Typography>
              <Typography
                variant="h5"
                style={{ color: "black" }}
                className=" font-bold font-poppinss mt-8"
              >
                Create Account.
              </Typography>
              <Typography
                style={{ color: "black" }}
                className=" mt-2 text-xs  font-poppinss"
              >
                It is a long established fact that a reader will be distracted
                by the  
              </Typography>
              <Typography
                style={{ color: "black" }}
                className="  text-xs font-poppinss"
              >
                readable content of a page when looking at its layout.
              </Typography>
            </div>
            <div className="w-full mx-auto flex justify-center items-center">
              <SignupForm />
            </div>
          </main>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
