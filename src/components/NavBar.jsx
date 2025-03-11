import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import user from "../assets/images/user.png";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export default function NavBar() {
  const { isLoggedIn, authenticateUser, loggerUserName } =
    useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/");
  };
  return (
    <header>
      <nav className="bg-white px-8 py-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <span className="sr-only">logo</span>
            <img alt="" src={logo} className=" w-24 h-auto" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-[#E46D45] font-medium">Hi, {loggerUserName}</div>
          <div className=" w-8 h-8 rounded-full flex items-center justify-center ">
            <img alt="" src={user} className=" w-24 h-auto" />
          </div>
        </div>
      </nav>
    </header>
  );
}
