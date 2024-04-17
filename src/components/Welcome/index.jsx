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
                    MaidenCube
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
              <div className="laptop:text-start laptopM:-ml-20 laptop:mt-20 mobile:text-center ">
                <Typography
                  style={{ color: "#6499E9" }}
                  className=" font-poppinss font-black  mobileM:items-center laptopM:text-start laptop:text-3xl  mobile:text-2xl"
                >
                  MaidenCube
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: "black" }}
                  className=" laptop:font-bold font-poppinss mobileM:text-center laptopM:text-start laptop:mt-8 mobile:mt-3 mobile:text-sm"
                >
                  {text}
                </Typography>
                <Typography
                  style={{ color: "black" }}
                  className=" mt-2 laptop:text-xs mobile:text-xs  font-poppinss"
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
