import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Typography, Select, Option } from "@material-tailwind/react";

const AcceptTermSelectBackend = (props) => {
  const { label, icon, action } = props;
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
      <div
        className="flex flex-col border border-gray-300 p-2 rounded-md"
        style={{ height: 57 }}
      >
        <Typography variant="small" color="gray" className="text-xs">
          {label}
        </Typography>

        <Select
          variant="static"
          className="bg-white ring-4 ring-transparent"
          labelProps={{ className: "hidden" }}
          containerProps={{ className: "w-[100px]" }}
          style={{ border: "none", padding: 0, margin: 0 }}
          value={selectedValue}
        >
          <Option value="" disabled>
            Select
          </Option>
          <Option value="Beginner">Beginner</Option>
          <Option value="Intermediate">Intermediate</Option>
          <Option value="Expert">Expert</Option>
        </Select>
      </div>
    </>
  );
};

export default AcceptTermSelectBackend;