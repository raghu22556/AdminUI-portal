import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Alert,
} from "@material-tailwind/react";
import OrganizationNameInput from "../common/OrganizationNameInput";
import {
  CustomEmailInput,
  CustomPasswordInput,
  CustomConfirmPasswordInput,
} from "../maiden-core/ui-components";
import AppleSignUpBtn from "../common/AppleSignUpBtn";
import GoogleSignUpBtn from "../common/GoogleSignUpBtn";

const SignupForm = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);

  // const handleOrganizationChange = (event) => {
  //   console.log(event.target);
  //   setOrganization(event.target.value);
  //   setError(null); // Clear error when typing organization input
  // };
  // const continueHandler = () => {
  //   const signupData = {
  //     organization: organization,
  //     email: email,
  //     Password: password,
  //     confirmPass: confirmPass,
  //   };

  //   const signupDataJSON = JSON.stringify(signupData);
  //   alert(signupDataJSON);
  // };

  const handleOrganizationChange = (event) => {
    setOrganization(event.target.value);
    setError(null); // Clear error when typing organization input
  };

  const handleEmailChange = (event) => {
    const value = event.target.value.toLowerCase();
    setEmail(value);
    setError(null); // Clear error when typing  email input
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(null); // Clear error when typing  password input
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPass(event.target.value);
    setError(null); // Clear error when typing  Confirm password input
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //checking input email format
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (!organization) {
      setError("Organization Name is required!");
      return false;
    }

    if (!email) {
      setError("Email is required!");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("This is not a valid email format!");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    } else if (password.length < 4) {
      setError("Password must be more than 4 characters");
      return false;
    } else if (password.length > 10) {
      setError("Password cannot exceed more than 10 characters");
      return false;
    } else if (!numberRegex.test(password)) {
      setError("Password must contain at least one number");
      return false;
    } else if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character");
      return false;
    }

    if (confirmPass !== password) {
      setError("Password doesn't match");
      return false;
    }

    return true; // Validation succeeded
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Validation succeeded, navigate to "/acceptterm"
      navigate("/acceptterm");
    }
  };

  return (
    <Card className="px-4 max-w-lg w-full" color="transparent" shadow={false}>
      <form>
        <CardBody className="flex flex-col gap-3">
          <OrganizationNameInput
            crossOrigin=""
            label="Organization Name"
            size="lg"
            color="blue"
            required
            value={organization}
            onChange={handleOrganizationChange}
            onFocus={() => setError(null)}
          />
          <CustomEmailInput
            value={email}
            onChange={handleEmailChange}
            required
            onFocus={() => setError(null)}
          />
          <CustomPasswordInput
            value={password}
            label="Create Password"
            required
            onChange={handlePasswordChange}
            onFocus={() => setError(null)}
          />
          <CustomConfirmPasswordInput
            value={confirmPass}
            label="Confirm Password"
            required
            onChange={handleConfirmPasswordChange}
            onFocus={() => setError(null)}
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
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            className="bg-primary font-poppins"
            type="submit"
            shadow={false}
            fullWidth
            color="rose"
            onClick={handleSubmit}
          >
            Continue
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an Account?{" "}
            <Link to="/" className="ml-1 font-bold text-blue-500">
              Sign in
            </Link>
          </Typography>
          <Typography variant="small" className="mt-10 flex justify-center">
            OR Create With
          </Typography>
          <div className="flex gap-3 mt-4">
            <AppleSignUpBtn />
            <GoogleSignUpBtn />
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignupForm;
