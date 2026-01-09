"use client";

import { useState, useEffect, startTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { TiDeleteOutline } from "react-icons/ti";
import { GoHome } from "react-icons/go";
import { GrBusinessService } from "react-icons/gr";
import { RiContactsLine } from "react-icons/ri";
import { RiFunctionAddLine } from "react-icons/ri";
import { FaMicroblog } from "react-icons/fa";
import { LuAlignRight } from "react-icons/lu";
import { clearUser } from "@/store/features/userSlice";
import { FaRegUser } from "react-icons/fa";
import { LayoutDashboard, LogOut, ChevronRight } from "lucide-react";

function Navbar({ onScroll, sections }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/home";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    startTransition(() => {
      setUser(storedUser);
      setLoadingUser(false);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenubar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logOut = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/get-started");
  };

  // const handleNav = (section) => {
  //   setSelected(section);

  //   if (isHome && typeof onScroll === "function") {
  //     const ref = sections?.[section];
  //     if (!ref?.current) return;
  //     onScroll(ref, section);
  //     return;
  //   }

  //   router.push(`/home#${section}`);
  // };

  // handleNav is declared before menuItems and defers access to ref.current
  const handleNav = (section) => {
    if (selected === section) return;
    setSelected(section);
    // 🟢 Home page → smooth scroll (defer reading ref.current to avoid accessing refs during render)
    if (isHome && typeof onScroll === "function") {
      const ref = sections?.[section];
      if (!ref) {
        setIsMenuOpen(false);
        return;
      }

      // Defer access to ref.current to the next frame to avoid reading refs during render
      requestAnimationFrame(() => {
        if (!ref.current) return;
        onScroll(ref, section);
      });

      setIsMenuOpen(false);
      return;
    }

    // 🔵 Other pages → redirect with hash
    setIsMenuOpen(false);
    // router.push(`/home`);
    router.push(`/home#${section}`);
  };

  const handleBlogClick = () => {
    if (pathname === "/home") {
      handleNav("blogs");
    } else {
      router.push("/blogs");
    }
  };

  const profileMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    //  { icon: User, label: "My Profile", href: "/profile" },
    //  { icon: Settings, label: "Settings", href: "/settings" },
    //  { icon: HelpCircle, label: "Help & Support", href: "/help" },
  ];

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: GoHome,
      href: "/home",
      show: pathname !== "/home",
      // onClick: () => {
      //   setSelected("home");
      //   setIsMenuOpen(false);
      // },
    },
    {
      id: "services",
      label: "Services",
      icon: GrBusinessService,
      // onClick: () => handleNav("services"),
    },
    {
      id: "blogs",
      label: "Blog",
      icon: FaMicroblog,
      // onClick: () => handleNav("blogs"),
    },
    {
      id: "contact",
      label: "Contact",
      icon: RiContactsLine,
      // onClick: () => handleNav("contact"),
    },
  ];

  if (loadingUser) return null;
  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 px-4 py-2 sm:py-0 flex items-center justify-between transition-all duration-300 shadow-sm bg-white
      ${isScrolled ? "backdrop-blur-md bg-white/90 shadow-md" : ""}`}
    >
      <div className="w-full container mx-auto flex items-center justify-between cursor-pointer pl-5 pr-5">
        <div
          className="flex items-center gap-3"
          onClick={() => window.location.reload()}
        >
          <span
            className={`text-xl sm:text-2xl font-medium ${
              isScrolled ? "text-blue-600" : "text-blue-600"
            }`}
          >
            Nex<span className="font-extrabold text-pink-600">Serv</span>
          </span>
        </div>

        <ul className="hidden sm:flex items-center gap-2">
          {pathname !== "/home" && (
            <li>
              <Link
                href="/home"
                className="flex items-center gap-2 px-4 py-3 text-gray-700 
                   hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200
                   font-medium text-sm"
              >
                Home
              </Link>
            </li>
          )}

          <li>
            <button
              onClick={() => handleNav("services")}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200
        ${
          selected === "services"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        }`}
            >
              Services
            </button>
          </li>

          {pathname !== "/blogs" && (
            <li>
              <button
                // onClick={() => handleNav("blogs")}
                onClick={handleBlogClick}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200
          ${
            selected === "blogs"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          }`}
              >
                Blogs
              </button>
            </li>
          )}

          <li>
            <button
              onClick={() => handleNav("contact")}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200
        ${
          selected === "contact"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        }`}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* <ul className="hidden sm:flex items-center gap-10">
          {pathname !== "/home" && (
            <li
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 px-3 py-2
             text-gray-800 hover:bg-blue-100 hover:text-blue-600 p-1 md:pl-1 md:pr-1 lg:pl-2 lg:pr-2 transition"
            >
              <Link href="/home" className="flex items-center gap-2">
                Home
              </Link>
            </li>
          )}
          <li
            onClick={() => handleNav("services")}
            className={`cursor-pointer px-3 py-2 transition-all duration-300  md:pl-1 md:pr-1 lg:pl-2 lg:pr-2
          ${
            selected === "services"
              ? "bg-blue-600 text-white"
              : "text-gray-800 hover:bg-blue-100 hover:text-blue-600"
          }
          `}
          >
            Services
          </li>
          {pathname !== "/blogs" && (
            <li
              onClick={() => handleNav("blogs")}
              className={`cursor-pointer px-3 py-2 transition-all duration-300  md:pl-1 md:pr-1 lg:pl-2 lg:pr-2
    ${
      selected === "blogs"
        ? "bg-blue-600 text-white"
        : "text-gray-800 hover:bg-blue-100 hover:text-blue-600"
    }
  `}
            >
              Blog
            </li>
          )}
          <li
            onClick={() => handleNav("contact")}
            className={`cursor-pointer px-3 py-2 transition-all duration-300 md:pl-1 md:pr-1 lg:pl-2 lg:pr-2
    ${
      selected === "contact"
        ? "bg-blue-600 text-white"
        : "text-gray-800 hover:bg-blue-100 hover:text-blue-600"
    }
  `}
          >
            Contact
          </li>
        </ul> */}

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {!user && (
            <button
              onClick={() => router.push("/login")}
              className="bg-white px-4 py-2 text-left  w-full border border-blue-600 text-blue-900 font-bold text-sm shadow-sm hover:bg-blue-600 hover:text-white transition"
            >
              Sign in
            </button>
          )}
          {user?.isAdmin && pathname !== "/add-service" && (
            <button
              onClick={() => router.push("/add-service")}
              title="Add Service"
              className="bg-white px-5 py-1 font-bold rounded-md border border-pink-600 text-gray-900 text-sm shadow-sm hover:bg-pink-600 hover:text-white transition flex items-center gap-2"
            >
              <RiFunctionAddLine className="w-4 h-4" />
              Service
            </button>
          )}

          {user && (
            <div className="relative inline-block text-left flex items-center justify-center">
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white text-sm sm:text-base font-semibold border border-gray-300 rounded-full shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <FaRegUser />
                </button>

                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute right-0 mt-2 bg-gradient-to-br from-slate-700 via-purple-900 to-slate-700 border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 overflow-hidden animate-fadeIn">
                    {/* User Info Section */}
                    <div className="relative p-6 bg-gradient-to-br from-pink-500/20 to-purple-600/20 border-b border-white/10">
                      {/* Decorative gradient */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-30"></div>

                      <div className="relative flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative group">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {user?.userName.slice(0, 1).toUpperCase()}
                          </div>
                          {/* Online indicator */}
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white/20 rounded-full"></div>
                        </div>

                        {/* User Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-lg mb-1 truncate">
                            {user.userName}
                          </h3>
                          <p className="text-gray-300 text-sm truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {profileMenuItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => router.push(item.href)}
                            className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300 mb-1"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-purple-600 transition-all duration-300">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="flex-1 text-left font-medium">
                              {item.label}
                            </span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <div className="mx-4 border-t border-white/10"></div>

                    {/* Sign Out Button */}
                    <div className="p-2">
                      {user ? (
                        <button
                          onClick={logOut}
                          className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-500/20 transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500 transition-all duration-300">
                            <LogOut className="w-5 h-5" />
                          </div>
                          <span className="flex-1 text-left font-medium">
                            Sign Out
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => router.push("/login")}
                          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                        >
                          Sign In
                        </button>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 bg-white/5 border-t border-white/10">
                      <p className="text-xs text-gray-400 text-center">
                        Version 2.0.1 •{" "}
                        <span className="text-purple-400 cursor-pointer hover:underline">
                          Privacy
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <style jsx>{`
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                      transform: translateY(-10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                  }
                `}</style>
              </div>
            </div>
            // <div className="relative inline-block text-left">
            //   <button
            //     onClick={() => setOpen(!open)}
            //     className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 bg-white text-gray-900 text-sm sm:text-base font-semibold border border-gray-300 rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            //   >
            //     <FaRegUser />
            //   </button>

            //   {open && (
            //     <div className="absolute right-0 mt-2 w-64 sm:w-85 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden animate-fadeIn">
            //       {/* User Info */}
            //       <div className="flex p-3 gap-3 border-b border-gray-100">
            //         <div className="w-12 h-12 bg-pink-100 text-pink-600 flex items-center justify-center rounded-full text-md font-bold">
            //           {user?.userName.slice(0, 1).toUpperCase()}
            //         </div>
            //         <div className="flex flex-col">
            //           <h3 className="text-gray-900 font-semibold text-base sm:text-lg">
            //             {user.userName}
            //           </h3>
            //           <p className="text-gray-500 text-sm sm:text-base break-all break-all">
            //             {user.email}
            //           </p>
            //         </div>
            //       </div>

            //       {/* Menu Links */}
            //       <div className="flex flex-col divide-y divide-gray-100">
            //         <Link
            //           href={"/dashboard"}
            //           className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-left w-full transition text-sm sm:text-base"
            //         >
            //           Dashboard
            //         </Link>

            //         {user ? (
            //           <button
            //             onClick={logOut}
            //             className="bg-white px-4 py-2 text-left w-full text-gray-900 text-sm shadow-sm hover:bg-red-300 hover:text-white transition"
            //           >
            //             Sign out
            //           </button>
            //         ) : (
            //           <button
            //             onClick={() => router.push("/login")}
            //             className="bg-white px-4 py-2 text-left w-full text-gray-900 text-sm shadow-sm hover:bg-blue-600 hover:text-white transition"
            //           >
            //             Sign in
            //           </button>
            //         )}
            //       </div>
            //     </div>
            //   )}
            // </div>
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
            className={`${!isMenuOpen ? "block" : "hidden"} text-gray-800`}
          />

          <TiDeleteOutline
            size={25}
            className={`${isMenuOpen ? "block" : "hidden"} text-gray-800`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full z-50 overflow-hidden transition-all duration-300 ease-in-out sm:hidden shadow-md
      ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
    `}
        style={{ background: "#ffffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col p-4">
          {menuItems.map((item) => {
            if (item.show === false) return null;

            const Icon = item.icon;
            const isActive = selected === item.id || pathname === item.href;

            const content = (
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            );

            const className = `
              flex items-center gap-3
              w-full px-4 py-3 pt-3 pb-3
              font-medium text-sm rounded-lg
              border-b border-gray-200
              transition-all duration-200
              cursor-pointer
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }
            `;

            return (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => {
                      setSelected(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={className}
                    // onClick={item.onClick}
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    className={className}
                    onClick={() => {
                      if (item.id === "blogs") {
                        handleBlogClick();
                      } else {
                        handleNav(item.id);
                      }
                      setIsMenuOpen(false);
                    }}
                    // onClick={() => handleNav(item.id)}
                    // onClick={item.onClick}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}

          {user?.isAdmin && pathname !== "/add-service" && (
            <li>
              <Link
                href="/add-service"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex items-center gap-3
                  w-full px-4 py-3 mt-3 mb-2 rounded-lg
                  font-medium text-sm
                  border border-pink-500
                  text-pink-600 hover:bg-pink-50
                  transition-all duration-200
                "
              >
                <RiFunctionAddLine className="w-5 h-5" />
                <span>Add Service</span>
              </Link>
            </li>
          )}

          {user && pathname !== "/dashboard" && (
            <li>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex items-center gap-3
                  w-full px-4 py-3 rounded-lg
                  font-medium text-sm
                  border border-gray-300
                  text-gray-700 hover:bg-gray-50
                  transition-all duration-200
                "
              >
                <span>Dashboard</span>
              </Link>
            </li>
          )}

          <li className="pt-2">
            {user ? (
              <button
                onClick={() => {
                  logOut();
                  setIsMenuOpen(false);
                }}
                className="
                  w-full px-4 py-3 rounded-lg
                  font-semibold text-sm
                  bg-red-500 text-white
                  hover:bg-red-600
                  transition-all duration-200
                  shadow-sm
                "
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push("/login");
                  setIsMenuOpen(false);
                }}
                className="
                  w-full px-4 py-3 rounded-lg
                  font-semibold text-sm
                  bg-blue-600 text-white
                  hover:bg-blue-700
                  transition-all duration-200
                  shadow-sm
                "
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>

      {/* <div
        className={`absolute top-full left-0 w-full z-50 overflow-hidden transition-all duration-300 ease-in-out sm:hidden shadow-md
      ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
    `}
        style={{ background: "#ffffffff" }}
      >
        <ul className="flex flex-col gap-4 py-5 px-6 divide-y divide-gray-200">
          {pathname !== "/home" && (
            <li className="flex items-center gap-2 text-gray-800 font-medium cursor-pointer pb-5 hover:text-blue-500 transition">
              <Link href="/home" className="flex items-center gap-2">
                <GoHome className="w-4 h-4" />
                Home
              </Link>
            </li>
          )}
          <li
            onClick={() => handleNav("services")}
            className="flex items-center gap-2 text-gray-800 font-medium pb-5 hover:text-blue-500 transition"
          >
            <GrBusinessService className="w-5 h-5" />
            Services
          </li>
          <li
            onClick={() => handleNav("blogs")}
            className="flex items-center gap-2 text-gray-800 font-medium pb-5 hover:text-blue-500 transition"
          >
            <FaMicroblog className="w-5 h-5" />
            Blog
          </li>
          <li
            onClick={() => handleNav("contact")}
            className="flex items-center gap-2 text-gray-800 font-medium pb-5 hover:text-blue-500 transition"
          >
            <Link href="/contact" className="flex items-center gap-2">
              <RiContactsLine className="w-5 h-5" />
              Contact
            </Link>
          </li>
          {user?.isAdmin && pathname !== "/add-service" && (
            <li>
              <Link
                href="/add-service"
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-pink-600 text-gray-800 hover:bg-pink-700 hover:text-white bg-gray-50 transition"
              >
                <RiFunctionAddLine className="w-5 h-5 text-blue-750" />
                Service
              </Link>
            </li>
          )}
          {user ? (
            <button
              onClick={logOut}
              className="px-4 py-2 font-bold rounded-md border border-red-400 text-sm shadow-sm bg-red-400 text-white transition"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition block text-center"
            >
              Sign in
            </button>
          )}
          {user && pathname !== "/dashbord" && (
            <li>
              <Link
                href="/dashbord"
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-pink-700 hover:text-white bg-gray-50 transition"
              >
                Dashbord
              </Link>
            </li>
          )}
        </ul>
      </div> */}
    </nav>
  );
}

export default Navbar;
