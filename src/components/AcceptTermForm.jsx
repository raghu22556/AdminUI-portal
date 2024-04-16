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

const AcceptTermForm = () => {
  const [acceptTermSelectBackend, setAcceptTermSelectBackend] = useState("");
  const [acceptTermSelectFrontend, setAcceptTermSelectFrontend] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const selectBackendHandler = (selectedValue) => {
    setAcceptTermSelectBackend(selectedValue);
  };

  const selectFrontendHandler = (selectedValue) => {
    setAcceptTermSelectFrontend(selectedValue);
  };

  const selectRoleHandler = (selectedValue) => {
    setSelectedRole(selectedValue);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    var selectedData = {
      acceptBackend: acceptTermSelectBackend,
      acceptFrontend: acceptTermSelectFrontend,
      selectRole: selectedRole,
    };

    const jsonData = JSON.stringify(selectedData);

    alert(jsonData);
  };

  return (
    <div className="">
      <Card
        className="px-4  max-w-lg w-full "
        color="transparent"
        shadow={false}
        style={{ width: "800px" }}
      >
        <form onSubmit={formSubmitHandler}>
          <CardBody className="flex flex-col gap-3 ">
            <AcceptTermSelectBackend
              crossOrigin={""}
              label="Hands on Backend Language"
              size="lg"
              color="blue"
              required
              value={acceptTermSelectBackend}
              onChange={selectBackendHandler}
            />
            <AcceptTermSelectFrontend
              crossOrigin={""}
              label="Hands on Frontend Language"
              size="lg"
              color="blue"
              required
              value={acceptTermSelectFrontend}
              onChange={selectFrontendHandler}
            />
            <AcceptTermSelectRole
              crossOrigin={""}
              label="Whats Your Role"
              size="lg"
              color="blue"
              required
              value={selectedRole}
              onChange={selectRoleHandler}
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
