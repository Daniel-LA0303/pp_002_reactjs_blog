import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ProfileButton from "./User/ProfileButton";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const NavBar: React.FC = () => {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Detect scroll to handle "atTop" state
  React.useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.pageYOffset <= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={` bg-slate-200 w-full`}>
        <div
          className={`w-full text-gray-700 bg-white h-16 fixed top-0 z-40 transition-all px-2 md:px-5 ${
            !atTop ? "bg-black shadow-lg" : ""
          }`}
        >
          <div className="flex max-w-screen-xl mx-auto md:items-center justify-between md:flex-row ">
            <div className="py-3 flex flex-row items-center justify-between">
              <button className="block md:hidden">
                <MenuOutlinedIcon fontSize="medium"/>
              </button>
              <a
                href="#"
                className="tracking-widest rounded-lg focus:outline-none focus:shadow-outline mx-2"
              >
                LOGO
              </a>
              <div className="searchBox">
                <input className="searchInput" type="text" name="" placeholder="Search" />
                <button className="searchButton" >
                  <SearchIcon fontSize="small"/>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button type="button" className="hidden md:block text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                Create Blog
              </button>
              <ProfileButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
