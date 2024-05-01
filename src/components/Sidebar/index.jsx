import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";

//   const navigate = useNavigate();
//   const { handleToggle } = props;
//   const { pathname } = useLocation();
//   const [dropValue, setDropValue] = useState("");

//   // Handle Navigate
//   const handleNavigate = (path) => navigate(path);

//   // Handle Dropdown
//   const handleDrop = (value) => setDropValue(value === dropValue ? "" : value);

//   let menu = JSON.parse(localStorage.getItem("menu"));

//   // All Links & Nested Links
//   const navLinks = [
//     // Dashboard
//     {
//       name: "Dashboard",
//       icon: <DashbordIcon />,
//       activeIcon: <DashbordIconActive />,
//       path: "/dashboard",
//     },
//     {
//       name: "Organization",
//       icon: <DashbordIcon />,
//       activeIcon: <DashbordIconActive />,
//       path: "/organization",
//     },
//     {
//       name: "Projects",
//       icon: <DashbordIcon />,
//       activeIcon: <DashbordIconActive />,
//       path: "/projects",
//     },
//     {
//       name: "Reports",
//       icon: <DashbordIcon />,
//       activeIcon: <DashbordIconActive />,
//       path: "/Reports",
//     },

//     // {
//     //   name: "Masters",
//     //   icon: <DashbordIcon />,
//     //   activeIcon: <DashbordIconActive />,
//     //   path: "/UserManagement",
//     //   child: [
//     //     {
//     //       name: "User Management",
//     //       path: "/userpage",
//     //       icon: <SubIcons />,
//     //       activeIcon: <SubIcons />,
//     //     },
//     //     {
//     //       name: "Designations",
//     //       path: "/Masters/UserManagement",
//     //       icon: <SubIcons />,
//     //       activeIcon: <SubIcons />,
//     //     },
//     //     {
//     //       name: "Roles",
//     //       path: "/Masters/UserManagement",
//     //       icon: <SubIcons />,
//     //       activeIcon: <SubIcons />,
//     //     },
//     //     {
//     //       name: "Access Control",
//     //       path: "/Masters/UserManagement",
//     //       icon: <SubIcons />,
//     //       activeIcon: <SubIcons />,
//     //     },
//     //   ],
//     // },
//   ];

//   menu.forEach((menuItem) => {
//     let newNavItem = {
//       name: menuItem.cardText,
//       path: "/" + menuItem.url,
//       icon: <DashbordIcon />,
//       activeIcon: <DashbordIconActive />,
//     };

//     if (menuItem.children && menuItem.children.length > 0) {
//       newNavItem.child = menuItem.children.map((childItem) => ({
//         name: childItem.cardText,
//         path: "/" + menuItem.cardText + "/" + childItem.url,
//       }));
//     }

//     navLinks.push(newNavItem);
//   });

//   return (
//     <div>
//       {/* Top Logo & Close */}
//       <section className="flex py-2 items-center md:justify-center justify-between">
//         {/* <img
//           src={NavyRouteLogo}
//           alt="sidebar-logo"
//           className="w-28"
//         /> */}
//         <Typography className="text-[#6499E9] font-poppins font-bold text-xl">
//           MaidenCube
//         </Typography>
//         <MdClose
//           onClick={handleToggle}
//           className="text-color text-xl md:hidden cursor-pointer"
//         />
//       </section>

//       {/* NavLinks */}
//       <nav className="my-7 grid gap-1 tracking-wide text-sm px-4  text-[rgb(145,145,145)]">
//         {navLinks.map((item) => {
//           return (
//             <div key={item.name}>
//               <div
//                 type="button"
//                 onClick={() => handleNavigate(item.path)}
//                 className={`flex cursor-pointer font-medium   items-center gap-2 ${
//                   (item.name === dropValue || item.path === pathname) &&
//                   "text-[#6499E9] bg-[#E5ECF680]"
//                 } lg:text-base cursor-pointer py-1.5 md:px-3 rounded items-center relative gap-2 `}
//               >
//                 {item.name === dropValue || item.path === pathname ? (
//                   <span className="text-lg">{item.activeIcon}</span>
//                 ) : (
//                   <span className="text-lg">{item?.icon}</span>
//                 )}
//                 <span className=" font-poppins text-sm">{item.name}</span>
//                 {/*item.child && (
//                   <span className="ml-auto">
//                     {item.name === dropValue ? (
//                       <BsChevronUp />
//                     ) : (
//                       <BsChevronDown />
//                     )}
//                      <BsChevronUp /> }
//                   </span>
//                 )*/}
//               </div>
//               {/* Child Links */}
//               {/*item.name === dropValue && (
//                 <div className="ml-8 grid gap-2 my-2.5">
//                   {item?.child?.map((subItem) => {
//                     return (
//                       <div
//                         key={subItem.name}
//                         onClick={() => handleNavigate(subItem.path)}
//                         className={`flex font-normal  cursor-pointer text-hover gap-3 ${
//                           subItem.path === pathname && "text-color"
//                         }`}
//                       >
//                         {item.path === pathname ? (
//                           <span className="text-lg">{subItem.activeIcon}</span>
//                         ) : (
//                           <span className="text-lg">{subItem.icon}</span>
//                         )}
//                         <span>{subItem.name}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )*/}
//             </div>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

