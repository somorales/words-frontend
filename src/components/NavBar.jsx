import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import user from "../assets/images/user.png";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { isLoggedIn, authenticateUser, loggerUserName } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/");
  };
  return (
    <header>
      <nav className="bg-white px-6 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <span className="sr-only">logo</span>
            <img alt="" src={logo} className=" w-[4.5rem] h-auto" />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="text-[#E46D45] font-medium">Hi, {loggerUserName}</div>
          <div className=" w-8 h-8 rounded-full flex items-center justify-center ml-1">
            {/* <img alt="" src={user} className=" w-24 h-auto" /> */}
            {isLoggedIn && (
              <Menu as="div" className="relative">
                <div className="group">
                  <MenuButton className="-my-1 ml-auto flex h-8 w-8 items-center justify-center rounded-lg lg:ml-4">
                    <img alt="" src={user} className=" w-24 h-auto" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-[#000000] data-[focus]:bg-[#efe8db]"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
