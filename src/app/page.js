"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Link from 'next/link';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 11,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Navbar />
      <Hero />
      <section className="py-[100px] text-left flex ml-[100px] w-full ">
        <div className="w-[600px]">
          <h2 className="mb-3 text-5xl text-green-600">Welcome to</h2>
          <h1 className="font-bold text-green-600 text-7xl">Ceylon Essence</h1>
          <p className="max-w-3xl mt-[50px] text-gray-600 text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
            maiores maxime expedita debitis, fuga numquam labore quia aspernatur
            dolores hic inventore, suscipit architecto, rerum nulla consectetur
            excepturi nam modi rem.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <Link href={"/about"}>
          <button className="mt-[20px] bg-green-500 text-white px-4 py-2 rounded-full">
            Read More
          </button>
          </Link>
        </div>
        <div className="ml-20 h-[320px] w-[500px]">
          <img
            className="w-full h-full object-cover rounded-[12px] "
            src="/images/home.jpg"
            alt="image"
          />
        </div>
      </section>

      {/* Our Products */}
      <section className="py-[100px] max-h-screen">
        <h1 className="text-5xl ml-[100px] font-bold mb-[100px] text-left text-custom-brown ">
          Our Products
        </h1>
        {/* <div className="grid grid-cols-4 gap-6 mx-auto mt-6 max-w-7xl">
          <div className="p-4 text-center bg-white shadow-lg">
            <img src="/images/spices.jpg" alt="Spices" className="h-32 mx-auto" />
            <p className="mt-2 font-semibold">Spices</p>
          </div>
          <div className="p-4 text-center bg-white shadow-lg">
            <img src="/images/handcraft.jpg" alt="Bags" className="h-32 mx-auto" />
            <p className="mt-2 font-semibold">Handcrafts</p>
          </div>
          <div className="p-4 text-center bg-white shadow-lg">
            <img src="/images/herbs.jpg" alt="Tea" className="h-32 mx-auto" />
            <p className="mt-2 font-semibold">Herbs</p>
          </div>
          <div className="p-4 text-center bg-white shadow-lg">
            <img src="/images/food.jpg" alt="Oils" className="h-32 mx-auto" />
            <p className="mt-2 font-semibold">Food & Beverages</p>
          </div>
        </div> */}
        {/* <div className="flex flex-row w-[75%] mx-auto gap-10 justify-center">
          <Link href="#">
            <img
              src="/images/spices.jpg"
              alt="Spices"
              className="mx-auto h-50"
            />
          </Link>

          <Link href="#">
            <img
              src="/images/handcraft.jpg"
              alt="Spices"
              className="mx-auto h-50"
            />
          </Link>

          <Link href="#">
            <img
              src="/images/herbs.jpg"
              alt="Spices"
              className="mx-auto h-50"
            />
          </Link>

          <Link href="#">
            <img src="/images/food.jpg" alt="Spices" className="mx-auto h-50" />
          </Link>
        </div> */}

        <div className="flex items-center justify-center ">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 h-50">
            <div className="relative items-center justify-center overflow-hidden transition-shadow rounded-[15px] cursor-pointer group hover:shadow-xl hover:shadow-black/30">
              <div className="mx-auto h-50">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 scale-110 group-hover:rotate-3 group-hover:scale-150"
                  src="/images/spices.jpg"
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[70%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5">
                <h1 className="text-2xl font-bold text-white font-dmserif">
                  Spices
                </h1>
                <Link href={"/allProducts"}>
                <button className="rounded-full bg-amber-950 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 mt-5 hover:bg-amber-900">
                  See Products
                </button>
                </Link>
              </div>
            </div>
            <div className="relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30 rounded-[15px]">
              <div className="mx-auto h-50">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 scale-110 group-hover:rotate-3 group-hover:scale-150"
                  src="/images/handcraft.jpg"
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[70%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5">
                <h1 className="text-2xl font-bold text-white font-dmserif">
                  Handcrafts
                </h1>
                <Link href={"/allProducts"}>
                <button className="rounded-full bg-amber-950 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 mt-5 hover:bg-amber-900">
                  See Products
                </button>
                </Link>
              </div>
            </div>
            <div className="relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30 rounded-[15px]">
              <div className="mx-auto h-60">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 scale-110 group-hover:rotate-3 group-hover:scale-150"
                  src="/images/herbs.jpg"
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[70%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5">
                <h1 className="text-2xl font-bold text-white font-dmserif">
                  Herbs
                </h1>
                <Link href={"/allProducts"}>
                <button className="rounded-full bg-amber-950 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 mt-5 hover:bg-amber-900">
                  See Products
                </button>
                </Link>
              </div>
            </div>
            <div className="relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30 rounded-[15px]">
              <div className="mx-auto h-50">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 scale-110 group-hover:rotate-3 group-hover:scale-150"
                  src="/images/food.jpg"
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[70%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-10">
                <h1 className="text-2xl font-bold text-white font-dmserif">
                  Food & Beverages
                </h1>
                <Link href={"/allProducts"}>
                <button className="rounded-full bg-amber-950 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 mt-5 hover:bg-amber-900">
                  See Products
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="justify-center mx-auto mt-20 text-justify px-[200px] text-zinc-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eum
          minima, maiores odit modi id accusamus natus dolores labore quae
          accusantium nulla molestiae vitae ex veniam pariatur beatae ducimus
          ipsum! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Mollitia, expedita quis veritatis id ipsam molestias laudantium ipsa
          error iste repellat provident corrupti nam quam eius fugiat
          voluptatibus consectetur animi eligendi?
        </p>
      </section>

      {/* Heritage Section */}
      <section className="py-[200px]">
        {/* <h3 className="text-5xl font-bold ml-[100px] mb-16 text-green-600">
          Heritage of Ceylon Trade
        </h3>
        <div className="grid grid-cols-2 gap-4 mx-auto mt-6 max-w-7xl">
          <div>
            <img src="/images/hero5.jpg" alt="Heritage" className="w-full" />
          </div>
          <div>
            <p className="text-gray-600">
              Sri Lanka has a long history as a hub for trade, particularly in
              export crops like cinnamon and pepper...
            </p>
            <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg">
              Read More
            </button>
          </div>
        </div> */}

        <h3 className="text-5xl font-bold ml-[100px] mb-16 text-green-600">
          Heritage of Ceylon Trade
        </h3>

        <div className="slider-container">
          <Slider {...settings}>
            {/* <div className="bg-green-400">
              <div className="w-[300px] h-[400px] bg-red-500"></div>
            </div>
            
            <div>
              <div className="w-[300px] h-[400px] bg-red-500"></div>
            </div>
            
            <div>
              <div className="w-[300px] h-[400px] bg-red-500"></div>
            </div>
            
            <div>
              <div className="w-[300px] h-[400px] bg-red-500"></div>
            </div>

            <div>
              <div className="w-[300px] h-[400px] bg-red-500"></div>
            </div>

            <div>
              <div className="w-[300px] h-[400px] bg-red-500"></div>
            </div> */}
            <div className="w-[250px] h-[400px]">
              <div className="w-[250px] relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30">
                <img
                  className="object-cover w-[250px] h-[400px] transition-transform duration-1000 scale-100 group-hover:scale-110"
                  src="https://travellersisle.com/wp-content/uploads/2022/04/Tea-history-in-Sri-Lanka-920x613.webp"
                  alt=""
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-green-800/60 group-hover:via-green-800/50 group-hover:to-green-800/60"></div>
                <div className="max-w-[250px] absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5 gap-40">
                  <h1 className="text-2xl font-bold text-white font-dmserif">
                    Ceylon Tea
                  </h1>
                  <p className="mb-3 italic text-white transition-opacity duration-300 opacity-0 text-1xl group-hover:opacity-100">
                    The ancient Ceylon tea trade, rooted in Sri Lanka's lush
                    highlands, flourished as a vital export, shaping global tea
                    culture with its rich, aromatic blends
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[250px] h-[400px]">
              <div className="w-[250px] relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30">
                <img
                  className="object-cover w-[250px] h-[400px] transition-transform duration-1000 scale-100 group-hover:scale-110"
                  src="https://lankapura.com/wp-content/gallery/people-and-lifestyle/teal-pickers-ceylon.jpg"
                  alt=""
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-green-800/60 group-hover:via-green-800/50 group-hover:to-green-800/60"></div>
                <div className="max-w-[250px] absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5 gap-60">
                  <h1 className="text-2xl font-bold text-white font-dmserif">
                    Coffee
                  </h1>
                  <p className="mb-3 italic text-white transition-opacity duration-300 opacity-0 text-1xl group-hover:opacity-100">
                    Once the king of exports, Sri Lanka’s coffee had its moment
                    — until tea took over the throne.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[250px] h-[400px]">
              <div className="w-[250px] relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30">
                <img
                  className="object-cover w-[250px] h-[400px] transition-transform duration-1000 scale-100 group-hover:scale-110"
                  src="https://lakcinnamongroup.lk/wp-content/uploads/2020/08/History-3-1170x700.jpg"
                  alt=""
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-green-800/60 group-hover:via-green-800/50 group-hover:to-green-800/60"></div>
                <div className="max-w-[250px] absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5 gap-52">
                  <h1 className="text-2xl font-bold text-white font-dmserif">
                    Cinnoman
                  </h1>
                  <p className="mb-3 italic text-white transition-opacity duration-300 opacity-0 text-1xl group-hover:opacity-100">
                    Cinnamon, native to Sri Lanka, has been a prized spice for
                    centuries, valued for its sweet flavor and medicinal
                    properties.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[250px] h-[400px]">
              <div className="w-[250px] relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30">
                <img
                  className="object-cover w-[250px] h-[400px] transition-transform duration-1000 scale-100 group-hover:scale-110"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZURSMNA5PyP5q0O2d0fzZvv-Lcp5G5R7yFQ&s"
                  alt=""
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-green-800/60 group-hover:via-green-800/50 group-hover:to-green-800/60"></div>
                <div className="max-w-[250px] absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5 gap-52">
                  <h1 className="text-2xl font-bold text-white font-dmserif">
                    Rubber
                  </h1>
                  <p className="mb-3 italic text-white transition-opacity duration-300 opacity-0 text-1xl group-hover:opacity-100">
                    Bouncing from the island to the world, Sri Lankan rubber
                    revolutionized industries and kept economies rolling.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[250px] h-[400px]">
              <div className="w-[250px] relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30">
                <img
                  className="object-cover w-[250px] h-[400px] transition-transform duration-1000 scale-100 group-hover:scale-110"
                  src="https://raayagems.com/cdn/shop/articles/srilanka_jpg.webp?v=1728032825"
                  alt=""
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-green-800/60 group-hover:via-green-800/50 group-hover:to-green-800/60"></div>
                <div className="max-w-[250px] absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5 gap-60">
                  <h1 className="text-2xl font-bold text-white font-dmserif">
                    Gems
                  </h1>
                  <p className="mb-3 italic text-white transition-opacity duration-300 opacity-0 text-1xl group-hover:opacity-100">
                    Sri Lankan gems, sparkling with centuries of history, have
                    always dazzled the world’s elite.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[250px] h-[400px]">
              <div className="w-[250px] relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30">
                <img
                  className="object-cover w-[250px] h-[400px] transition-transform duration-1000 scale-100 group-hover:scale-110"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCbUs4XMX_2VOnais2mNktT7TQ6pSNJntLtA&s"
                  alt=""
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-green-800/60 group-hover:via-green-800/50 group-hover:to-green-800/60"></div>
                <div className="max-w-[250px] absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5 gap-60">
                  <h1 className="text-2xl font-bold text-white font-dmserif">
                    Coconut
                  </h1>
                  <p className="mb-3 italic text-white transition-opacity duration-300 opacity-0 text-1xl group-hover:opacity-100">
                    From oil to coir, Sri Lanka’s coconuts have been trading
                    treasures, versatile and ever-valuable.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[250px] h-[400px]">
              <div className="w-[250px] relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30">
                <img
                  className="object-cover w-[250px] h-[400px] transition-transform duration-1000 scale-100 group-hover:scale-110"
                  src="https://damiatea.com/wp-content/uploads/2023/06/Anverallytea.jpg"
                  alt=""
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-green-800/60 group-hover:via-green-800/50 group-hover:to-green-800/60"></div>
                <div className="max-w-[250px] absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5 gap-52">
                  <h1 className="text-2xl font-bold text-white font-dmserif">
                    Pearls
                  </h1>
                  <p className="mb-3 italic text-white transition-opacity duration-300 opacity-0 text-1xl group-hover:opacity-100">
                    Sri Lanka’s pearls, glistening with timeless beauty, have
                    been the island’s lustrous treasure in global trade for
                    centuries.
                  </p>
                </div>
              </div>
            </div>
          </Slider>
        </div>

        <div className="justify-center w-full mx-auto text-center px-[200px]">
          <p className="justify-center mx-auto mt-20 text-justify text-zinc-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
            maiores maxime expedita debitis, fuga numquam labore quia aspernatur
            dolores hic inventore, suscipit architecto, rerum nulla consectetur
            excepturi nam modi rem.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <button className="mt-[20px] bg-green-500 text-white px-2 py-1 rounded-full text-sm">
            Read More
          </button>
        </div>
      </section>

      <section className="max-h-screen ">
        <div className="flex justify-center gap-2 mx-auto">
          <div className="ml-[100px] w-[550px] py-7">
            <p className="text-3xl font-bold tracking-[2] text-custom-brown/80">
              Explore the Journey of Quality,
            </p>
            <div className="flex gap-5 mt-5">
              <p className="text-5xl font-bold text-custom-green">From Plant</p>
              <p className="text-5xl font-bold text-custom-brown">to Product</p>
            </div>
            <p className="px-16 mt-10 text-[20px] text-custom-brown/70 leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur voluptatem optio voluptas sint corrupti quibusdam
              numquam neque? Iure autem velit mollitia. Obcaecati sunt quasi
              illo sequi similique omnis perferendis officiis.
            </p>
            <Link href={"/resourceCenter"}>
            <button className="mt-[20px] bg-custom-brown/70 text-white px-2 py-1 rounded-full text-sm ml-16">
              Read More
            </button>
            </Link>
          </div>
          <div className=" w-[680px] h-[420px] rounded-lg">
            <video
              className="object-cover border rounded-lg border-zinc-200"
              autoPlay
              loop
              muted
              playsInline
              src="/images/vid.mp4"
            />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-[100px]">
        <h3 className="ml-[100px] text-3xl font-bold text-custom-green/60">
          We're Ready to Help,
        </h3>
        <h3 className="ml-[100px] text-5xl font-bold text-custom-green mt-2">
          Reach Out Today!
        </h3>
        
        <div className="mt-[50px] pb-[100px]">
          <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]">
            <div>
              <h1 className="text-3xl font-bold text-gray-800/70">Let's Talk</h1>
              <p className="mt-4 text-sm text-gray-500/70">
                Have some big idea or brand to develop and need help? Then reach
                out we'd love to hear about your project and provide help.
              </p>

              <div className="mt-12">
                <h2 className="text-base font-bold text-gray-800/70">Email</h2>
                <ul className="mt-4">
                  <li className="flex items-center">
                    <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="#1D9325"
                        viewBox="0 0 479.058 479.058"
                      >
                        <path
                          d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>
                    <a
                      href="javascript:void(0)"
                      className="ml-4 text-sm text-custom-green"
                    >
                      <small className="block">Mail</small>
                      <strong>info@ceylonessence.com</strong>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <form className="space-y-4 ml-auo">
              <input
                type="text"
                placeholder="Name"
                className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
              />
              <textarea
                placeholder="Message"
                rows="6"
                className="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-none focus:border-custom-green"
              ></textarea>
              <button
                type="button"
                className="text-white bg-custom-green hover:bg-custom-green rounded-md text-sm px-4 py-2.5 w-full !mt-6"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;

// <div className="font-sans">
//       {/* Header Section */}
//       <header className="bg-gray-100">
//         <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
//           <div className="text-lg font-bold text-green-600">Ceylon Essence</div>
//           <input
//             type="text"
//             placeholder="Search Products..."
//             className="px-3 py-1 border rounded-lg focus:outline-none"
//           />
//           <div className="flex space-x-4">
//             <button className="px-4 py-2 text-white bg-green-500 rounded-lg">Login</button>
//             <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">Sign Up</button>
//             <button className="text-gray-700">English</button>
//           </div>
//         </div>
//         <nav className="text-white bg-green-600">
//           <div className="flex justify-around py-2 mx-auto max-w-7xl">
//             <a href="#" className="hover:underline">HOME</a>
//             <a href="#" className="hover:underline">Our Products</a>
//             <a href="#" className="hover:underline">Export & Supply Chain</a>
//             <a href="#" className="hover:underline">About Us</a>
//             <a href="#" className="hover:underline">Resource Center</a>
//             <a href="#" className="hover:underline">Contact Us</a>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section>
//         <img src="/images/hero.jpg" alt="Spices"   className="object-cover w-screen h-full" />
//       </section>

//       {/* Welcome Section */}
//       <section className="flex justify-center gap-8 py-20 text-left">
//         <div className= "w-[500px]">
//         <h2 className="mb-3 text-3xl text-green-600">Welcome to</h2>
//         <h1 className="text-5xl font-bold text-green-600">Ceylon Essence</h1>
//         <p className="max-w-3xl mt-[50px] text-gray-600">
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur maiores maxime expedita debitis, fuga numquam labore quia aspernatur dolores hic inventore, suscipit architecto, rerum nulla consectetur excepturi nam modi rem.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//         </p>
//         <button className="mt-[20px] bg-green-500 text-white px-4 py-2 rounded-full">Read More</button>
//         </div>
//         <div className=" h-[320px] w-[500px]">
//           <img  className="w-full h-full object-cover rounded-[12px] " src="/images/home.jpg" alt="image" />
//         </div>
//       </section>

//       {/* Our Products */}
//       <section className="py-10 bg-gray-100">
//         <h3 className="text-2xl font-bold text-center text-orange-600">Our Products</h3>
//         <div className="grid grid-cols-4 gap-6 mx-auto mt-6 max-w-7xl">
//           <div className="p-4 text-center bg-white shadow-lg">
//             <img src="/images/spices.jpg" alt="Spices" className="h-32 mx-auto" />
//             <p className="mt-2 font-semibold">Spices</p>
//           </div>
//           <div className="p-4 text-center bg-white shadow-lg">
//             <img src="/images/handcraft.jpg" alt="Bags" className="h-32 mx-auto" />
//             <p className="mt-2 font-semibold">Handcrafts</p>
//           </div>
//           <div className="p-4 text-center bg-white shadow-lg">
//             <img src="/images/herbs.jpg" alt="Tea" className="h-32 mx-auto" />
//             <p className="mt-2 font-semibold">Herbs</p>
//           </div>
//           <div className="p-4 text-center bg-white shadow-lg">
//             <img src="/images/food.jpg" alt="Oils" className="h-32 mx-auto" />
//             <p className="mt-2 font-semibold">Food & Beverages</p>
//           </div>
//         </div>
//       </section>

//       {/* Heritage Section */}
//       <section className="py-10">
//         <h3 className="text-5xl font-bold ml-[100px] mb-16 text-green-600">Heritage of Ceylon Trade</h3>
//         <div className="grid grid-cols-2 gap-4 mx-auto mt-6 max-w-7xl">
//           <div>
//             <img src="/images/heritage.jpg" alt="Heritage" className="w-full" />
//           </div>
//           <div>
//             <p className="text-gray-600">
//               Sri Lanka has a long history as a hub for trade, particularly in export crops like cinnamon and pepper...
//             </p>
//             <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg">Read More</button>
//           </div>
//         </div>
//       </section>

//       {/* Contact Us Section */}
//       <section className="py-10 bg-gray-100">
//         <h3 className="text-2xl font-bold text-center text-green-600">Reach Out Today!</h3>
//         <div className="max-w-md mx-auto mt-6">
//           <button className="w-full px-4 py-6 text-xl font-bold text-white bg-green-500 rounded-lg">CONTACT US</button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 text-white bg-green-700">
//         <div className="flex justify-between mx-auto max-w-7xl">
//           <div>
//             <h4 className="font-bold">Ceylon Essence</h4>
//             <p>No. 123, Ja-Ela, Sri Lanka</p>
//             <p>Tel: +9407222222</p>
//           </div>
//           <div className="text-sm">&copy; 2025 All rights reserved.</div>
//           <div className="flex space-x-4">
//             <a href="#" className="hover:underline">Facebook</a>
//             <a href="#" className="hover:underline">Twitter</a>
//             <a href="#" className="hover:underline">Instagram</a>
//           </div>
//         </div>
//       </footer>
//     </div>
