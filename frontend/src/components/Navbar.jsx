import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
          {/* Logo */}
          <Link to="/">
            <img
              src="/netflix-logo.png"
              alt="Netflix logo"
              className="w-32 sm:w-40"
            />
          </Link>

          {/* Desktop navbar items */}
          <div className="hidden sm:flex gap-4 items-center">
            <Link
              to="/"
              className="hover:opacity-70 hover:transition-all"
              onClick={() => setContentType("movie")}
            >
              Movies
            </Link>
            <Link
              to="/"
              className="hover:opacity-70 hover:transition-all"
              onClick={() => setContentType("tv")}
            >
              TV Shows
            </Link>
            <Link
              to="/history"
              className="hover:opacity-70 hover:transition-all"
            >
              Search History
            </Link>
          </div>
        </div>

        <div className="flex gap-4 items-center z-50">
          <Link to="/search">
            <Search className="size-6 cursor-pointer" />
          </Link>
          <img
            src={user.image}
            alt="User Avatar"
            className="h-8 rounded cursor-pointer"
          />
          <LogOut className="size-6 cursor-pointer" onClick={() => logout()} />
          <div className="sm:hidden ">
            <Menu
              className="size-6 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>

        {/* Mobile navbar items */}
        {isMobileMenuOpen && (
          <div className="w-full sm:hidden mt-8 z-50 bg-black border rounded border-gray-800">
            <Link
              to="/"
              className="block hover:opacity-70 hover:transition-all p-2"
              onClick={toggleMobileMenu}
            >
              Movies
            </Link>
            <Link
              to="/"
              className="block hover:opacity-70 hover:transition-all p-2"
              onClick={toggleMobileMenu}
            >
              TV Shows
            </Link>
            <Link
              to="/history"
              className="block hover:opacity-70 hover:transition-all p-2"
              onClick={toggleMobileMenu}
            >
              Search History
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
