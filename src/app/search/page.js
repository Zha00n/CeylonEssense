"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaGlobe } from "react-icons/fa";
import { SocialIcon } from 'react-social-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import {Link} from "@heroui/react";

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
          <div className="flex gap-4">
            <img className="w-9 h-9" src="./images/logo.png" alt="" />
            <h1 className="mt-1 text-xl font-semibold text-custom-green">Ceylon Essence</h1>
            </div>

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
          <div className="flex items-center gap-2">
              <SocialIcon url="https://www.facebook.com" bgColor="white" fgColor="green" target="_blank" style={{ width: '40px', height: '40px' }} />
              <SocialIcon url="https://www.tiktok.com" bgColor="white" fgColor="green" target="_blank" style={{ width: '40px', height: '40px' }}/>
              <SocialIcon url="https://www.youtube.com" bgColor="white" fgColor="green" target="_blank" style={{ width: '40px', height: '40px' }}/>
              <SocialIcon url="https://www.linkedin.com" bgColor="white" fgColor="green" target="_blank" style={{ width: '40px', height: '40px' }}/>
              {/* <SocialIcon url="tel:+1234567890" bgColor="white" fgColor="green" target="_blank" style={{ width: '40px', height: '40px' }}/> */}
              <Link href="tel:+1234567890" target="_blank"><FontAwesomeIcon icon={faPhone} style={{ color: 'green', fontSize: '18px' }} /></Link>
              
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
