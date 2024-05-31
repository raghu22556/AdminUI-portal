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

const Navbar = (props) => {
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { handleToggle, drawer, t } = props;
  let projects = JSON.parse(localStorage.getItem('project'));


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
      <img
        src="/close.svg"
        alt=""
        onClick={handleToggle}
        className="text-color text-xl cursor-pointer w-[30px]"
      />

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
            <img src="/Projects.svg" alt="" style={{ width: '16px' }} /> <span style={{ fontSize: '14px' }}>Project Name</span>
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
          <div className="text-sm hidden md:flex flex-col">
            <span className="text-color font-semibold">Admin</span>
            <span className="text-gray-500 text-xs">MaidenCube.in</span>
          </div>

          <ClickAwayListener onClickAway={handleTogglePop}>
            <button onClick={handlePop}>
              {pop ? (
                <BsChevronUp className="text-color text-sm cursor-pointer" />
              ) : (
                <BsChevronDown className="text-color text-sm cursor-pointer" />
              )}
            </button>
          </ClickAwayListener>

          <img
            src="https://s3-alpha-sig.figma.com/img/0eba/1822/f3b6e417139fd32b6e85460026150af7?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P-QDZ8U9MASEc1BV-X5irII9q913cobryW92i29fBe1VFA16ZoTFMBzVTM-9wyjgh5dP7yBj8NFiXIZAyDuL3PIwdSpSXt0i459-cS7ueyqtQ6scZrjxBNter--9~IxQ-ZjO6mLlossbO~ayB5cafGwb08x8BtfvvnvcxzyZr17iDSZsHDOS1LNcxwRdoexZPGvsHyJLYYfhKgqfPf03BZIThKBPpXKk7zGjmzb~Jv6hfvvJi47nGq346aKbwRWU58Dce6MqDuuNQ7GgQHEZ2VlAVqoSuM3IIuYfdlzp8Mr9m~wv4~l1AeTL3mN-Wl-wSBjCG0tUYlcOjJ7Q8NVyEw__"
            className="icon-bg text-color text-xl w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-md cursor-pointer"
          />

          <div className="icon-bg text-color text-lg sm:text-xl  w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
            <img src="/Notifications.svg" alt="icon" />
          </div>

          {/* By clicking outside, the drop-down will be closed */}
        </section>

        {/* Popup */}
        {pop && (
          <div className="rounded p-3  gap-1.5 w-36 z-30 absolute top-16 sm:top-20 right-3   bg-white text-xs  grid text-left shadow">
            <span className="cursor-pointer">My Profile</span>
            <span className="cursor-pointer">Update Profile</span>
            <span
              onClick={() => {
                localStorage.clear();
                navigate('/');
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
      </section>
    </div>
  );
};

export default withTranslation()(Navbar);
