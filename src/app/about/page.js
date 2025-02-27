"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const bgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: bgRef,
    offset: ["start end", "end start"], 
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0px", "-500px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  return (
    <>
      <Navbar />
      <section className="h-screen">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="flex flex-col absolute inset-0 justify-center text-[100px] font-bold ml-40">
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

        <section className="py-[100px] h-screen relative">
          <div className="w-[50%] ml-auto mr-40 text-justify mx-auto justify-end drop-shadow-2xl">
            <h1 className="text-[80px] inline text-custom-green/65 font-semibold">We are</h1>
            <span className="text-[30px] text-[#767676] font-thinbold">
              {" "}
              a passionate team dedicated to bringing the finest Sri Lankan spices, herbs, and natural products to the world. With a rich heritage rooted in the vibrant landscapes of Sri Lanka, we specialize in curating products that showcase the authentic flavors, healing properties, and rich cultural history of the island.
            </span>
          </div>
        </section>

        <section className="py-[100px] h-screen relative">
          <div className="inset-0 flex items-center justify-center gap-20 mx-auto text-justify drop-shadow-2xl">
            <div className="text-[70px] font-semibold pb-20">
              <h1 className="inline text-custom-green/65">What </h1>
              <span className="text-custom-green">We Do</span>
            </div>
            <p className="text-[30px] text-[#767676] font-thinbold w-[40%]">
              Our commitment is simple: to offer you the purest, sustainably sourced products that capture the essence of Sri Lanka’s nature. From the bold warmth of Ceylon cinnamon to the soothing touch of local herbal remedies, we aim to connect you with the essence of Sri Lanka, no matter where you are in the world.
            </p>
          </div>
        </section>
      </div>

      <section className="pb-[100px]">
        <div className="relative inset-0 flex items-center justify-center w-full">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="absolute w-[80%] text-justify mx-auto items-center justify-center">
            <h1 className="inline text-custom-green text-[40px] font-semibold drop-shadow-2xl animate-pulse">
              At Ceylon Essence,
            </h1>
            <span className="text-[30px] text-white drop-shadow-2xl animate-pulse">
              {" "}
              we understand the delicate art of harvesting and preserving these treasures. Through ethical practices, sustainable sourcing, and deep respect for our environment, we work closely with local farmers and artisans to bring you products that not only support local communities but also contribute to the protection of our natural heritage.
            </span>
          </div>
          <video
            className="object-cover w-full h-full"
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
