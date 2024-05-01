import React from "react";
import Layout from "../../components/Layout";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { injectTOStore } from "../../core/redux-helper/injectTOStore";
import { newConfig } from '../../store/config';

injectTOStore(newConfig);
const WidgetCard = ({ title, onClick }) => {
  return (
    <Card
      className="rounded-md cursor-pointer"
      onClick={onClick}
      style={{
        border: "1px solid rgba(28, 28, 28, 0.1) ",
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <CardBody className="p-4 text-right ">
        <div className="flex justify-between">
          <div>
            <Typography
              variant="small"
              className=" font-poppins text-black text-[14px] font-bold text-left"
            >
              {title}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="text-sm mt-2 text-left tracking-[.5px] text-[11px]  font-poppins"
              style={{ color: "rgba(28, 28, 28, 0.4)" }}
            >
              Click here to view {title}
            </Typography>
          </div>
          <div className="w-[20px]">
            <img src="view.svg" alt="" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
const CardsLayout = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="font-bold font-poppins">{item.url}</h1>
      <div className=" mb-12 grid gap-y-4 gap-x-1.5 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {item.children.map(({ displayText, url, ...rest }) => (
          <WidgetCard
            onClick={() => {
              navigate("/" + item.url + "/" + url);
            }}
            key={url}
            {...rest}
            title={displayText}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout(CardsLayout);
