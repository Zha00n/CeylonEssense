"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaGlobe } from "react-icons/fa";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("/");


  const navItems = [
    { name: "Home", url: "/" },
    { name: "Our Products", url: "/products" },
    { name: "About Us", url: "/about" },
    { name: "Resource Center", url: "/resourceCenter" },
    { name: "Contact Us", url: "/contact" },
  ];

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 5); // Stick after scrolling 100px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="relative z-10 w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-2 border-b">
          {/* Logo (Left) */}
          <div className="text-lg font-bold">LOGO</div>

          {/* Search Bar (Centered) */}
          <div className="absolute w-1/3 transform -translate-x-1/2 left-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Products.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <FaSearch className="absolute text-gray-500 top-3 right-3" />
            </div>
          </div>

          {/* Buttons (Right) */}
          <div className="flex items-center gap-4">
            <button className="w-[80px] h-[35px] border-2 border-green-500 rounded-full text-green-500  hover:bg-green-500 hover:text-white">Login</button>
            <button className="w-[80px] h-[35px] border-2 border-green-500 bg-green-500 text-white rounded-full hover:bg-white  hover:text-green-500">Sign-up</button>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaGlobe />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Navigation */}
      <div
        className={`fixed top-0 left-0 w-full flex justify-center gap-6 py-2 transition-all ${
          isSticky ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-white/60 mt-12"
        } z-20`}
      >

        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.url}
            onClick={() => setActiveLink(item.url)} // Update active link on click
            className={`px-3 py-1 text-green-600 font-semibold ${
              activeLink === item.url
                ? "border-b-2 border-green-600"
                : "hover:border-b-2 hover:border-green-400"
            }`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
