"use client";
import React from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { Link } from "@heroui/react";

export default function Contact() {
  return (
    <>
      <Navbar />
      <section className="h-screen bg-custom-green">
        <div className="w-full h-full pt-[140px] pb-5 place-items-end">
          <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] 2xl:w-[60%] h-full rounded-tl-[50px] right-0 relative flex items-center">
            <p className="px-10 sm:px-5 md:px-10 lg:px-20 xl:px-36 text-custom-green text-[18px] sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[25px] 2xl:text-[40px] font-semibold text-justify mt-20 2xl:mt-64 absolute">
              "We're here to help! Whether you have a question, feedback, or
              just want to connect, feel free to reach out to us. Our team is
              eager to assist you and ensure you have the best experience
              possible. We look forward to hearing from you!"
            </p>
          </div>
        </div>
        <div className="text-[50px] sm:text-[60px] md:text-[90px] lg:text-[90px] xl:text-[140px] 2xl:text-[230px] flex absolute font-bold xl:left-[100px] 2xl:left-[80px] xl:top-[200px] lg:gap-8 2xl:gap-24 flex-col lg:flex-row top-[110px] gap-2 md:top-[60px] md:gap-1 left-[80px] md:left-[200px] lg:left-[40px] lg:top-[180px] 2xl:top-[180px]">
          <h1 className="text-white">Get in</h1>
          <h1 className="text-custom-green">Touch !</h1>
        </div>
      </section>

      <section className="items-center mx-auto text-center bg-white py-[50px] sm:py-[30px] md:py-[50px] lg:py-[70px] xl:py-[100px] h-[750px] mb-72 lg:mb-0">
        <h1 className="font-thinbold text-[20px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[20px] 2xl:text-[25px] mb-10 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] text-left text-custom-green pl-10 sm:pl-5 md:pl-10 lg:pl-20 xl:pl-52">
          We’re just a message away. Fill out the form, and our team will get back to you as soon as possible !
        </h1>
        <div className="flex w-full h-full pb-[120px] gap-8 pl-10 sm:pl-5 md:pl-10 lg:pl-32 xl:pl-56 flex-col lg:flex-row">
          <div className="w-full sm:w-[90%] md:w-[75%] lg:w-[50%]">
            <div className="border rounded-[12px] border-custom-green p-5 h-full">
              <ContactForm />
            </div>
          </div>

          <div className="h-full bg-custom-green w-full sm:w-[90%] md:w-[80%] lg:w-[75%] xl:w-[80%] relative flex flex-col items-center gap-10">
            <h1 className="text-[30px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[35px] text-white font-semibold mt-20">Connect With Us !</h1>
            <div className="flex gap-2 sm:gap-1 md:gap-2 lg:gap-3">
              <SocialIcon url="https://www.facebook.com" bgColor="white" fgColor="green" target="_blank" />
              <SocialIcon url="https://www.tiktok.com" bgColor="white" fgColor="green" target="_blank" />
              <SocialIcon url="https://www.youtube.com" bgColor="white" fgColor="green" target="_blank" />
              <SocialIcon url="https://www.linkedin.com" bgColor="white" fgColor="green" target="_blank" />
            </div>

            <div className="font-semibold text-white text-[14px] sm:text-[12px] md:text-[14px] lg:text-[15px] gap-2 mt-10">
              <h1>No. 123, Ja-ela, Sri Lanka</h1>

              <Link href="mailto:info@gmail.com" target="_blank">
                <h1 className="text-[15px] sm:text-[13px] md:text-[14px] lg:text-[15px]">info@gmail.com</h1>
              </Link>

              <Link href="tel:+9474333333" target="_blank" className="text-[15px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
                <h1>Tele: +9474333333</h1>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
