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

import OrganizationNameInput from "../common/OrganizationNameInput";

import {
  CustomEmailInput,
  CustomPasswordInput,
  CustomConfirmPasswordInput,
} from "../maiden-core/ui-components";

import AppleSignUpBtn from "../common/AppleSignUpBtn";
import GoogleSignUpBtn from "../common/GoogleSignUpBtn";
import { Password } from "@mui/icons-material";
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("hello");
  const [confirmPass, setConfirPass] = useState("");

  const continueHandler = () => {
    const signupData = {
      email: email,
      Password: Password,
      confirmPass: confirmPass,
    };

    const signupDataJSON = JSON.stringify(signupData);
    alert(signupDataJSON);
  };

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
          <CustomEmailInput
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <CustomPasswordInput
            value={password}
            label="Create Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <CustomConfirmPasswordInput
            value={confirmPass}
            label="Confirm Password"
            required
            onChange={(event) => setConfirPass(event.target.value)}
          />
        </CardBody>

        <CardFooter className="pt-0">
          <Link to="/acceptterm" className="ml-1 font-bold text-blue-500">
            <Button
              className=" bg-primary font-poppins "
              type="submit"
              onClick={continueHandler}
              shadow={false}
              fullWidth
              // color="blue"
              disabled={false}
              color="rose"
              // style={{ backgroundColor: '#6499E9' }}
            >
              Continue
            </Button>
          </Link>
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
