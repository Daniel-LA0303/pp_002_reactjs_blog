import React, { useState } from "react";

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
      <div className={` bg-slate-500`}>
        <div
          className={`w-full text-gray-700 bg-white h-16 fixed top-0 z-40 transition-all ${
            !atTop ? "bg-black shadow-lg" : ""
          }`}
        >
          <div className="flex flex-col max-w-screen-xl px-2 mx-auto md:items-center md:justify-between md:flex-row bg-slate-500">
            <div className="p-4 flex flex-row items-center justify-between">
              <a
                href="#"
                className="tracking-widest rounded-lg focus:outline-none focus:shadow-outline"
              >
                <svg
                  className="w-8 h-8 text-purple-600"
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>TailwindCSS</title>
                  <path
                    fill="currentColor"
                    d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
                  ></path>
                </svg>
              </a>
              <button
                className=" rounded-lg focus:outline-none focus:shadow-outline"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="text-lg text-primary">
                  <i className="fas fa-bell"></i>
                </span>
              </button>
            </div>

            {/* Mobile Menu */}
            <nav
              className={`flex-col flex-grow pb-4 ${
                menuOpen ? "flex" : "hidden"
              } bg-white shadow-lg rounded-b`}
            >
              <a
                className="block px-4 py-2 mt-2 bg-transparent rounded-lg text-sm font-semibold hover:text-gray-900 hover:bg-gray-200"
                href="#"
              >
                Notificación 1
              </a>
              <a
                className="block px-4 py-2 mt-2 bg-transparent rounded-lg text-sm font-semibold hover:text-gray-900 hover:bg-gray-200"
                href="#"
              >
                Notificación 2
              </a>
            </nav>

            {/* Desktop Menu */}
            <nav className="hidden md:flex md:flex-row md:justify-end">
              <a
                className="flex items-center px-3 py-1 mt-2 text-lg font-semibold text-primary rounded-lg hover:text-gray-900"
                href="#"
              >
                <i className="fas fa-envelope"></i>
              </a>
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="flex items-center px-3 py-1 mt-2 text-sm font-semibold text-primary rounded-lg hover:bg-gray-200"
                >
                  <i className="fas fa-bell"></i>
                </button>
                {notificationOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md">
                    <a
                      className="block px-4 py-2 mt-2 text-sm font-semibold hover:bg-gray-200"
                      href="#"
                    >
                      Notificación 1
                    </a>
                    <a
                      className="block px-4 py-2 mt-2 text-sm font-semibold hover:bg-gray-200"
                      href="#"
                    >
                      Notificación 2
                    </a>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center px-1 py-1 mt-2 text-sm font-semibold rounded-full hover:bg-gray-200"
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/12.jpg"
                    className="w-auto h-6 rounded-full"
                    alt="User"
                  />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md">
                    <a
                      className="block px-4 py-2 mt-2 text-sm font-semibold hover:bg-gray-200"
                      href="#"
                    >
                      Perfil
                    </a>
                    <a
                      className="block px-4 py-2 mt-2 text-sm font-semibold hover:bg-gray-200"
                      href="#"
                    >
                      Configuración
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:pl-4 lg:pl-10 md:pr-4 mt-20">
        <div className="w-full rounded overflow-hidden shadow-lg bg-white p-6">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...
          </p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
