"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function About() {
  const bgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: bgRef,
    offset: ["start end", "end start"], 
  });

  // Create state to track window width for responsive adjustments
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust transforms based on the window width
  const x = useTransform(scrollYProgress, [0, 1], [
    windowWidth > 768 ? "0px" : "0px",   // You can change the values for smaller screens
    windowWidth > 768 ? "-500px" : "-200px",
  ]);
  const scale = useTransform(scrollYProgress, [0, 1], [
    windowWidth > 768 ? 1 : 2.0,  // For smaller screens, scale slightly more
    windowWidth > 768 ? 2 : 2.4,
  ]);

  return (
    <>
      <Navbar />
      <section className="h-screen">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="flex flex-col absolute inset-0 justify-center text-[50px] sm:text-[70px] lg:text-[100px] font-bold ml-20 md:ml-40 2xl:text-[150px]">
            <h1 className="text-custom-brown drop-shadow-2xl">What's</h1>
            <h1 className="text-custom-green drop-shadow-2xl">Ceylon Essence ?</h1>
          </div>
          <video
            className="object-cover w-full h-full"
            src="/images/sky3.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
      </section>


      <div ref={bgRef} className="relative overflow-hidden">

        <motion.img
          className="absolute inset-0 object-cover w-full h-full"
          src="/images/bg.jpg"
          alt="Background Image"
          style={{ x, scale }} 
        />
        <div className="absolute inset-0 bg-white/90"></div>

        <section className="py-[100px] md:h-screen relative">
          <div className="md:w-[50%] w-[75%] ml-auto mr-10 md:mr-40 text-justify mx-auto justify-end drop-shadow-2xl 2xl:w-[60%]">
            <h1 className="lg:text-[80px] text-[35px] md:text-[50px] inline text-custom-green/65 font-semibold 2xl:text-[140px]">We are</h1>
            <span className="md:text-[25px] text-[20px] lg:text-[30px] text-[#767676] font-thinbold 2xl:text-[40px]">
              {" "}
              a passionate team dedicated to bringing the finest Sri Lankan spices, herbs, and natural products to the world. With a rich heritage rooted in the vibrant landscapes of Sri Lanka, we specialize in curating products that showcase the authentic flavors, healing properties, and rich cultural history of the island.
            </span>
          </div>
        </section>

        <section className="md:pb-[100px] pb-[50px] md:h-screen relative ">
          <div className="inset-0 flex flex-col items-center justify-center gap-10 mx-auto text-justify lg:gap-20 drop-shadow-2xl lg:flex-row">
            <div className="lg:text-[70px] text-[40px] md:text-[50px] font-semibold lg:pb-20 2xl:text-[120px]">
              <h1 className="inline text-custom-green/65">What </h1>
              <span className="text-custom-green">We Do</span>
            </div>
            <p className="lg:text-[30px] text-[20px] md:text-[25px] text-[#767676] font-thinbold lg:w-[40%] w-[75%] 2xl:text-[40px]">
              Our commitment is simple: to offer you the purest, sustainably sourced products that capture the essence of Sri Lanka’s nature. From the bold warmth of Ceylon cinnamon to the soothing touch of local herbal remedies, we aim to connect you with the essence of Sri Lanka, no matter where you are in the world.
            </p>
          </div>
        </section>
      </div>

      <section className="md:pb-[100px] pb-[50px]">
        <div className="relative inset-0 flex items-center justify-center w-full">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="absolute w-[80%] text-justify mx-auto items-center justify-center">
            <h1 className="inline text-custom-green md:text-[20px] lg:text-[40px] text-[10px] font-semibold drop-shadow-2xl animate-pulse">
              At Ceylon Essence,
            </h1>
            <span className="lg:text-[30px] text-[10px] md:text-[20px] text-white drop-shadow-2xl animate-pulse">
              {" "}
              we understand the delicate art of harvesting and preserving these treasures. Through ethical practices, sustainable sourcing, and deep respect for our environment, we work closely with local farmers and artisans to bring you products that not only support local communities but also contribute to the protection of our natural heritage.
            </span>
          </div>
          <video
            className="object-cover w-full h-full "
            src="/images/about.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
      </section>
      <Footer />
    </>
  );
}