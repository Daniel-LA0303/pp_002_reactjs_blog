import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ProfileButton from "./User/ProfileButton";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";
import SideBarMenu from "./sidebar/SideBarMenu";

const NavBar: React.FC = () => {

  const route = useNavigate();
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú

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

  const handleSearch = () => {
    route("/search");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };


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
            <button className="block md:hidden" onClick={toggleMenu}>
                {menuOpen ? (
                  <CloseIcon fontSize="medium" />
                ) : (
                  <MenuOutlinedIcon fontSize="medium" />
                )}
              </button>
              <Link
                to={`/home-dev`}
                className="tracking-widest rounded-lg focus:outline-none focus:shadow-outline mx-2"
              >
                LOGO
              </Link>
              <div className="searchBox">
                <input className="searchInput" type="text" name="" placeholder="Search" />
                <button 
                  onClick={() => handleSearch()}
                  className="searchButton" >
                  <SearchIcon fontSize="small"/>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Link to={`/create-blog`} type="button" className="hidden md:block text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                Create Blog
              </Link>
              <ProfileButton />
            </div>
          </div>
        </div>
      </div>

      {/* SideBar Menu */}
      {menuOpen && (
        <div
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } duration-300 ease-in-out`}
        > 
          <div
            className="mt-2 mr-2 flex justify-end"
          >
            <CloseIcon 
              fontSize="medium" 
              onClick={toggleMenu}
            />
          </div>
          <SideBarMenu />
        </div>
      )}

      {menuOpen && (
        <div
        className={`fixed inset-0 bg-black transition-opacity ${
          menuOpen ? "opacity-50" : "opacity-0 pointer-events-none h-full"
        } z-40 duration-300 ease-in-out`}
          onClick={toggleMenu}
        ></div>
      )}

    </>
  );
};

export default NavBar;
