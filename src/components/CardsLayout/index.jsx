import React from "react";
import Layout from "../../components/Layout";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const WidgetCard = ({ title, onClick }) => {
  return (
    <Card className="rounded-md   border-1 border-[#95A4FC] " onClick={onClick}>
      <CardBody className="p-4 text-right ">
        <Typography
          variant="small"
          className=" font-poppins text-black text-lg"
        >
          {title}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="text-sm mt-2 text-blue-gray-400 tracking-normal font-poppins"
        >
          Click here to view {title}
        </Typography>
      </CardBody>
    </Card>
  );
};
const CardsLayout = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mt-6">
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
