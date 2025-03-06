"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const images = [
    "/images/hero.webp",
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg", 
  ];

  const texts = [
    {
      title: "Ceylon Essence",
      description: "Where Tradition Meets Purity",
      additional: ""
    },
    {
      title: "",
      description: "Experience the True Essence of Ceylon",
      additional: "Step into a world of rich flavors, time-honored traditions, and nature’s finest offerings. From fragrant spices to artisanal crafts, we bring you the purest treasures of Sri Lanka—sustainably sourced and crafted with care."
    },
    {
      title: "",
      description: "Nature’s Best, Crafted in Sri Lanka",
      additional: "From the lush landscapes of Ceylon to your home, experience the richness of our land through premium spices, herbs, and artisanal creations. Every product tells a story of heritage, quality, and sustainability."
    },
    {
      title: "",
      description: "Bringing Sri Lanka’s Heritage to the World",
      additional: "Celebrate the flavors, craftsmanship, and traditions of Sri Lanka with Ceylon Essence. Our carefully curated selection of spices, herbs, and handcrafts reflects the island’s beauty and authenticity."
    },
    {
      title: "",
      description: "A Taste of Sri Lanka, A Legacy of Excellence",
      additional: "For centuries, Sri Lanka has been the heart of global trade, offering the world its finest spices and natural treasures. At Ceylon Essence, we continue this legacy with products that embody purity, authenticity, and tradition."
    }
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  // Change image and text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentText((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, [images.length, texts.length]);

  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt="Hero Image"
          className="object-cover w-full h-full transition-all duration-1000 ease-in-out"
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay for contrast */}

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 py-2 text-center text-white">
        <h1 className="lg:mb-24 mb-10 text-5xl font-bold sm:text-7xl lg:text-[200px]">
          {texts[currentText].title}
        </h1>
        <div className="flex flex-col items-center justify-center gap-5 mx-auto">
          <p className="mb-4 text-3xl font-bold sm:text-7xl lg:text-8xl">{texts[currentText].description}</p>
          <p className="mt-2 text-sm sm:text-xl lg:text-2xl lg:w-[50%] w-[90%]">{texts[currentText].additional}</p>
        </div>
      </div>
    </section>
  );
}
