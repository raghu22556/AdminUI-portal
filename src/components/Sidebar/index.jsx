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

import svgIcon from "./../../assets/category.svg";
import DashbordIcon from "../../assets/DashbordIcon";
import DashbordIconActive from "../../assets/DashbordIconActive";
import SubIcons from "../../assets/SubIcons";
const Sidebar = (props) => {
  const navigate = useNavigate();
  const { handleToggle } = props;
  const { pathname } = useLocation();
  const [dropValue, setDropValue] = useState("");

  // Handle Navigate
  const handleNavigate = (path) => navigate(path);

  // Handle Dropdown
  const handleDrop = (value) => setDropValue(value === dropValue ? "" : value);

  let menu = JSON.parse(localStorage.getItem("menu"));

  // All Links & Nested Links
  const navLinks = [
    // Dashboard
    {
      name: "Dashboard",
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
      path: "/dashboard",
    },
    {
      name: "Organization",
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
      path: "/organization",
    },
    {
      name: "Projects",
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
      path: "/projects",
    },
    {
      name: "Reports",
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
      path: "/Reports",
    },

    {
      name: "Masters",
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
      path: "/UserManagement",
      child: [
        {
          name: "User Management",
          path: "/userpage",
          icon: <SubIcons />,
          activeIcon: <SubIcons />,
        },
        {
          name: "Designations",
          path: "/Masters/UserManagement",
          icon: <SubIcons />,
          activeIcon: <SubIcons />,
        },
        {
          name: "Roles",
          path: "/Masters/UserManagement",
          icon: <SubIcons />,
          activeIcon: <SubIcons />,
        },
        {
          name: "Access Control",
          path: "/Masters/UserManagement",
          icon: <SubIcons />,
          activeIcon: <SubIcons />,
        },
      ],
    },
  ];

  menu.forEach((menuItem) => {
    let newNavItem = {
      name: menuItem.cardText,
      path: "/" + menuItem.url,
    };

    if (menuItem.children && menuItem.children.length > 0) {
      newNavItem.child = menuItem.children.map((childItem) => ({
        name: childItem.cardText,
        path: "/" + menuItem.cardText + "/" + childItem.url,
      }));
    }

    navLinks.push(newNavItem);
  });

  return (
    <div>
      {/* Top Logo & Close */}
      <section className="flex py-2 items-center md:justify-center justify-between">
        {/* <img
          src={NavyRouteLogo}
          alt="sidebar-logo"
          className="w-28"
        /> */}
        <Typography className="text-[#6499E9] font-poppins font-bold text-xl">
          MaidenCube
        </Typography>
        <MdClose
          onClick={handleToggle}
          className="text-color text-xl md:hidden cursor-pointer"
        />
      </section>

      {/* NavLinks */}
      <nav className="my-7 grid gap-1 tracking-wide  text-sm px-4  text-[rgb(145,145,145)]">
        {navLinks.map((item) => {
          return (
            <div key={item.name}>
              <div
                type="button"
                onClick={() => handleNavigate(item.path)}
                className={`flex cursor-pointer font-medium   items-center gap-2 ${
                  (item.name === dropValue || item.path === pathname) &&
                  "text-[#6499E9] bg-[#E5ECF680]"
                } lg:text-base cursor-pointer py-1.5 md:px-3 rounded items-center relative gap-2 `}
              >
                {item.name === dropValue || item.path === pathname ? (
                  <span className="text-lg">{item.activeIcon}</span>
                ) : (
                  <span className="text-lg">{item?.icon}</span>
                )}
                <span className=" font-poppins text-sm">{item.name}</span>
                {/*item.child && (
                  <span className="ml-auto">
                    {item.name === dropValue ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )}
                     <BsChevronUp /> }
                  </span>
                )*/}
              </div>
              {/* Child Links */}
              {/*item.name === dropValue && (
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
                        {item.path === pathname ? (
                          <span className="text-lg">{subItem.activeIcon}</span>
                        ) : (
                          <span className="text-lg">{subItem.icon}</span>
                        )}
                        <span>{subItem.name}</span>
                      </div>
                    );
                  })}
                </div>
              )*/}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
