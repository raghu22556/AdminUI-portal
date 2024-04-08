import { Typography } from "@material-tailwind/react";

export const welcomePage = (RenderComponent) => {
  let text = "";
  if (RenderComponent.name == "LoginForm") {
    text += "Welcome Back ";
  } else if (RenderComponent.name == "SignupForm") {
    text += "Create Account. ";
  } else if (RenderComponent.name == "AcceptTermForm") {
    text += "Help us to personalize your experience. ";
  }
  return (
    <>
      <main className="h-screen w-full flex flex-col ">
        <div class="lg:flex h-full">
          <div class="lg:w-1/2   h-full hidden sm:block ">
            {/* <Card   variant="gradient" color="red" className="h-full w-full"></Card> */}
            <div class="w-full h-full bg-white shadow-lg  overflow-hidden">
              <div className="flex justify-center items-center bg-gradient-to-r from-[#DC216D] to-[#336AEA] h-screen">
                <div className="text-start m-4">
                  <Typography variant="h5" color="white">
                    MaidanCube
                  </Typography>
                  <Typography variant="h1" color="white" className="mt-4">
                    Your gateway
                  </Typography>
                  <Typography variant="h1" color="white">
                    to progress.
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2 laptopM:h-full">
            <main className="h-screen w-full flex flex-col bg-sky-300  justify-center items-center ">
              <div className="text-start laptopM:-ml-20 -ml-10 laptop:mt-20 -mt-32  ">
                <Typography
                  style={{ color: "#6499E9" }}
                  className=" font-poppinss font-black  mobileM:text-center laptopM:text-start text-3xl "
                >
                  MaidanCube
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: "black" }}
                  className=" font-bold font-poppinss mobileM:text-center laptopM:text-start mt-8"
                >
                  {text}
                </Typography>
                <Typography
                  style={{ color: "black" }}
                  className=" mt-2 text-xs  font-poppinss"
                >
                  It is a long established fact that a reader will be distracted
                  by the  
                </Typography>
                <Typography
                  style={{ color: "black" }}
                  className="  text-xs font-poppinss"
                >
                  readable content of a page when looking at its layout.
                </Typography>
              </div>
              <div className="w-full mx-auto flex justify-center items-center">
                <RenderComponent />
              </div>
            </main>
          </div>
        </div>
      </main>
    </>
  );
};
