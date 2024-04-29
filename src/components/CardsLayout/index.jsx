import React from "react";
import Layout from "../../components/Layout";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";

import { injectTOStore } from "../../core/redux-helper/injectTOStore";
import { newConfig } from '../../store/config';

injectTOStore(newConfig);
const WidgetCard = ({ title, onClick }) => {
  return (
    <Card className="rounded-md cursor-pointer " onClick={onClick}>
      <CardBody className="p-4 text-right ">
        <Typography
          variant="small"
          className=" font-poppins text-black text-[16px] font-bold text-left"
        >
          {title}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="text-sm mt-2 text-left tracking-[.5px] text-[12px] text-blue-gray-400 font-poppins"
        >
          Click here to view {title}
        </Typography>
        <div className="flex justify-end w-[20px] mt-4 clear-both ">
          <LaunchIcon />
        </div>
      </CardBody>
    </Card>
  );
};
const CardsLayout = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className=" mb-12 grid gap-y-5 gap-x-5 md:grid-cols-2 xl:grid-cols-4 mt-6 p-6">
      {item.children.map(({ displayText, url, ...rest }) => (
        <WidgetCard
          onClick={() => {
            navigate("/" + item.url + "/" + url);
          }}
          key={url}
          {...rest}
          title={displayText}
        />
      ))}
    </div>
  );
};

export default Layout(CardsLayout);
