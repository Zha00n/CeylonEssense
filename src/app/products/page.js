"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCardB from "../../components/ProductCardB"; 
import ProductCardG from "../../components/ProductCardG";
import ProductCardMore from "../../components/ProductCardMore"
import { FaAngleDoubleRight } from "react-icons/fa";
import Link from 'next/link';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_URL } from "@/configs/constants";

  // Replace with your backend API URL

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/p/getAll`);
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category and get first 3 items from each category
  const spices = products.filter(product => product.category === "Spice").slice(0, 3);
  const herbs = products.filter(product => product.category === "Herb").slice(0, 3);
  const handcrafts = products.filter(product => product.category === "Handcraft").slice(0, 3);
  const foods = products.filter(product => product.category === "Food").slice(0, 3);

  // Handle case where no products are available
  if (!products.length) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-[100px] text-center">
          <h1 className="text-2xl text-gray-600">No products available</h1>
        </div>
        <Footer />
      </>
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen ">
        <div className="absolute md:mt-10 lg:mt-20 2xl:mt-40 md:ml-10 lg:ml-20 2xl:ml-40 sm:text-[40px] md:text=[80px] lg:text-[100px] 2xl:text-[240px]">
          <h1 className="font-extrabold text-white drop-shadow-2xl">Nature’s Treasure, </h1>
          <h1 className="font-extrabold text-white drop-shadow-2xl">Ceylon’s Best,</h1>
          <h1 className="font-extrabold text-white drop-shadow-2xl">Your Delight.</h1>          
        </div>

        <img
          src={"images/image.jpg"}
          alt="Spices"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Spice Products */}
      <div className="container mx-auto py-[100px]">
        <h1 className="mb-20 text-[40px] font-bold text-center text-custom-brown">Spice Products</h1>
        <div className="flex justify-center gap-[100px]">
          {spices.map((product, index) => (
            <ProductCardB key={index} product={product} /> // Use ProductCardB for spice products
          ))}
        </div>
        
        <div className="flex flex-col items-center mt-10">
          <Link href={"/allProducts"}>
            <button className="mt-7 w-[134px] h-[42px] bg-custom-brown/75 text-white rounded-[12px] text-small hover:bg-custom-brown/90 transition" >
              View All Products
            </button>
          </Link>
          <FaAngleDoubleRight className="mt-2 text-center text-medium text-custom-brown/75" />
        </div>
      </div>

      {/* Herb Products */}
      <div className="container mx-auto py-[100px]">
        <h1 className="mb-20 text-[40px] font-bold text-center text-custom-green">Herb Products</h1>
        <div className="flex justify-center gap-[100px]">
          {herbs.map((product, index) => (
            <ProductCardG key={index} product={product} /> // Use ProductCardG for herb products
          ))}
        </div>
        
        <div className="flex flex-col items-center mt-10">
          <Link href={"/allProducts"}>
            <button className="mt-7 w-[134px] h-[42px] bg-custom-green/75 text-white rounded-[12px] text-small hover:bg-custom-green/90 transition">
              View All Products
            </button>
          </Link>
          <FaAngleDoubleRight className="mt-2 text-center text-medium text-custom-green/75" />
        </div>
      </div>

      {/* Handcraft Products */}
      <div className="container mx-auto py-[100px]">
        <h1 className="mb-20 text-[40px] font-bold text-center text-custom-brown">Handcraft Products</h1>
        <div className="flex justify-center gap-[100px]">
          {handcrafts.map((product, index) => (
            <ProductCardB key={index} product={product} /> // Use ProductCardB for handcraft products
          ))}
        </div>

        <div className="flex flex-col items-center mt-10">
          <Link href={"/allProducts"}>
            <button className="mt-7 w-[134px] h-[42px] bg-custom-brown/75 text-white rounded-[12px] text-small hover:bg-custom-brown/90 transition">
              View All Products
            </button>
          </Link>
          <FaAngleDoubleRight className="mt-2 text-center text-medium text-custom-brown/75" />
        </div>
      </div>

      {/* Food & Beverages Products */}
      <div className="container mx-auto py-[100px]">
        <h1 className="mb-20 text-[40px] font-bold text-center text-custom-green">Food & Beverages</h1>
        <div className="flex justify-center gap-[100px]">
          {foods.map((product, index) => (
            <ProductCardG key={index} product={product} /> // Use ProductCardG for food products
          ))}
        </div>

        <div className="flex flex-col items-center mt-10">
          <Link href={"/allProducts"}>
            <button className="mt-7 w-[134px] h-[42px] bg-custom-green/75 text-white rounded-[12px] text-small hover:bg-custom-green/90 transition">
              View All Products
            </button>
          </Link>
          <FaAngleDoubleRight className="mt-2 text-center text-medium text-custom-green/75" />
        </div>
      </div>

      {/* More Products Slider */}
      <section className="py-[100px]">
        <div className="flex items-center justify-center gap-4 mx-auto mb-24">
          <h1 className="text-5xl font-bold text-[#767676]">More </h1>
          <h1 className="text-5xl font-bold text-custom-green/65">products</h1>
        </div>
        
        <div className="slider-container">
          <Slider {...settings}>
            {products.map((product, index) => (
              <ProductCardMore className="py-10" key={index} product={product} /> // Display all products in slider using ProductCardG
            ))}
          </Slider>
        </div>
      </section>

      <Footer />
    </>
  );
}