export default function Sidebar() {
  return (
    <div className="flex flex-col w-full max-w-xs bg-white">
      <div className="px-6 py-4">
        <h1
          className="text-2xl font-bold text-center"
          style={{
            fontWeight: 800,
            fontSize: "24px",
            lineHeight: "32.78px",
            letterSpacing: "2%",
            color: "#056EE9",
          }}
        >
          MaidenCube
        </h1>
      </div>
      <div className="flex justify-center py-4" style={{ width: "100%" }}>
        <Button
          style={{
            backgroundColor: "white",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #95A4FC",
            padding: "12px, 16px, 12px, 16px",
          }}
          className="flex items-center space-x-2"
        >
          <ArrowLeftIcon
            style={{ color: "#95A4FC", height: "20px", width: "20px" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "#95A4FC",
              textTransform: "capitalize",
            }}
          >
            Back to Projects
          </span>
        </Button>
      </div>

      {/* <div className="flex justify-center py-4" style={{width:'100%'}}>
        
      </div> */}
      <div className="space-y-2 px-3 py-4" style={{ width: "100%" }}>
        <h2
          className="text-lg font-semibold"
          style={{ fontWeight: "600", fontSize: "12px", lineHeight: "18px" }}
        >
          Main
        </h2>
        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
          }}
          className="flex items-center space-x-2"
        >
          <CloudLightningIcon
            style={{ color: "rgb(138 134 134)	" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
              textTransform: "capitalize",
            }}
          >
            Onboarding
          </span>
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
            color: "#A9A9A9 ",
          }}
          className="flex items-center space-x-2 w-full"
          variant="default"
        >
          <UsersIcon
            style={{ color: "rgb(138 134 134)	" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
              textTransform: "capitalize",
            }}
          >
            User Management
          </span>
        </Button>
      </div>
      <div className="space-y-2 px-3 py-4" style={{ width: "100%" }}>
        <h2
          className="text-lg font-semibold"
          style={{ fontWeight: "600", fontSize: "12px", lineHeight: "18px" }}
        >
          Settings
        </h2>
        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
          }}
          className="flex items-center space-x-2"
        >
          <BellIcon style={{ color: "rgb(138 134 134)	" }} className="h-5 w-5" />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
              textTransform: "capitalize",
            }}
          >
            Notification Settings
          </span>
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
            color: "#A9A9A9 ",
          }}
          className="flex items-center space-x-2 w-full"
          variant="default"
        >
          <UserCircleIcon
            style={{ color: "rgb(138 134 134)	" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
              textTransform: "capitalize",
            }}
          >
            Profile Setting
          </span>
        </Button>
      </div>
      <div className="space-y-2 px-3 py-4" style={{ width: "100%" }}>
        <h2
          className="text-lg font-semibold"
          style={{ fontWeight: "600", fontSize: "12px", lineHeight: "18px" }}
        >
          Modules
        </h2>
        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
          }}
          className="flex items-center space-x-2 w-full"
          variant="default"
        >
          <BarChartIcon
            style={{ color: "rgb(138 134 134)	" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
              textTransform: "capitalize",
            }}
          >
            Marketing
          </span>
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
          }}
          className="flex items-center space-x-2 w-full"
          variant="default"
        >
          <BarChartIcon
            style={{ color: "rgb(138 134 134)	" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
            }}
          >
            HRMS
          </span>
        </Button>

        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
          }}
          className="flex items-center space-x-2 w-full"
          variant="default"
        >
          <BarChartIcon
            style={{ color: "rgb(138 134 134)	" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
              textTransform: "capitalize",
            }}
          >
            Module Name
          </span>
        </Button>

        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
          }}
          className="flex items-center space-x-2 w-full"
          variant="default"
        >
          <BarChartIcon
            style={{ color: "rgb(138 134 134)	" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
              textTransform: "capitalize",
            }}
          >
            Module Name
          </span>
        </Button>

        <Button
          style={{
            backgroundColor: "rgb(229, 228, 226)",
            width: "220px",
            height: "44px",
            borderRadius: "8px",
            border: "1px solid #E5E4E2",
            padding: "12px, 16px, 12px, 16px",
          }}
          className="flex items-center space-x-2 w-full"
          variant="default"
        >
          <BarChartIcon
            style={{ color: "rgb(138 134 134)	" }}
            className="h-5 w-5"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "rgb(138 134 134)",
              textTransform: "capitalize",
            }}
          >
            Module Name
          </span>
        </Button>

        <span
          className="flex items-center space-x-2 w-full"
          variant="default"
          style={{ marginTop: "15px" }}
        >
          <PlusIcon style={{ color: "#95A4FC" }} className="h-4 w-4" />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "18px",
              color: "#95A4FC",
              textTransform: "capitalize",
            }}
          >
            Create Module
          </span>
        </span>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CloudLightningIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function UserCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
