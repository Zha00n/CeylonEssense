"use client";
import React from 'react'
import ReactDOM from 'react-dom'
import { SocialIcon } from 'react-social-icons'
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import {Link} from "@heroui/react";

export default function Contact() {
  return (
    <>
      <Navbar />
      <section className="h-screen bg-custom-green">
        <div className="w-full h-full pt-[140px] pb-5 place-items-end">
          <div className="bg-white w-[68%] h-full rounded-tl-[50px] right-0 relative flex items-center">
            <p className="px-36 text-custom-green text-[25px] font-semibold text-justify mt-20 absolute">
              "We're here to help! Whether you have a question, feedback, or
              just want to connect, feel free to reach out to us. Our team is
              eager to assist you and ensure you have the best experience
              possible. We look forward to hearing from you!"
            </p>
          </div>
        </div>
        <div className="text-[120px] flex absolute font-bold left-[80px] top-[160px] gap-8">
          <h1 className="text-white">Get in</h1>
          <h1 className="text-custom-green">Touch !</h1>
        </div>
      </section>

      <section className="items-center mx-auto text-center bg-white py-[100px] h-[750px]" >
        <h1 className="font-thinbold text-[20px] mb-10  w-[60%] text-left text-custom-green pl-52">We’re just a message away. Fill out the form, and our team will get back to you as soon as possible !</h1>
        <div className="flex w-full h-full pb-[120px] gap-8 pl-56">
          <div className="w-[50%]">
            <div className="border rounded-[12px] border-custom-green p-5 h-full">
            <ContactForm />    
            </div>
          </div>

          <div className="h-full bg-custom-green w-[80%] relative flex flex-col items-center gap-10" >
            <h1 className="text-[35px] text-white font-semibold mt-20">Connect With Us !</h1>
            <div className="flex gap-2">
              <SocialIcon url="https://www.facebook.com" bgColor="white" fgColor="green" target="_blank"/>
              <SocialIcon url="https://www.tiktok.com" bgColor="white" fgColor="green" target="_blank"/>
              <SocialIcon url="https://www.youtube.com" bgColor="white" fgColor="green" target="_blank"/>
              <SocialIcon url="https://www.linkedin.com" bgColor="white" fgColor="green" target="_blank"/>
            </div>

            <div className="font-semibold text-white text-[15px] gap-2 mt-10">
              <h1>No. 123, Ja-ela, Sri Lanka</h1>
              
              <Link href='mailto:info@gmail.com' target='_blank'>
              <h1 className='text-[15px]'>info@gmail.com</h1>
              </Link>
              
              <Link href="tel:+9474333333" target='_blank' className='text-[15px]'>
              
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
