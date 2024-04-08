import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Typography, Input } from "@material-tailwind/react";
import React, { useState } from "react";

const CustomPasswordInput = (props) => {
  const { label, icon, action } = props;
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => setShowPass((prev) => !prev);
  return (
    <div
      className=" flex flex-col   border border-gray-300 p-2 rounded-md mt-2 laptopM:mt-0 ml-10 laptopM:ml-0"
      style={{ height: 59 }}
    >
      <Typography variant="small" color="gray" className="text-xs">
        {label}
      </Typography>

      <Input
        size="small"
        shadow={false}
        type={`${showPass ? "text" : "password"}`}
        placeholder="password"
        variant="static"
        className=" bg-white p-0 m-0  ring-4 ring-transparent "
        labelProps={{
          className: "hidden",
        }}
        containerProps={{ className: "w-[100px]  " }}
        style={{ border: "none", padding: 0, margin: 0 }}
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
      />
    </div>
  );
};

export default CustomPasswordInput;
