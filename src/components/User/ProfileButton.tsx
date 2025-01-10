import { useState, useRef, useEffect } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const ProfileButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Cierra el menú al hacer clic fuera
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Agregar evento al documento
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón del perfil */}
      <img
        alt="User Avatar"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
        className="relative inline-block h-12 w-12 cursor-pointer rounded-full object-cover"
        onClick={toggleMenu}
      />

      {/* Menú desplegable */}
      {isMenuOpen && (
       <ul
       role="menu"
       data-popover="profile-menu"
       data-popover-placement="bottom"
       className="absolute right-1 top-14 z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
     >
       <button
        
         role="menuitem"
         className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
       >
            <AccountCircleOutlinedIcon fontSize="small"/>
            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                My Profile
            </p>
       </button>
       <button

         role="menuitem"
         className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
       >
            <SettingsOutlinedIcon fontSize="small" />
            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                Edit Profile
            </p>
       </button>
       <button
         role="menuitem"
         className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
       >
            <DashboardOutlinedIcon fontSize="small"/>
            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                Dahsboard
            </p>
       </button>
       <button
         role="menuitem"
         className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
       >
            <AddCircleOutlineOutlinedIcon fontSize="small"/>
            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                Create Blog
            </p>
       </button>
       <button
         role="menuitem"
         className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
       >
            <HelpOutlineOutlinedIcon fontSize="small"/>
            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                Help
            </p>
       </button>
       <hr className="my-2 border-blue-gray-50"  role="menuitem" />
       <button
         role="menuitem"
         className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
       >
            <LoginOutlinedIcon /> 
            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                Sign Out
            </p>
       </button>
     </ul>
      )}
    </div>
  );
};

export default ProfileButton;
