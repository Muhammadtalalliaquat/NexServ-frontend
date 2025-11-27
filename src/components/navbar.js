"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { TiDeleteOutline } from "react-icons/ti";
import { GoHome } from "react-icons/go";
import { GrBusinessService } from "react-icons/gr";
import { RiContactsLine } from "react-icons/ri";
import { RiFunctionAddLine } from "react-icons/ri";
import { FaMicroblog } from "react-icons/fa";
import { LuAlignRight } from "react-icons/lu";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(storedUser);
    setLoadingUser(false);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenubar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigate = () => {
    if (
      pathname === "/add-service" ||
      pathname === "/contact" ||
      pathname.startsWith("/add-service")
    ) {
      router.push("/home");
    }
  };
  if (loadingUser) return null;
  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 border-b border-pink-600 transition-all duration-300 bg-[#f2f4fd] px-4 py-3 flex items-center justify-between shadow-sm ${
        isScrolled ? "shadow-md bg-white" : ""
      } relative`}
    >
      <div className="w-full container mx-auto flex items-center justify-between pl-5 pr-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className={`text-xl sm:text-2xl font-medium ${
              isScrolled ? "text-gray-800" : "text-blue-600"
            }`}
          >
            Nex<span className="font-extrabold text-pink-600">Serv</span>
          </span>
        </div>

        {/* Menu (Desktop) */}
        <ul className="hidden sm:flex items-center gap-10">
          {pathname !== "/home" && (
            <li
              onClick={handleNavigate}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 
             hover:rounded-[5px] hover:bg-blue-100 hover:text-blue-600 p-1 md:pl-1 md:pr-1 lg:pl-2 lg:pr-2 transition"
            >
              {/* <GoHome className="w-4 h-4" /> */}
              Home
            </li>
          )}
          {pathname !== "/service" && (
            <li
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 
             hover:rounded-[5px] hover:bg-blue-100 hover:text-blue-600 p-1 md:pl-1 md:pr-1 lg:pl-2 lg:pr-2 transition"
            >
              <Link href="/service" className="flex items-center gap-2">
                {/* {isMenuOpen && <GrBusinessService className="w-4 h-4" />} */}
                Service
              </Link>
            </li>
          )}
          {pathname !== "/Blog" && (
            <li
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 
             hover:rounded-[5px] hover:bg-blue-100 hover:text-blue-600 p-1 md:pl-1 md:pr-1 lg:pl-2 lg:pr-2 transition"
            >
              <Link href="/Blog" className="flex items-center gap-2">
                {/* {isMenuOpen && <FaMicroblog className="w-4 h-4" />} */}
                Blog
              </Link>
            </li>
          )}
          {pathname !== "/contact" && (
            <li
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 
             hover:rounded-[5px] hover:bg-blue-100 hover:text-blue-600 p-1 md:pl-1 md:pr-1 lg:pl-2 lg:pr-2 transition"
            >
              <Link href="/contact" className="flex items-center gap-2">
                {/* {isMenuOpen && <RiContactsLine className="w-4 h-4" />} */}
                Contact
              </Link>
            </li>
          )}
        </ul>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => router.push("/login")}
            className="bg-white px-5 py-1 font-bold rounded-md border border-gray-200 text-gray-900 text-sm shadow-sm hover:bg-blue-600 hover:text-white transition"
          >
            Sign in
          </button>
          {user?.isAdmin && pathname !== "/add-service" && (
            <button
              onClick={() => router.push("/add-service")}
              title="Add Service"
              className="bg-white px-5 py-1 font-bold rounded-md border border-gray-200 text-gray-900 text-sm shadow-sm hover:bg-pink-600 hover:text-white transition flex items-center gap-2"
            >
              <RiFunctionAddLine className="w-4 h-4" />
              Service
            </button>
          )}
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={toggleMenubar}
          aria-label="Toggle menu"
          className="p-2 rounded-md hover:bg-gray-200 transition"
        >
          <LuAlignRight
            size={25}
            className={`${!isMenuOpen ? "block" : "hidden"}`}
          />

          <TiDeleteOutline
            size={25}
            className={`${isMenuOpen ? "block" : "hidden"}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full z-50 overflow-hidden transition-all duration-300 ease-in-out sm:hidden shadow-md
      ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
    `}
        style={{ background: "#ffffffff" }}
      >
        <ul className="flex flex-col gap-4 py-5 px-6 divide-y divide-gray-200">
          {pathname !== "/home" && (
            <li
              onClick={handleNavigate}
              className="flex items-center gap-2 text-lg font-medium cursor-pointer pb-5 hover:text-blue-500 transition"
            >
              <GoHome className="w-5 h-5" />
              Home
            </li>
          )}
          {pathname !== "/service" && (
            <li className="flex items-center gap-2 text-lg font-medium pb-5 hover:text-blue-500 transition">
              <Link href="/service" className="flex items-center gap-2">
                <GrBusinessService className="w-5 h-5" />
                Services
              </Link>
            </li>
          )}
          {pathname !== "/Blog" && (
            <li className="flex items-center gap-2 text-lg font-medium pb-5 hover:text-blue-500 transition">
              <Link href="/Blog" className="flex items-center gap-2">
                <FaMicroblog className="w-5 h-5" />
                Blog
              </Link>
            </li>
          )}
          {pathname !== "/contact" && (
            <li className="flex items-center gap-2 text-lg font-medium pb-5 hover:text-blue-500 transition">
              <Link href="/contact" className="flex items-center gap-2">
                <RiContactsLine className="w-5 h-5" />
                Contact
              </Link>
            </li>
          )}
          {user?.isAdmin && pathname !== "/add-service" && (
            <li>
              <Link
                href="/add-service"
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-pink-600 hover:bg-pink-700 hover:text-white bg-gray-50 transition"
              >
                <RiFunctionAddLine className="w-5 h-5 text-blue-750" />
                Service
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/login"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition block text-center"
            >
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
