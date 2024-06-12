import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Alert,
  Checkbox,
} from '@material-tailwind/react';
import { ReduxHelper } from '../core/redux-helper';
import OrganizationNameInput from '../common/OrganizationNameInput';

import {
  CustomEmailInput,
  CustomPasswordInput,
  CustomConfirmPasswordInput,
} from '../maiden-core/ui-components';

//import WelcomeLayout from "../components/WelcomeLayout/index";

const SignupForm = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(null);
  const createSuperAdmin_result = useSelector((state) => state?.createSuperAdmin);

  useEffect(() => {
    if (createSuperAdmin_result.data) {
      alert('Organization Created Succesfully');
      navigate('/');
    } else if (createSuperAdmin_result.error) {
      setIsLoading(false);
      setError(createSuperAdmin_result.error);
    }
  }, [createSuperAdmin_result]);

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
  const handleAcceptTerms = (event) => {
    setAcceptTerms(event.target.checked);
    setError(null);
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //checking input email format
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (!organization) {
      setError('Organization Name is required!');
      return false;
    }

    if (!email) {
      setError('Email is required!');
      return false;
    } else if (!emailRegex.test(email)) {
      setError('This is not a valid email format!');
      return false;
    }

    if (!password) {
      setError('Password is required');
      return false;
    } else if (password.length < 4) {
      setError('Password must be more than 4 characters');
      return false;
    } else if (password.length > 10) {
      setError('Password cannot exceed more than 10 characters');
      return false;
    } else if (!numberRegex.test(password)) {
      setError('Password must contain at least one number');
      return false;
    } else if (!specialCharRegex.test(password)) {
      setError('Password must contain at least one special character');
      return false;
    }

    if (confirmPass !== password) {
      setError("Password doesn't match");
      return false;
    }

    if (!acceptTerms) {
      setError('Please indicate that you have read and agree to the Terms and Conditions');
      return false;
    }

    return true; // Validation succeeded
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      dispatch(
        ReduxHelper.Actions.createSuperAdmin({
          organization,
          email,
          password,
        }),
      );
    }
  };

  return (
    <Card className="laptopM:w-[550px]" color="transparent" shadow={false}>
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
          label="Email"
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            variant="paragraph"
            className="text-sm"
            color="blue"
            onChange={handleAcceptTerms}
            onFocus={() => setError(null)}
          />
          <label className="text-sm">
            I agree to the{' '}
            <a
              href="/terms-and-conditions"
              style={{ color: '#056EE9', textDecoration: 'underline' }}
            >
              terms & conditions
            </a>
          </label>
        </div>
        {error && (
          <Alert
            style={{
              background: '#DF4A4A',
              padding: '5px',
              fontSize: '10px',
              opacity: '1',
              transition: 'opacity 0.2s ease-in-out',
            }}
          >
            {error}
          </Alert>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          className="bg-[#056EE9] font-poppins"
          type="submit"
          shadow={false}
          fullWidth
          color="rose"
          onClick={handleSubmit}
          style={{ backgroundColor: '#056EE9' }}
        >
          Create
        </Button>
        <Typography
          style={{ fontSize: '12px', fontWeight: 'bold', color: '#1C1C1C' }}
          className="mt-4 flex justify-center text-[12x]"
        >
          Already have an Account ?
          <Link to="/" className="ml-1 font-[600] text-[#056EE9]">
            Sign in
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
