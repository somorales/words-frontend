import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export default function NavBar() {
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/");
  };
  return (
    <header>
      <nav className="bg-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/">
            <span className="sr-only">logo</span>
            <img alt="" src={logo} className="h-8 xl:h-28 w-auto" />
          </Link>
          <div className="flex flex-row justify-between gap-8 text-xl">
            <Link
              to="/about"
              className="text-[#065471] hover:text-[#053E53] hover:font-bold"
            >
              About
            </Link>

            <Link className="text-[#065471] hover:text-[#053E53] hover:font-bold">
              profile
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-[#000000] data-[focus]:bg-[#efe8db]"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
