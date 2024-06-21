import React, { useState, useEffect } from 'react';
import { BsChatDots, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { HiOutlineMenu, HiOutlineSearch } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa';
import { URL } from '../../app-config';
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
import '../component.css';
import toast, { Toaster } from 'react-hot-toast';
import FeedbackModal from '../Modals/FeedbackModal';
import { useSelector, useDispatch } from 'react-redux';
import { darkTheme, whiteTheme } from '../../utils/theme'; // Importing theme objects for dark and light modes

const languageOptions = [
  { value: 'en', label: 'English', icon: '/united-states.png' },
  { value: 'es', label: 'Spanish', icon: '/spanish.png' },
  { value: 'pt', label: 'Portuguese', icon: '/portuguese.png' },
  { value: 'ar', label: 'Arabic', icon: '/arabic.png' },
  { value: 'cn', label: 'Chinese', icon: '/china.png' },
];
const themeOptions = [
  { value: 'light', label: 'Light', icon: '/lightMode.png' },
  { value: 'dark', label: 'Dark', icon: '/darkMode.png' },
];
const Navbar = (props) => {
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [languageSelectedOption, setlanguageSelectedOption] = useState(languageOptions[0]);
  const [langOpen, setlangOpen] = useState(false);
  const [themeOpen, setthemeOpen] = useState(false);
  const initialTheme = localStorage.getItem('themename') || 'light';
  const initialThemeOption = themeOptions.find((option) => option.value === initialTheme);
  const [themeSelectedOption, setthemeSelectedOption] = useState(initialThemeOption);
  const [userProfile, setUserProfile] = useState({});
  const [theme, setTheme] = useState(initialTheme);
  const [currentTheme, setCurrentTheme] = useState(
    initialTheme === 'dark' ? darkTheme : whiteTheme,
  );

  if (localStorage.getItem('currentTheme') == null) {
    localStorage.setItem('currentTheme', JSON.stringify(currentTheme));
  }

  const login_result = useSelector((state) => state?.login);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { handleToggle, handleOpenToggle, drawer, t, handleUserProfileSetting } = props;
  useEffect(() => {
    const selectedTheme = theme === 'dark' ? darkTheme : whiteTheme;
    setCurrentTheme(selectedTheme);
    localStorage.setItem('currentTheme', JSON.stringify(selectedTheme));
    localStorage.setItem('themename', theme);
    localStorage.setItem('selectedTheme', selectedTheme);
  }, [theme]);
  useEffect(() => {
    const storedThemeName = localStorage.getItem('themename');
    const storedTheme = localStorage.getItem('currentTheme');
    if (storedTheme && storedThemeName) {
      setTheme(storedThemeName);
      setCurrentTheme(JSON.parse(storedTheme));
      const storedThemeOption = themeOptions.find((option) => option.value === storedThemeName);
      setthemeSelectedOption(storedThemeOption);
    }
  }, []);
  const handleThemes = (event) => {
    setTheme(event.target.value); // Function to handle theme change
  };
  let projects = JSON.parse(localStorage.getItem('project'));
  const showProfile = () => {
    setProfile(!profile);
  };
  const languageSelect = (option) => {
    setlanguageSelectedOption(option);
    setlangOpen(false);
    if (option.value) {
      let selectedLang = option.value;
      props.i18n.changeLanguage(selectedLang);
      localStorage.setItem('selectedLanguage', selectedLang);
      moment.locale(selectedLang);
    }
  };
  const themeSelect = (option) => {
    setthemeSelectedOption(option);
    setthemeOpen(false);
    if (option.value) {
      const selectedTheme = option.value === 'dark' ? darkTheme : whiteTheme;
      setCurrentTheme(selectedTheme);
      setTheme(option.value);
      localStorage.setItem('currentTheme', JSON.stringify(selectedTheme));
      localStorage.setItem('themename', option.value);
    }
  };

  useEffect(() => {
    if (login_result?.data?.userInfo) {
      setUserProfile(login_result.data.userInfo);
      localStorage.setItem('email', login_result.data.userInfo.Email);
    }
  }, [login_result]);
  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      const selectedLangOption = languageOptions.find((option) => option.value === storedLang);
      setlanguageSelectedOption(selectedLangOption);
      props.i18n.changeLanguage(storedLang);
      moment.locale(storedLang);
    }
  }, []);

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

  const onProjectChange = (e) => {
    let projectOnSelect = e.target.value;
    setSelectedProject(projectOnSelect);

    if (projectOnSelect) {
      navigate('/' + projectOnSelect);
    }
  };

  const userProfileSetting = () => {
    navigate('/userProfileUpdate');
  };

  const handleNotification = () => {
    toast('No New Notifications', {
      duration: 4000,
      position: 'top-right',

      // Styling
      style: {},
      className: '',

      // Custom Icon
      icon: '😞',

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },

      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  };

  return (
    <>
      {/* navbar */}
      <div className="p-4 bg-white sticky z-40 border-b top-0 left-0 shadow-sm flex items-center">
        {!drawer ? (
          <img
            src="/close.svg"
            alt=""
            onClick={handleToggle}
            className="text-color text-xl cursor-pointer w-[40px]"
          />
        ) : (
          <img
            src="/open.svg"
            alt=""
            className="text-color text-xl cursor-pointer w-[40px]"
            onClick={handleToggle}
          />
        )}

        <div className={`sm:ml-5 ml-2.5 ${drawer ? 'hidden md:flex' : 'flex md:hidden'}`}>
          <Typography
            style={{
              fontWeight: 800,
              fontSize: '26px',
              width: '100%',
              lineHeight: '38.78px',
              letterSpacing: '2%',
              color: '#056EE9',
            }}
          >
            MaidenCube
          </Typography>
        </div>

        <section className="flex ml-auto gap-2 sm:gap-4 md:gap-5 ">
          <div className="relative mr-7 hidden md:flex">
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
                style={{ marginTop: '40px' }}
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

          <section
            className="hidden md:flex items-center gap-1.5 sm:gap-3 ml-2"
            style={{ marginTop: '-3px' }}
          >
            <div className="icon-bg text-color text-lg sm:text-xl w-9 h-9 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
              <img
                className="h-5 w-5"
                src="/Notifications.svg"
                alt="icon"
                onClick={handleNotification}
              />
              <Toaster />
            </div>
          </section>

          <div className="hidden md:flex items-center gap-1.5 sm:gap-3 ml-2 ">
            <FullScreen />
          </div>

          <div className="ml-auto relative hidden md:flex" style={{ marginRight: '-50px' }}>
            <div
              className="flex items-center gap-2  p-2 px-5  rounded-md cursor-pointer"
              style={{ width: '100px' }}
              onClick={() => setthemeOpen(!themeOpen)}
            >
              <img src={themeSelectedOption.icon} alt="" className="w-5 font-bold" />{' '}
            </div>
            {themeOpen && (
              <ClickAwayListener onClickAway={() => setthemeOpen(false)}>
                <div
                  className="absolute bg-white  rounded-md mt-2 z-10 md:mt-5 w-40 border border-gray-300"
                  style={{ marginTop: '40px', width: '130px' }}
                >
                  {themeOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center p-2 cursor-pointer  hover:bg-gray-200 transition-all duration-200 ease-in-out ${
                        themeSelectedOption.value === option.value
                          ? 'bg-gray-200 text-black bold'
                          : ''
                      }`}
                      onClick={() => themeSelect(option)}
                      style={{ borderRadius: '4px', margin: '10px' }}
                    >
                      <img src={option.icon} alt="" style={{ width: '16px' }} />{' '}
                      <span className="text-sm ml-3 ">{option.label}</span>
                      {themeSelectedOption.value === option.value && (
                        <FaCheck className="ml-auto text-color text-blue-700" />
                      )}
                    </div>
                  ))}
                </div>
              </ClickAwayListener>
            )}
          </div>

          <div className="ml-auto relative hidden md:flex" style={{ marginRight: '-45px' }}>
            <div
              className="flex items-center gap-2  p-2 px-5  rounded-md cursor-pointer"
              style={{ width: '170px' }}
              onClick={() => setlangOpen(!langOpen)}
            >
              <img src={languageSelectedOption.icon} alt="" style={{ width: '18px' }} />{' '}
              <span style={{ fontSize: '14px' }}>{languageSelectedOption.label}</span>
            </div>
            {langOpen && (
              <ClickAwayListener onClickAway={() => setlangOpen(false)}>
                <div
                  className="absolute bg-white border border-lightgray rounded-md mt-2 z-10"
                  style={{ marginTop: '40px', width: '170px' }}
                >
                  {languageOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center p-2 cursor-pointer  hover:bg-gray-200 transition-all duration-200 ease-in-out ${
                        languageSelectedOption.value === option.value
                          ? 'bg-gray-200 text-black bold'
                          : ''
                      }`}
                      onClick={() => languageSelect(option)}
                      style={{ borderRadius: '4px', margin: '10px' }}
                    >
                      <img src={option.icon} alt="" style={{ width: '16px' }} />{' '}
                      <span className="text-sm ml-3">{option.label}</span>
                      {languageSelectedOption.value === option.value && (
                        <FaCheck className="ml-auto text-color text-blue-700" />
                      )}
                    </div>
                  ))}
                </div>
              </ClickAwayListener>
            )}
          </div>
          <div>
            {userProfile.ProfileImage || (
              <img
                onClick={showProfile}
                alt="Profile Image"
                src="/noProfilePic.png"
                className="relative inline-block object-cover object-center w-9 h-9 rounded-full cursor-pointer"
                data-popover-target="profile-menu"
              />
            )}

            {profile && (
              <ul
                role="menu"
                data-popover="profile-menu"
                data-popover-placement="bottom"
                className="absolute mx-[-160px] my-5 flex min-w-[200px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
              >
                <div className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 pl-0 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  {userProfile.ProfileImage || (
                    <img
                      alt=""
                      src="/noProfilePic.png"
                      className="relative inline-block object-cover object-center w-9 h-9 rounded-full cursor-pointer"
                      data-popover-target="profile-menu"
                    />
                  )}

                  <div className="text-sm hidden md:flex flex-col">
                    <span className="text-color font-semibold">{userProfile.Name || 'Admin'}</span>
                    <span className="text-gray-500 text-xs">
                      {userProfile.Email || localStorage.getItem('email')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={userProfileSetting}
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 pl-1 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                    My Profile
                  </p>
                </button>
                <FeedbackModal />

                <hr className="my-2 border-blue-gray-50" role="menuitem" />
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate('/');
                    // toast.success("LogOut Success!");
                  }}
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 pl-1 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                    Sign Out
                  </p>
                </button>
              </ul>
            )}
          </div>
        </section>
      </div>
      {/* subheader */}
      <div
        className="subheader"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          width: '100%',
          padding: '0px 10px',
        }}
      >
        <div
          className={`sm:ml-5 ml-2.5 ${drawer ? 'hidden md:flex' : 'flex md:hidden'}`}
          style={{
            backgroundColor: '#fff',
            borderBottomRightRadius: '10px',
            borderBottomLeftRadius: '10px',
            position: 'fixed',
            zIndex: '1',
            boxShadow: '10px 11px 28px -16px rgba(0,0,0,0.40',
          }}
        >
          <div className="flex items-center md:mt-0">
            <section
              className="md:hidden flex items-center gap-1.5 sm:gap-3 ml-2 mr-6"
              style={{ marginTop: '-3px' }}
            >
              <div className="icon-bg text-color text-lg sm:text-xl  w-9 h-9 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
                <img
                  className="h-5 w-5"
                  src="/Notifications.svg"
                  alt="icon"
                  onClick={handleNotification}
                />
                <Toaster />
              </div>
            </section>

            <div
              className="ml-auto relative md:hidden  gap-1.5 sm:gap-3"
              style={{ marginRight: '-50px' }}
            >
              <div
                className="flex items-center gap-2  p-2 px-5  rounded-md cursor-pointer"
                style={{ width: '100px' }}
                onClick={() => setthemeOpen(!themeOpen)}
              >
                <img src={themeSelectedOption.icon} alt="" className="w-5 font-bold" />{' '}
              </div>
              {themeOpen && (
                <ClickAwayListener onClickAway={() => setthemeOpen(false)}>
                  <div
                    className="absolute bg-white  rounded-md mt-2 z-10 md:mt-4 w-40 border border-gray-300"
                    style={{ marginTop: '10px', width: '130px' }}
                  >
                    {themeOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center p-2 cursor-pointer  hover:bg-gray-200 transition-all duration-200 ease-in-out ${
                          themeSelectedOption.value === option.value
                            ? 'bg-gray-200 text-black bold'
                            : ''
                        }`}
                        onClick={() => themeSelect(option)}
                        style={{ borderRadius: '4px', margin: '10px' }}
                      >
                        <img src={option.icon} alt="" style={{ width: '16px' }} />{' '}
                        <span className="text-sm ml-3 ">{option.label}</span>
                        {themeSelectedOption.value === option.value && (
                          <FaCheck className="ml-auto text-color text-blue-700" />
                        )}
                      </div>
                    ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>

            <div className="ml-auto relative md:hidden" style={{ marginRight: '-45px' }}>
              <div
                className="flex items-center gap-2  p-2 px-5  rounded-md cursor-pointer"
                style={{ width: '170px' }}
                onClick={() => setlangOpen(!langOpen)}
              >
                <img src={languageSelectedOption.icon} alt="" style={{ width: '18px' }} />{' '}
                <span style={{ fontSize: '14px' }}>{languageSelectedOption.label}</span>
              </div>
              {langOpen && (
                <ClickAwayListener onClickAway={() => setlangOpen(false)}>
                  <div
                    className="absolute bg-white border border-lightgray rounded-md mt-2 z-10"
                    style={{ marginTop: '10px', width: '170px' }}
                  >
                    {languageOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center p-2 cursor-pointer  hover:bg-gray-200 transition-all duration-200 ease-in-out ${
                          languageSelectedOption.value === option.value
                            ? 'bg-gray-200 text-black bold'
                            : ''
                        }`}
                        onClick={() => languageSelect(option)}
                        style={{ borderRadius: '4px', margin: '10px' }}
                      >
                        <img src={option.icon} alt="" style={{ width: '16px' }} />{' '}
                        <span className="text-sm ml-3">{option.label}</span>
                        {languageSelectedOption.value === option.value && (
                          <FaCheck className="ml-auto text-color text-blue-700" />
                        )}
                      </div>
                    ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>

            <div className="relative md:hidden">
              <div
                className="bg-[#F7F9FB] p-2 px-5 border border-lightgray rounded-md cursor-pointer flex items-center justify-between"
                style={{ width: '150px' }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <img src="/Projects.svg" alt="" style={{ width: '12px' }} />{' '}
                <span style={{ fontSize: '10px' }}>Project Name</span>
                {isOpen ? <BsChevronUp className="ml-2" /> : <BsChevronDown className="ml-2" />}
              </div>
              {isOpen && (
                <div className="absolute bg-white border border-lightgray rounded-md mt-2">
                  {projects.map((item) => (
                    <div
                      key={item.ProjectId}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-200 w-[150px] mt-2"
                      onClick={() => onProjectChange(item)}
                    >
                      <p style={{ fontSize: '10px' }}>{item.ProjectName}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation()(Navbar);
