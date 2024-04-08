import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@material-tailwind/react";

const ProgresBar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="bg-white p-6 rounded-md mt-6 shadow-md">
        <div className="w-64 mb-2 flex items-center">
          <Typography
            variant="body1"
            className="mr-[60px] font-poppins text-[14px] w-10"
          >
            Search
          </Typography>
          <div className="flex-grow">
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                height: 10,
                bgcolor: "#E0E0E0",
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
            Downloads
          </Typography>
          <div className="flex-grow">
            <LinearProgress
              variant="determinate"
              value={80}
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
              value={80}
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
          <div className="flex-grow">
            <LinearProgress
              variant="determinate"
              value={80}
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
              value={80}
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
              value={80}
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
