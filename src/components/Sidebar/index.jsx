import React, { useState } from "react";
import { TbAffiliate, TbReportSearch } from "react-icons/tb";
import {
  AiFillShopping,
  AiOutlineGlobal,
  AiOutlineTransaction,
} from "react-icons/ai";
import { FaUsers, FaWallet } from "react-icons/fa";
import { BsChevronDown, BsChevronUp, BsGear } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import {
  MdCardGiftcard,
  MdClose,
  MdNotifications,
  MdTouchApp,
} from "react-icons/md";
import { PiUsersThreeThin } from "react-icons/pi";
import { SiInternetexplorer } from "react-icons/si";
// import NavyRouteLogo from "../assets/finalNavyLogo.png"
import { MdBorderAll } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";
import { GrSchedule } from "react-icons/gr";
import { Button, Typography } from "@material-tailwind/react";



const Sidebar = (props) => {
  const navigate = useNavigate();
  const { handleToggle } = props;
  const { pathname } = useLocation();
  const [dropValue, setDropValue] = useState("");

  // Handle Navigate
  const handleNavigate = (path) => navigate(path);

  // Handle Dropdown
  const handleDrop = (value) => setDropValue(value === dropValue ? "" : value);

  // All Links & Nested Links
  const navLinks = [
    // Dashboard
    {
      name: "Dashboard",
      icon:  <BiSolidHome />,
      path: "/dashboard",
     
    },
    {
      name: "Organization",
      icon: <FaUsers />,
      path: "/organization",
      
    },
    {
      name: "Projects",
      icon: <MdBorderAll />,
      path: "/projects",
      
    },
    {
      name: "Reports",
      icon: <TbBrandBooking />,
      path: "/Reports",
      
    },
    
   
   
    {
      name: "Masters",
      icon: <AiFillShopping />,
      path: "/UserManagement",
      child: [
        { name: "User Management", path: "/Masters/UserManagement" },
        { name: "Designations", path: "/Masters/UserManagement" },
        { name: "Roles", path: "/Masters/UserManagement" },
        { name: "Access Control", path: "/Masters/UserManagement" },
       
      ],
    },

    

    

  ];

  return (
    <div>
      {/* Top Logo & Close */}
      <section className="flex py-2 items-center md:justify-center justify-between">
        {/* <img
          src={NavyRouteLogo}
          alt="sidebar-logo"
          className="w-28"
        /> */}
        <Typography>MaidenCube</Typography>
        <MdClose
          onClick={handleToggle}
          className="text-color text-xl md:hidden cursor-pointer"
        />
      </section>

      {/* NavLinks */}
      <nav className="my-7 grid gap-1 tracking-wide text-sm px-4 text-[rgb(145,145,145)]">

  

      {navLinks.map((item) => {
          return (
            <div key={item.name}>
              <div
                type="button"
                onClick={() =>
                  !item.child
                    ? handleNavigate(item.path)
                    : handleDrop(item.name)
                }
                className={`flex cursor-pointer font-medium   items-center gap-2 ${
                  (item.name === dropValue || item.path === pathname) &&
                  "text-white bg-[#E5ECF6]"
                } lg:text-base cursor-pointer py-1.5 md:px-3 rounded items-center relative gap-2 `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
                {item.child && (
                  <span className="ml-auto">
                    {item.name === dropValue ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )}
                    {/* <BsChevronUp /> */}
                  </span>
                )}
              </div>
              {/* Child Links */}
              {item.name === dropValue && (
                <div className="ml-8 grid gap-2 my-2.5">
                  {item?.child?.map((subItem) => {
                    return (
                      <div
                        key={subItem.name}
                        onClick={() => handleNavigate(subItem.path)}
                        className={`flex font-normal  cursor-pointer text-hover gap-3 ${
                          subItem.path === pathname && "text-color"
                        }`}
                      >
                        - <span>{subItem.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
