import React from 'react';
import Layout from '../../../components/Layout';
import ProjectCardsData from '../../../data/ProjectCardsData';
import { ProjectCard } from '../../../widgets/cards';
import { GrAdd } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Card, CardBody, Input, Button } from '@material-tailwind/react';

const PasswordUpdate = (props) => {
  const handleSubmit = () => {};
  return (
    <>
      <Card className="max-w-md mx-auto my-10">
        <CardBody>
          <div className="mb-6">
            <label htmlFor="old-password" className="block text-gray-700 font-medium mb-2">
              Old Password*
            </label>
            <Input
              id="old-password"
              type="password"
              placeholder=""
              className="input-field block w-full"
              variant="standard"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="new-password" className="block text-gray-700 font-medium mb-2">
              New Password*
            </label>
            <Input
              id="new-password"
              type="password"
              placeholder=""
              className="input-field block w-full"
              variant="standard"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">
              Confirm Password*
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder=""
              className="input-field block w-full"
              variant="standard"
            />
          </div>
          <button className="saveButton" onClick={handleSubmit}>
            Save
          </button>
        </CardBody>
      </Card>
    </>
  );
};

export default Layout(PasswordUpdate);
