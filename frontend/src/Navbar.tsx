import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-neutral text-white shadow-md border-b-4 border-info">
      <div className="w-full px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-secondary tracking-wide">
          DATAFORGE
        </Link>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden focus:outline-none text-secondary"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="hover:text-secondary transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/contact"
            className="hover:text-secondary transition-colors duration-200"
          >
            Contact
          </Link>
          <button
            onClick={logout}
            className=" bg-red-500 hover:bg-secondary text-neutral font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-dark border-t border-info px-4 py-4 space-y-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-secondary transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-secondary transition-colors duration-200"
          >
            Contact
          </Link>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="w-full  bg-red-500 hover:bg-secondary text-neutral font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
