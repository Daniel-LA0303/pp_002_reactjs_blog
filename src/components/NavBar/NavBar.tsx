import React, { useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ProfileButton from "../../features/user/components/ProfileButton";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";
import SideBarMenu from "../sidebar/SideBarMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NotificationUser from "../../features/user/components/NotificationUser";
import { NotifcationsSSEResponseI } from "../../features/user/types/user";
import ChatButton from "../../features/chat/componentes/ChatButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./styles.css";



const NavBar: React.FC = () => {

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userIdAuth = useSelector((state: RootState) => state.auth.userId);

  const route = useNavigate();
  const [atTop, setAtTop] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState("");
  const inputRef = useRef<HTMLInputElement>(null); // <- to dinamic search button

  const [notificationsResponse, setNotificationsResponse] = useState<NotifcationsSSEResponseI>();

  // Detect scroll to handle "atTop" state
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.pageYOffset <= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // useeffect to connect SSE server
  useEffect(() => {
    if (!userIdAuth) return; // no user, no SSE

    const sse = new EventSource(`http://192.168.100.3:8080/api/push-notifications/${userIdAuth}`);

    sse.addEventListener("user-list-event", (event) => {
      const data = JSON.parse(event.data);
      setNotificationsResponse(data);
    });

    sse.onerror = () => sse.close();

    return () => sse.close();
  }, [userIdAuth]);


  const handleSearch = () => {
    if (searchQuery.trim()) {
      route(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClick = () => {

    if (!isOpen) {
      inputRef.current?.focus();
    }
    setIsOpen(!Boolean(isOpen) ? "open" : "");

    // when user need to search and there are a string query
    if(isOpen && searchQuery !== ""){
      handleSearch();
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
          className={`w-full text-gray-700 bg-white h-16 fixed top-0 z-40 transition-all ${!atTop ? "bg-black shadow-lg" : ""
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
              <div
                // onSubmit={handleSearch}
                className="wrapper bg-slate-100 rounded-full">
                <div className={`search ${isOpen}`}>
                  <input
                    ref={inputRef}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find something"
                    type="text"
                                        onKeyDown={(e) => {
                      if(e.key === "Enter"){
                        handleSearch();
                      }
                    }}
                  />
                  <button
                    onClick={handleClick}
                    // type="submit"
                    className={`nav-button uil uil-${isOpen ? "multiply" : "search"} `}
                  >
                    <SearchIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mr-2 lg:mr-0">
              {accessToken ? (
                <>
                  <Link
                    to={`/create-blog`}
                    type="button"
                    className="hidden md:inline-block h-10 w-10 py-1.5 rounded-full font-medium text-sm text-center hover:bg-slate-100"
                  >
                    <AddCircleOutlineIcon sx={{ fontSize: 28 }} />
                  </Link>
                  
                  <div className="hidden md:block">
                    <ChatButton />
                  </div>

                  <NotificationUser
                    notificationsResponse={notificationsResponse}
                  />
                  <ProfileButton />

                </>
              ) : (
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
          className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transition-transform transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
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
          className={`fixed inset-0 bg-black transition-opacity ${menuOpen ? "opacity-50" : "opacity-0 pointer-events-none h-full"
            } z-40 duration-300 ease-in-out`}
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}

export default NavBar;
