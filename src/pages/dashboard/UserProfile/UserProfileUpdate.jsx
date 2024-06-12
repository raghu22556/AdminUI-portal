import React, { useState, useRef } from 'react';
import Layout from '../../../components/Layout';
import { Card, CardBody, Input, Button } from '@material-tailwind/react';
import Webcam from 'react-webcam';
import './style.css';

const UserProfileUpdate = (props) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);

  const handleSubmit = () => {};
  const handleGalleryUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakeSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setIsCameraOpen(false);
  };

  return (
    <>
      <Card className="max-w-md mx-auto my-10">
        <CardBody>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="input-field block w-full"
              variant="standard"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input-field block w-full"
              variant="standard"
            />
          </div>
          <div className="mb-6 ">
            <h2 className="text-gray-700 font-medium">Select an Image</h2>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleGalleryUpload}
                className="inputStyle"
              />
            </div>
            <div>
              <button
                className="text-gray-700 font-medium buttonStyle"
                onClick={() => setIsCameraOpen(!isCameraOpen)}
              >
                {isCameraOpen ? 'Close Camera' : 'Open Camera'}
              </button>
            </div>
            {isCameraOpen && (
              <div>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{ margin: '10px 0' }}
                />
                <button onClick={handleTakeSelfie} className="buttonStyle">
                  Take Selfie
                </button>
              </div>
            )}
            {imageSrc && (
              <div>
                <h3>Selected Image:</h3>
                <img src={imageSrc} alt="Selected" style={{ width: '300px' }} />
              </div>
            )}
          </div>
          <button className="saveButton" onClick={handleSubmit}>
            Save
          </button>
        </CardBody>
      </Card>
    </>
  );
};

export default Layout(UserProfileUpdate);
