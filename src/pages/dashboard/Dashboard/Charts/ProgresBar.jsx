import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@material-tailwind/react";

const ProgresBar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="bg-white  rounded-md shadow-md lg:w-auto lg:mt-6 lg:p-6 w-[420px] p-7 mt-0">
        <div className="w-64 mb-2 flex items-center">
          <Typography
            variant="body1"
            className="mr-[60px] font-poppins text-[14px] w-10"
          >
            Downloads
          </Typography>
          <div className="flex-grow">
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                height: 10,
                bgcolor: "#fff",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#95A4FC",
                },
              }}
            />
          </div>
        </div>
        <div className="w-64 mb-2 flex items-center">
          <Typography
            variant="body1"
            className="mr-[60px] font-poppins text-[14px] w-10"
          >
            Views
          </Typography>
          <div className="flex-grow">
            <LinearProgress
              variant="determinate"
              value={90}
              sx={{
                height: 10,
                bgcolor: "#fff",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#95A4FC",
                },
              }}
            />
          </div>
        </div>
        <div className="w-64 mb-2 flex items-center">
          <Typography
            variant="body1"
            className="mr-[60px] font-poppins text-[14px] w-10"
          >
            Share
          </Typography>
          <div className="flex-grow rounded-r-lg">
            <LinearProgress
              variant="determinate"
              value={95}
              sx={{
                height: 10,
                bgcolor: "#fff",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#95A4FC",
                },
              }}
            />
          </div>
        </div>
        <div className="w-64 mb-2 flex items-center">
          <Typography
            variant="body1"
            className="mr-[60px] font-poppins text-[14px] w-10"
          >
            Delete
          </Typography>
          <div className="flex-grow">
            <LinearProgress
              variant="determinate"
              value={70}
              sx={{
                height: 10,
                bgcolor: "#fff",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#95A4FC",
                },
              }}
            />
          </div>
        </div>
        <div className="w-64 mb-2 flex items-center">
          <Typography
            variant="body1"
            className="mr-[60px] font-poppins text-[14px] w-10"
          >
            Edit
          </Typography>
          <div className="flex-grow">
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{
                height: 10,
                bgcolor: "#fff",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#95A4FC",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgresBar;
