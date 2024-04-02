import { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AcceptTermSelectBackend from "../common/AcceptTermSelectBackend";
import AcceptTermSelectFrontend from "../common/AcceptTermSelectFrontend";
import AcceptTermSelectRole from "../common/AcceptTermSelectRole";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";

// import LoginForm from "../../../components/LoginForm";
//import Divider from '@mui/material/Divider';

const AcceptTermForm = () => {
  return (
    <div className="">
      <Card
        className="px-4  max-w-lg w-full "
        color="transparent"
        shadow={false}
        style={{ width: "800px" }}
      >
        <form onSubmit={(value) => {}}>
          <CardBody className="flex flex-col gap-3 ">
            <AcceptTermSelectBackend
              crossOrigin={""}
              label="Hands on Backend Language"
              size="lg"
              color="blue"
              required
            />
            <AcceptTermSelectFrontend
              crossOrigin={""}
              label="Hands on Frontend Language"
              size="lg"
              color="blue"
              required
            />
            <AcceptTermSelectRole
              crossOrigin={""}
              label="Whats Your Role"
              size="lg"
              color="blue"
              required
            />

            <div className=" flex justify-between ">
              <Checkbox
                variant="paragraph"
                label="Accept to terms & condition"
                className="text-sm"
                color="blue"
              />
            </div>
          </CardBody>

          <CardFooter className="pt-0 flex">
            <Button
              className=" bg-primary font-poppins  "
              type="submit"
              shadow={false}
              fullWidth
              // color="blue"
              disabled={false}
            >
              Create Account
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="lg:mt-12  ">
        <div className="flex justify-between items-center lg:w-full">
          <div className="text-black text-xs text-start mt-3 -ml-18">
            Copyright © 2022 Maiden Cube Pvt Ltd . All rights reserved.
          </div>
          <div className="text-xs mt-3 -mr-14">
            Privacy Policy terms & Condition
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptTermForm;
