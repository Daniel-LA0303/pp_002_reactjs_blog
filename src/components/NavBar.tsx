import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ProfileButton from "./User/ProfileButton";

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
      <div className={` bg-slate-200`}>
        <div
          className={`w-full text-gray-700 bg-white h-16 fixed top-0 z-40 transition-all ${
            !atTop ? "bg-black shadow-lg" : ""
          }`}
        >
          <div className="flex  max-w-screen-xl px-2 mx-auto md:items-center justify-between md:flex-row bg-slate-300">
            <div className="p-4 flex flex-row items-center justify-between">
              <a
                href="#"
                className="tracking-widest rounded-lg focus:outline-none focus:shadow-outline"
              >
                LOGO
              </a>
              
              <div className="searchBox ml-2">
                <input className="searchInput" type="text" name="" placeholder="Search" />
                <button className="searchButton" >
                  <SearchIcon fontSize="small"/>
                </button>
              </div>
            </div>

            <div className="flex">
              <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
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
