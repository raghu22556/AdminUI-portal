import React, { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import DashbordIcon from '../../assets/DashbordIcon';
import DashbordIconActive from '../../assets/DashbordIconActive';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdCardGiftcard, MdClose, MdNotifications, MdTouchApp } from 'react-icons/md';

export default function Sidebar(props) {
  const navigate = useNavigate();
  const { handleToggle } = props;
  const { pathname } = useLocation();

  const [dropValue, setDropValue] = useState('');

  // Handle Navigate
  const handleNavigate = (path) => navigate(path);

  // Handle Dropdown
  const handleDrop = (value) => setDropValue(value === dropValue ? '' : value);

  let menu = JSON.parse(localStorage.getItem('menu'));
  const UserProfileSetting = [
    {
      name: 'User Profile',
      path: '/userProfileUpdate',
    },
    {
      name: 'Password',
      path: '/password',
    },
  ];
  // All Links & Nested Links
  const navLinks = [
    // Dashboard
    {
      name: 'Dashboard',
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
      path: '/dashboard',
    },
    {
      name: 'Organization',
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
      path: '/organization',
    },
    {
      name: 'Projects',
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
      path: '/projects',
    },
    //{
    //  name: "Reports",
    // icon: <DashbordIcon />,
    // activeIcon: <DashbordIconActive />,
    // path: "/Reports",
    //},

    // {
    //   name: "Masters",
    //   icon: <DashbordIcon />,
    //   activeIcon: <DashbordIconActive />,
    //   path: "/UserManagement",
    //   child: [
    //     {
    //       name: "User Management",
    //       path: "/userpage",
    //       icon: <SubIcons />,
    //       activeIcon: <SubIcons />,
    //     },
    //     {
    //       name: "Designations",
    //       path: "/Masters/UserManagement",
    //       icon: <SubIcons />,
    //       activeIcon: <SubIcons />,
    //     },
    //     {
    //       name: "Roles",
    //       path: "/Masters/UserManagement",
    //       icon: <SubIcons />,
    //       activeIcon: <SubIcons />,
    //     },
    //     {
    //       name: "Access Control",
    //       path: "/Masters/UserManagement",
    //       icon: <SubIcons />,
    //       activeIcon: <SubIcons />,
    //     },
    //   ],
    // },
  ];

  const navLinksModules = [];
  menu.forEach((menuItem) => {
    let newNavItem = {
      name: menuItem.cardText,
      path: '/' + menuItem.url,
      icon: <DashbordIcon />,
      activeIcon: <DashbordIconActive />,
    };

    if (menuItem.children && menuItem.children.length > 0) {
      newNavItem.child = menuItem.children.map((childItem) => ({
        name: childItem.cardText,
        path: '/' + menuItem.cardText + '/' + childItem.url,
      }));
    }

    navLinksModules.push(newNavItem);
  });
  const theme = localStorage.getItem('currentTheme');
  const currentTheme = JSON.parse(theme);
  const themename = localStorage.getItem('themename');

  return (
    <div
      className="flex flex-col w-full max-w-xs bg-white"
      style={{
        backgroundColor: 'white',
      }}
    >
      <div className="px-6 py-4">
        <h1
          className="text-2xl font-bold text-center"
          style={{
            fontWeight: 800,
            fontSize: '24px',
            lineHeight: '32.78px',
            letterSpacing: '2%',
            color: '#056EE9',
          }}
        >
          MaidenCube
        </h1>
        <MdClose onClick={handleToggle} className="text-color text-xl md:hidden cursor-pointer" />
      </div>
      {/*
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
      */}
      {pathname === '/userProfileUpdate' || pathname === '/password' ? (
        <>
          <div className="space-y-2 px-3 py-4" style={{ width: '100%' }}>
            <h2
              className="text-lg font-semibold"
              style={{
                fontWeight: '600',
                fontSize: '12px',
                lineHeight: '18px',
              }}
            >
              Profile Setting
            </h2>
            {UserProfileSetting.map((item) => {
              // const iconColor =
              //   item.path === pathname && themename === 'dark'
              //     ? 'rgb(5, 110, 233)'
              //     : item.path === pathname && themename === 'light'
              //       ? 'white'
              //       : themename === 'dark'
              //         ? 'rgb(138, 134, 134)'
              //         : '#0D0E12';

              return (
                <div key={item.name}>
                  <Button
                    style={{
                      backgroundColor:
                        item.path === pathname
                          ? themename === 'light'
                            ? 'rgb(5, 110, 233)'
                            : ''
                          : themename === 'light'
                            ? 'rgb(229, 228, 226)'
                            : 'rgb(26, 26, 26)',

                      width: '190px',
                      height: '44px',
                      borderRadius: '8px',
                      padding: '12px 16px',
                    }}
                    className="flex items-center space-x-2 w-full"
                    variant="default"
                    onClick={() => handleNavigate(item.path)}
                  >
                    {/* <DashbordIcon color={iconColor} /> */}
                    <span
                      style={{
                        fontWeight: item.path === pathname ? 'bold' : 'normal',

                        fontSize: '12px',
                        lineHeight: '18px',
                        color:
                          item.path === pathname
                            ? themename === 'light'
                              ? 'white'
                              : 'rgb(5, 110, 233)'
                            : themename === 'light'
                              ? 'rgb(138, 134, 134)'
                              : 'rgb(138, 134, 134)',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.name}
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2 px-3 py-4" style={{ width: '100%' }}>
            <h2
              className="text-lg font-semibold"
              style={{
                fontWeight: '600',
                fontSize: '12px',
                lineHeight: '18px',
                color: themename === 'dark' ? currentTheme.colors.text : '',
              }}
            >
              Main
            </h2>
            {navLinks.map((item) => {
              const iconColor =
                item.path === pathname && themename === 'dark'
                  ? 'rgb(5, 110, 233)'
                  : item.path === pathname && themename === 'light'
                    ? 'white'
                    : themename === 'dark'
                      ? 'rgb(138, 134, 134)'
                      : '#0D0E12';

              return (
                <div key={item.name}>
                  <Button
                    style={{
                      backgroundColor:
                        item.path === pathname
                          ? themename === 'light'
                            ? 'rgb(5, 110, 233)'
                            : ''
                          : themename === 'light'
                            ? 'rgb(229, 228, 226)'
                            : 'rgb(26, 26, 26)',

                      width: '190px',
                      height: '44px',
                      borderRadius: '8px',
                      padding: '12px 16px',
                    }}
                    className="flex items-center space-x-2 w-full"
                    variant="default"
                    onClick={() => handleNavigate(item.path)}
                  >
                    <DashbordIcon color={iconColor} />
                    <span
                      style={{
                        fontWeight: item.path === pathname ? 'bold' : 'normal',

                        fontSize: '12px',
                        lineHeight: '18px',
                        color:
                          item.path === pathname
                            ? themename === 'light'
                              ? 'white'
                              : 'rgb(5, 110, 233)'
                            : themename === 'light'
                              ? 'rgb(138, 134, 134)'
                              : 'rgb(138, 134, 134)',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.name}
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 px-3 py-4" style={{ width: '100%' }}>
            <h2
              className="text-lg font-semibold"
              style={{
                fontWeight: '600',
                fontSize: '12px',
                lineHeight: '18px',
                color: themename === 'dark' ? currentTheme.colors.text : '',
              }}
            >
              Modules
            </h2>
            {navLinksModules.map((item) => {
              const iconColor =
                item.path === pathname && themename === 'dark'
                  ? 'rgb(5, 110, 233)'
                  : item.path === pathname && themename === 'light'
                    ? 'white'
                    : themename === 'dark'
                      ? 'rgb(138, 134, 134)'
                      : '#0D0E12';

              return (
                <div key={item.name}>
                  <Button
                    style={{
                      backgroundColor:
                        item.path === pathname
                          ? themename === 'light'
                            ? 'rgb(5, 110, 233)'
                            : ' '
                          : themename === 'light'
                            ? 'rgb(229, 228, 226)'
                            : 'rgb(26, 26, 26)',
                      width: '190px',
                      height: '44px',
                      borderRadius: '8px',

                      padding: '12px 16px',
                    }}
                    className="flex items-center space-x-2 w-full"
                    variant="default"
                    onClick={() => handleNavigate(item.path)}
                  >
                    <DashbordIcon color={iconColor} />
                    <span
                      style={{
                        fontWeight: item.path === pathname ? 'bold' : 'normal',

                        fontSize: '12px',
                        lineHeight: '18px',
                        color:
                          item.path === pathname
                            ? themename === 'light'
                              ? 'white'
                              : 'rgb(5, 110, 233)'
                            : themename === 'light'
                              ? 'rgb(138, 134, 134)'
                              : 'rgb(138, 134, 134)',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.name}
                    </span>
                  </Button>
                </div>
              );
            })}

            <span
              className="flex items-center space-x-2 w-full"
              variant="default"
              style={{ marginTop: '15px' }}
            >
              <PlusIcon style={{ color: '#95A4FC' }} className="h-4 w-4" />
              <span
                style={{
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#95A4FC',
                  textTransform: 'capitalize',
                }}
              >
                Create Module
              </span>
            </span>
          </div>

          <div className="space-y-2 px-3 py-4" style={{ width: '100%' }}>
            <h2
              className="text-lg font-semibold"
              style={{
                fontWeight: '600',
                fontSize: '12px',
                lineHeight: '18px',
                color: themename === 'dark' ? currentTheme.colors.text : '',
              }}
            >
              Settings
            </h2>
            <Button
              style={{
                backgroundColor: themename === 'dark' ? 'rgb(26, 26, 26)' : 'rgb(229, 228, 226)',
                width: '190px',
                height: '44px',
                borderRadius: '8px',

                padding: '12px, 16px, 12px, 16px',
              }}
              className="flex items-center space-x-2"
            >
              <BellIcon style={{ color: 'rgb(138 134 134)	' }} className="h-5 w-5" />
              <span
                style={{
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: 'rgb(138 134 134)',
                  textTransform: 'capitalize',
                }}
              >
                Notification Settings
              </span>
            </Button>
            <Button
              style={{
                backgroundColor: themename === 'dark' ? 'rgb(26, 26, 26)' : 'rgb(229, 228, 226)',
                width: '190px',
                height: '44px',
                borderRadius: '8px',

                padding: '12px, 16px, 12px, 16px',
                color: '#A9A9A9 ',
              }}
              className="flex items-center space-x-2 w-full"
              variant="default"
            >
              <UserCircleIcon style={{ color: 'rgb(138 134 134)	' }} className="h-5 w-5" />
              <span
                style={{
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: 'rgb(138 134 134)',
                  textTransform: 'capitalize',
                }}
              >
                Profile Setting
              </span>
            </Button>
          </div>
        </>
      )}
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
