import React, { useState } from 'react';
import { BsChatDots, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { HiOutlineMenu, HiOutlineSearch } from 'react-icons/hi';

import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import Popper from '@material-ui/core/Popper';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import FullScreen from '../FullScreen';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const { handleToggle, handleOpenToggle, drawer, t } = props;

  let projects = JSON.parse(localStorage.getItem('project'));
  const showProfile = () => {
    setProfile(!profile);
  };
  const handleClick = () => {
    // check is the previous drop-down is open or closed and do opposite
    setOpen((prev) => !prev);
  };

  const handleToggles = () => {
    setOpen(false); // if you click away anywhere then it will close the drop-down
  };

  const handlePop = () => {
    setPop((prev) => !prev);
  };
  const handleTogglePop = () => {
    setPop(false);
  };

  const onLanguageChange = (e) => {
    if (e) {
      let selectedLang = e.target.value;
      props.i18n.changeLanguage(selectedLang);
      localStorage.selectedLanguage = selectedLang;
      moment.locale(selectedLang);
      window.location.reload();
    }
  };

  const onProjectChange = (e) => {
    let projectOnSelect = e.target.value;
    setSelectedProject(projectOnSelect);

    if (projectOnSelect) {
      navigate('/' + projectOnSelect);
    }
  };

  return (
    <div className="p-4 bg-white sticky z-40 border-b top-0 left-0 shadow-sm flex items-center">
      {/* <HiOutlineMenu
        onClick={handleToggle}
        className="text-color text-xl cursor-pointer"
      /> */}

      {!drawer ? (
        <img
          src="/close.svg"
          alt=""
          onClick={handleToggle}
          className="text-color text-xl cursor-pointer w-[30px]"
        />
      ) : (
        <img
          src="/open.svg"
          alt=""
          className="text-color text-xl cursor-pointer w-[30px]"
          onClick={handleToggle}
        />
      )}

      <div className={`sm:ml-5 ml-2.5 ${drawer ? 'hidden md:flex' : 'flex md:hidden'}`}>
        <Typography>MaidenCube</Typography>
      </div>

      <section className="flex ml-auto gap-3 sm:gap-4 md:gap-5">
        <div className="relative ml-auto mr-2.5">
          <div
            className="bg-[#F7F9FB] p-2 px-5 border border-lightgray rounded-md cursor-pointer flex items-center justify-between"
            style={{ width: '200px' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src="/Projects.svg" alt="" style={{ width: '16px' }} />{' '}
            <span style={{ fontSize: '14px' }}>Project Name</span>
            {isOpen ? <BsChevronUp className="ml-2" /> : <BsChevronDown className="ml-2" />}
          </div>
          {isOpen && (
            <div
              className="absolute bg-white border border-lightgray rounded-md mt-2 z-10"
              style={{ marginTop: '10px' }}
            >
              {projects.map((item) => (
                <div
                  key={item.ProjectId}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-200 w-[200px] mt-2"
                  onClick={() => onProjectChange(item)}
                >
                  <p style={{ fontSize: '14px' }}>{item.ProjectName}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <div className="icon-bg text-color text-lg sm:text-xl  w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
          <BsChatDots />
        </div> */}
        {/* Profile */}
        <section className="flex items-center gap-1.5 sm:gap-3">
          <div className="icon-bg text-color text-lg sm:text-xl  w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
            <img src="/Notifications.svg" alt="icon" />
          </div>
        </section>

        <FullScreen />
        <Popper
          open={open}
          role={undefined}
          transition
          // disablePortal
          style={{
            position: 'absolute',
            left: 'unset !important',
            top: 'unset !important',
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                position: 'absolute',
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                left: 'unset !important',
                top: 'unset !important',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleToggles}>
                  <div
                    autoFocusItem={open}
                    style={{
                      position: 'fixed',
                      backgroundColor: '#eeeeee',
                      borderRadius: '3px',
                      right: '25px',
                      top: '72px',
                      width: '300px',
                      padding: '10px',
                      boxShadow: 'rgba(51, 51, 51, 0.45) 1px 1px 3px 1px',
                      zIndex: '9',
                      padding: '15px',
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 'bold', margin: '2px 0px' }}>Rohit Sharma</p>
                      {/* <p style={{ fontWeight: 'bold', margin: '2px' }}>lastName</p> */}
                      <p style={{ fontSize: 'smaller', fontWeight: '500px' }}>rohitz93</p>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          id="google_translate_element"
                          style={{
                            display: 'flex',
                          }}
                        >
                          <div
                            style={{
                              color: 'black',
                              marginRight: '1em',
                              width: '50%',
                            }}
                          >
                            {t('Language')}
                          </div>
                          <select
                            defaultValue={
                              localStorage.selectedLanguage ? localStorage.selectedLanguage : '1'
                            }
                            style={{ width: '50%' }}
                            onChange={onLanguageChange}
                          >
                            <option value="1" hidden="hidden">
                              English
                            </option>
                            <option value="en">English</option>
                            <option value="es">{t('Spanish')}</option>
                            <option value="pt">{t('Portuguese')}</option>
                            <option value="ar">{t('Arabic')}</option>
                            <option value="cn">{t('Chinese')}</option>
                          </select>
                        </div>
                        <br></br>
                        {/* <div
                          id="project_lists"
                          style={{
                            display: "flex",
                          }}
                        >
                          <div
                            style={{
                              color: "black",
                              marginRight: "1em",
                              width: "50%",
                            }}
                          >
                            {"Project"}
                          </div>
                          <select
                            value={selectedProject}
                            style={{ width: "50%" }}
                            onChange={onProjectChange}
                          >
                            <option value="" disabled hidden>
                              View Projects
                            </option>
                            <option value="projectTable">Project 01</option>
                            <option value="userpage">Project 02</option>
                            <option value="Project03">Project 03</option>
                            <option value="Project04">Project 04</option>
                            <option value="Project05">Project 05</option>
                          </select>
                        </div> */}
                      </div>

                      <br></br>
                    </div>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <button
          style={{
            backgroundColor: '#FFF',
            borderRadius: '50px',
          }}
          aria-label="Person"
          justIcon
          onClick={handleClick}
        >
          <span style={{ color: 'black', fontWeight: 'bold' }}>{t('NF')}</span>
          {/* <Person
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }

          /> */}
          {/* <Hidden mdUp implementation="css">
            <span className={classes.linkText}>
              {rtlActive ? "الملف الشخصي" : "Profile"}
            </span>
          </Hidden> */}
        </button>
        <div>
          <img
            onClick={showProfile}
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
            class="relative inline-block object-cover object-center w-9 h-9 rounded-full cursor-pointer"
            data-popover-target="profile-menu"
          />
          {profile && (
            <ul
              role="menu"
              data-popover="profile-menu"
              data-popover-placement="bottom"
              class="absolute mx-[-160px] my-5 z-10 flex min-w-[200px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
            >
              <div class="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 pl-1 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <img
                  alt="tania andrew"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  class="relative inline-block object-cover object-center w-9 h-9 rounded-full cursor-pointer"
                  data-popover-target="profile-menu"
                />
                <div className="text-sm hidden md:flex flex-col">
                  <span className="text-color font-semibold">Admin</span>
                  <span className="text-gray-500 text-xs">MaidenCube.in</span>
                </div>
              </div>

              <button
                role="menuitem"
                class="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 pl-1 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                    fill="#90A4AE"
                  ></path>
                </svg>
                <p class="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                  My Profile
                </p>
              </button>

              <hr class="my-2 border-blue-gray-50" role="menuitem" />
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                  // toast.success("LogOut Success!");
                }}
                role="menuitem"
                class="flex w-full cursor-pointer select-none items-center gap-2 pl-1 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                    fill="#90A4AE"
                  ></path>
                </svg>
                <p class="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                  Sign Out
                </p>
              </button>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default withTranslation()(Navbar);
