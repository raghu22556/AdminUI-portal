import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Typography, Input } from "@material-tailwind/react";
import React, { useState } from "react";

const CustomEmailInput = (props) => {
  const { label, icon, action } = props;
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => setShowPass((prev) => !prev);
  return (
    <>
      <div
        className=" flex flex-col   border border-gray-300 p-2 rounded-md  laptopM:w-full  laptopM:ml-0"
        style={{ height: 57 }}
      >
        <Typography variant="small" color="gray" className="text-xs">
          {label}
        </Typography>

        <Input
          shadow={false}
          type={`${false ? "text" : "Email"}`}
          placeholder="admin@gmail.com"
          variant="static"
          className=" bg-white ring-4 ring-transparent "
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "w-[100px]  " }}
          style={{ border: "none", padding: 0, margin: 0 }}
        />
      </div>
    </>
  );
};

export default CustomEmailInput;
