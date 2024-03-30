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
import CustomInput from "../common/CustomPasswordInput";
import CustomPasswordInput from "../common/CustomPasswordInput";
import OrganizationNameInput from "../common/OrganizationNameInput";
import EmailAddressInput from "../common/EmailAddressInput";
import CreatePasswordInput from "../common/CreatePasswordInput";
import CreateConfirmPasswordInput from "../common/CreateConfirmPasswordInput";

import CustomEmailInput from "../common/CustomEmailInput";
import AppleSignUpBtn from "../common/AppleSignUpBtn";
import GoogleSignUpBtn from "../common/GoogleSignUpBtn";
const SignupForm = () => {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => setShowPass((prev) => !prev);
  return (
    <Card className="px-4  max-w-lg w-full " color="transparent" shadow={false}>
      <form onSubmit={(value) => {}}>
        <CardBody className="flex flex-col gap-3">
          <OrganizationNameInput
            crossOrigin={""}
            label="Organization Name"
            size="lg"
            color="blue"
            required
          />
          <EmailAddressInput
            crossOrigin={""}
            label="Email Address"
            size="lg"
            color="blue"
            required
          />
          <CreatePasswordInput
            crossOrigin={""}
            label="Create Password"
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
          <CreateConfirmPasswordInput
            crossOrigin={""}
            label="Confirm Password"
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
        </CardBody>

        <CardFooter className="pt-0">
          <Button
            className=" bg-primary font-poppins "
            type="submit"
            shadow={false}
            fullWidth
            // color="blue"
            disabled={false}
            color="rose"
            // style={{ backgroundColor: '#6499E9' }}
          >
            Continue
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center ">
            Already have an Account ?
            <Link to="/signup" className="ml-1 font-bold text-blue-500">
              Sign in
            </Link>
          </Typography>

          <Typography variant="small" className="mt-10 flex justify-center">
            OR Create With
          </Typography>

          <div className="flex gap-3 mt-4 ">
            <AppleSignUpBtn />
            <GoogleSignUpBtn />
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignupForm;
