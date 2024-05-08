import React, { useState } from "react";
import { BsChatDots, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { HiOutlineMenu, HiOutlineSearch } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Badge from "@material-ui/core/Badge";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import { withTranslation } from "react-i18next";
import moment from "moment";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const { handleToggle, drawer, t } = props;

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
      navigate("/" + projectOnSelect);
    }
  };

  return (
    <div className="p-4 bg-white sticky z-40 border-b top-0 left-0 shadow-sm flex items-center">
      {/* <HiOutlineMenu
        onClick={handleToggle}
        className="text-color text-xl cursor-pointer"
      /> */}
      <img
        src="close.svg"
        alt=""
        onClick={handleToggle}
        className="text-color text-xl cursor-pointer w-[30px]"
      />

      <div
        className={`sm:ml-5 ml-2.5 ${
          drawer ? "hidden md:flex" : "flex md:hidden"
        }`}
      >
        <Typography>MaidenCube</Typography>
      </div>

      {/* Left Portion */}
      <section className="flex ml-auto gap-3 sm:gap-4 md:gap-5">
        <div className="icon-bg text-color text-lg sm:text-xl  w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
          <MdOutlineNotificationsActive />
        </div>
        {/* <div className="icon-bg text-color text-lg sm:text-xl  w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
          <BsChatDots />
        </div> */}
        {/* Profile */}
        <section className="flex items-center gap-1.5 sm:gap-3">
          <img
            src="https://images.unsplash.com/photo-1682687220866-c856f566f1bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
            className="icon-bg text-color text-xl w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full cursor-pointer"
          />
          <div className="text-sm hidden md:flex flex-col">
            <span className="text-color font-semibold">Admin</span>
            <span className="text-gray-500 text-xs">MaidenCube.in</span>
          </div>

          {/* By clicking outside, the drop-down will be closed */}
          <ClickAwayListener onClickAway={handleTogglePop}>
            <button onClick={handlePop}>
              {pop ? (
                <BsChevronUp className="text-color text-sm cursor-pointer" />
              ) : (
                <BsChevronDown className="text-color text-sm cursor-pointer" />
              )}
            </button>
          </ClickAwayListener>
        </section>

        {/* Popup */}
        {pop && (
          <div className="rounded p-3  gap-1.5 w-36 z-30 absolute top-16 sm:top-20 right-3   bg-white text-xs  grid text-left shadow">
            <span className="cursor-pointer">My Profile</span>
            <span className="cursor-pointer">Update Profile</span>
            <span
              onClick={() => {
                localStorage.clear();
                navigate("/");
                // toast.success("LogOut Success!");
              }}
              className="cursor-pointer"
            >
              Sign Out
            </span>
          </div>
        )}
        <Popper
          open={open}
          role={undefined}
          transition
          // disablePortal
          style={{
            position: "absolute",
            left: "unset !important",
            top: "unset !important",
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                position: "absolute",
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
                left: "unset !important",
                top: "unset !important",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleToggles}>
                  <div
                    autoFocusItem={open}
                    style={{
                      position: "fixed",
                      backgroundColor: "#eeeeee",
                      borderRadius: "3px",
                      right: "25px",
                      top: "72px",
                      width: "300px",
                      padding: "10px",
                      boxShadow: "rgba(51, 51, 51, 0.45) 1px 1px 3px 1px",
                      zIndex: "9",
                      padding: "15px",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: "bold", margin: "2px 0px" }}>
                        Rohit Sharma
                      </p>
                      {/* <p style={{ fontWeight: 'bold', margin: '2px' }}>lastName</p> */}
                      <p style={{ fontSize: "smaller", fontWeight: "500px" }}>
                        rohitz93
                      </p>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          id="google_translate_element"
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
                            {t("Language")}
                          </div>
                          <select
                            defaultValue={
                              localStorage.selectedLanguage
                                ? localStorage.selectedLanguage
                                : "1"
                            }
                            style={{ width: "50%" }}
                            onChange={onLanguageChange}
                          >
                            <option value="1" hidden="hidden">
                              English
                            </option>
                            <option value="en">English</option>
                            <option value="es">{t("Spanish")}</option>
                            <option value="pt">{t("Portuguese")}</option>
                            <option value="ar">{t("Arabic")}</option>
                            <option value="cn">{t("Chinese")}</option>
                          </select>
                        </div>
                        <br></br>
                        <div
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
                        </div>
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
            backgroundColor: "#FFF",
            borderRadius: "50px",
          }}
          aria-label="Person"
          justIcon
          onClick={handleClick}
        >
          <span style={{ color: "black", fontWeight: "bold" }}>{t("NF")}</span>
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
      </section>
    </div>
  );
};

export default withTranslation()(Navbar);
