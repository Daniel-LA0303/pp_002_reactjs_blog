import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ProfileButton from "./User/ProfileButton";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";
import SideBarMenu from "./sidebar/SideBarMenu";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const NavBar: React.FC = () => {

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const route = useNavigate();
  const [atTop, setAtTop] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
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
    if (searchQuery.trim()) {  // Verifica que no esté vacío
      route(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {    
  }, []);


  return (
    <>
      <div className={`bg-slate-200 w-full shadow-md`}>
        <div
          className={`w-full text-gray-700 bg-white h-16 fixed top-0 z-40 transition-all ${
            !atTop ? "bg-black shadow-lg" : ""
          }`}
        >
          <div className="flex md:items-center justify-between md:flex-row w-full sm:w-full max-w-screen-lg mx-auto">
            <div className="py-3 flex flex-row items-center justify-between">
              <button className="block md:hidden pl-2" onClick={toggleMenu}>
                {menuOpen ? (
                  <CloseIcon fontSize="medium" />
                ) : (
                  <MenuOutlinedIcon fontSize="medium" />
                )}
              </button>
              <Link
                to={`/home-dev`}
                className="tracking-widest rounded-lg focus:outline-none focus:shadow-outline sm:mx-2 md:mr-2"
              >
                LOGO
              </Link>
              <div className="searchBox">
                <input 
                  className="searchInput" 
                  type="text" 
                  name="searchQuery"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search" 
                />
                <button onClick={handleSearch} className="searchButton">
                  <SearchIcon fontSize="small" />
                </button>
              </div>
            </div>
  
            <div className="flex items-center justify-center mr-2 lg:mr-0">
              {accessToken ? (
                <>
                  <Link
                    to={`/create-blog`}
                    type="button"
                    className="hidden md:block text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  >
                    Create Blog
                  </Link>
                  <ProfileButton />
                </>
              ): (
                <>
                  <Link
                    to={`/login`}
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-900 border border-gray-800 hover:border-gray-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-transparent dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:border-gray-600 dark:focus:ring-gray-800"
                  >
                    Login
                  </Link>
                  <Link
                    to={`/register`}
                    type="button"
                    className="hidden md:block text-white bg-gray-900 hover:bg-white border border-gray-800 hover:text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-gray-600 dark:text-white dark:hover:bg-white dark:hover:text-gray-400 dark:border-gray-600 dark:focus:ring-gray-800"
                  >
                    Register
                  </Link>
                </>
              )}
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
          <div className="mt-2 mr-2 flex justify-end">
            <CloseIcon fontSize="medium" onClick={toggleMenu} />
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
}  

export default NavBar;
