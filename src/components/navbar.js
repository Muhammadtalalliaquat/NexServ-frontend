"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";
import { GoHome } from "react-icons/go";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RiContactsLine } from "react-icons/ri";
import { RiFunctionAddLine } from "react-icons/ri";

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
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-[#f2f4fd] px-4 py-3 flex items-center justify-between shadow-sm ${
        isScrolled ? "shadow-md bg-white" : ""
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span
          className={`text-xl sm:text-2xl font-medium ${
            isScrolled ? "text-gray-800" : "text-gray-900"
          }`}
        >
          Nex<span className="font-extrabold text-blue-400">Serv</span>
        </span>
      </div>

      {/* Menu (Desktop) */}
      <ul className="hidden sm:flex items-center gap-6">
        {pathname !== "/home" && (
          <li
            onClick={handleNavigate}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition"
          >
            <GoHome className="w-4 h-4" />
            Home
          </li>
        )}
        {pathname !== "/service" && (
          <li className="flex items-center gap-2 hover:text-blue-500 transition">
            <Link href="/service" className="flex items-center gap-2">
              {isMenuOpen && <Package className="w-4 h-4" />}
              Service
            </Link>
          </li>
        )}
        {pathname !== "/Price" && (
          <li className="flex items-center gap-2 hover:text-blue-500 transition">
            <Link href="/Price" className="flex items-center gap-2">
              {isMenuOpen && <LiaShoppingBagSolid className="w-4 h-4" />}
              Price
            </Link>
          </li>
        )}
        {pathname !== "/contact" && (
          <li className="flex items-center gap-2 hover:text-blue-500 transition">
            <Link href="/contact" className="flex items-center gap-2">
              {isMenuOpen && <RiContactsLine className="w-4 h-4" />}
              Contact
            </Link>
          </li>
        )}
      </ul>

      {/* Actions */}
      <div className="hidden sm:flex items-center gap-3">
        <button
          onClick={() => router.push("/login")}
          className="bg-white px-5 py-1 rounded-md border border-gray-200 text-gray-900 text-sm shadow-sm hover:bg-blue-500 hover:text-white transition"
        >
          Sign in
        </button>
        {user?.isAdmin && pathname !== "/add-service" && (
          <button
            onClick={() => router.push("/add-service")}
            className="bg-white px-5 py-1 rounded-md border border-gray-200 text-gray-900 text-sm shadow-sm hover:bg-pink-500 hover:text-white transition flex items-center gap-2"
          >
            <RiFunctionAddLine className="w-4 h-4" />
            Service
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={toggleMenubar}
          aria-label="Toggle menu"
          className="p-2 rounded-md hover:bg-gray-200 transition"
        >
          <Image
            src="https://i.postimg.cc/FRtqmFnP/more.png"
            alt="Hamburger Icon"
            width={20}
            height={20}
            className={`${!isMenuOpen ? "block" : "hidden"}`}
          />
          <Image
            src="https://i.postimg.cc/rsftGmBg/close.png"
            alt="Close Icon"
            width={20}
            height={20}
            className={`${isMenuOpen ? "block" : "hidden"}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-3 py-3 px-4 sm:hidden">
          {pathname !== "/home" && (
            <li
              onClick={handleNavigate}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition"
            >
              <GoHome className="w-4 h-4" />
              Home
            </li>
          )}
          {pathname !== "/service" && (
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <Link href="/service" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Service
              </Link>
            </li>
          )}
          {pathname !== "/Price" && (
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <Link href="/Price" className="flex items-center gap-2">
                <LiaShoppingBagSolid className="w-4 h-4" />
                Price
              </Link>
            </li>
          )}
          {pathname !== "/contact" && (
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <Link href="/contact" className="flex items-center gap-2">
                <RiContactsLine className="w-4 h-4" />
                Contact
              </Link>
            </li>
          )}
          {user?.isAdmin && pathname !== "/add-service" && (
            <li>
              <Link
                href="/add-service"
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition"
              >
                <RiFunctionAddLine className="w-4 h-4 text-blue-750" />
                Service
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/login"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign in
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
