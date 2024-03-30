import {
  Card,
CardBody,
Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function ProjectCard({  title, discription,onClick }) {
  return (
    <Card className="rounded-md shadow-light-blue-500" onClick={onClick}>
     
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-black text-lg">
          {title}
        </Typography>
        <Typography variant="small" color="blue-gray" className="text-sm mt-2 text-blue-gray-400 tracking-normal">
          {discription}
        </Typography>
      </CardBody>
    
    </Card>
  );
}

ProjectCard.defaultProps = {
  color: "blue",
  footer: null,
};

ProjectCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

ProjectCard.displayName = "/src/widgets/cards/ProjectCard.jsx";

export default ProjectCard;
