"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SocialIcon } from 'react-social-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import {Link} from "@heroui/react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);


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
 <div className="hidden lg:block">
                {/* Top Bar */}
      <div className="relative z-10 w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-2 border-b">
          {/* Logo (Left) */}
          <div className="flex gap-4">
            <img className="w-9 h-9" src="./images/logo.png" alt="" />
            <h1 className="mt-1 text-xl font-bold tracking-wide text-custom-green">Ceylon Essence</h1>
            </div>

          {/* Middle Text */}
          <div className="absolute w-1/3 transform -translate-x-1/2 left-1/2">
            <div className="relative flex gap-2">
                <h1 className="font-bold text-center xl:tracking-widest text-md text-custom-green/90 xl:text-lg">Crafted by Nature, </h1>
                <h1 className="font-bold text-center xl:tracking-widest text-md text-custom-brown/90 xl:text-lg">Perfected by Heritage...</h1>
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
          isSticky ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-white/60 mt-14"
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
</div>

{/* Mobile Sidebar */}
<div className="relative z-10 w-full bg-white shadow-md lg:hidden"> 
        {/* Hamburger for mobile */}
        <div className="flex justify-between px-6 py-2 border-b items-right lg:hidden">
        <div className="flex gap-4">
            <img className="w-7 h-7" src="./images/logo.png" alt="" />
            <h1 className="mt-1 text-xl font-bold tracking-wide text-custom-green">Ceylon Essence</h1>
            </div>

            
              <FaBars
                onClick={() => setIsMobileNavOpen(true)}
                className="mt-1 text-2xl cursor-pointer text-custom-green"
              />
        </div>

            
        <div
        className={`fixed top-0 left-0 w-[250px] h-full bg-custom-green/90 transform transition-all duration-300 ease-in-out z-30 ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-white">Menu</h1>
          <FaTimes
            onClick={() => setIsMobileNavOpen(false)}
            className="text-2xl text-white cursor-pointer"
          />
        </div>
        <ul className="flex flex-col gap-6 p-4 text-white">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.url}
                onClick={() => setActiveLink(item.url)}
                className={`font-semibold ${
                  activeLink === item.url ? "text-yellow-400" : "hover:text-yellow-300"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        
      {/* Social Icons */}
      <div className="flex items-center gap-2 ml-12 mt-44">
              <SocialIcon url="https://www.facebook.com" bgColor="custom-green" fgColor="white" target="_blank" style={{ width: '30px', height: '30px' }} />
              <SocialIcon url="https://www.tiktok.com" bgColor="custom-green" fgColor="white" target="_blank" style={{ width: '30px', height: '30px' }}/>
              <SocialIcon url="https://www.youtube.com" bgColor="custom-green/90" fgColor="white" target="_blank" style={{ width: '30px', height: '30px' }}/>
              <SocialIcon url="https://www.linkedin.com" bgColor="custom-green/90" fgColor="white" target="_blank" style={{ width: '30px', height: '30px' }}/>
              {/* <SocialIcon url="tel:+1234567890" bgColor="white" fgColor="green" target="_blank" style={{ width: '30px', height: '30px' }}/> */}
              
          </div>
      </div>
</div>
    </>
  );
};

export default Navbar;
