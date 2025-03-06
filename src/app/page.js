"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Contact from "@/components/Formweb";
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
          slidesToShow: 8,   // Displays 11 slides for large screens (2560px)
          slidesToScroll: 1,   // Scroll 1 slide at a time
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,    // Displays 6 slides at a time for medium screens (1440px)
          slidesToScroll: 1,   // Scroll 2 slides at a time
          initialSlide: 2      // Starts at the 2nd slide
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,    // Displays 4 slides at a time for tablets and small desktops (1024px)
          slidesToScroll: 1   // Scroll 1 slide at a time
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,    // Displays 3 slides for tablets (768px)
          slidesToScroll: 1   // Scroll 1 slide at a time
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,    // Displays 1 slide for mobile devices (480px)
          slidesToScroll: 1   // Scroll 1 slide at a time
        }
      }
    ]
  };
  
  return (
    <>
      <Navbar />
      <Hero />
      <section className="flex flex-col items-center px-4 py-16 mx-auto mt-2 mb-0 max-w-9xl sm:px-8 md:px-12 lg:px-16 xl:px-60 lg:flex-row 2xl:mt-40 2xl:mb-40 xl:mt-20">
  {/* Text Content */}
  <div className="text-center lg:w-1/2 lg:text-left">
    <h2 className="mb-2 text-3xl text-green-600 sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-8xl ">Welcome to</h2>
    <h1 className="text-5xl font-bold text-green-600 sm:text-6xl md:text-7xl xl:text-5xl 2xl:text-[100px]">Ceylon Essence</h1>
    <p className="max-w-2xl mx-auto mt-6 text-sm leading-relaxed text-justify text-gray-600 sm:text-base md:text-lg lg:mx-0">
    Discover the authentic flavors, healing properties, and rich cultural heritage of Sri Lanka. At Ceylon Essence, we are committed to bringing you the finest spices, herbs, and natural products, all sustainably sourced from the heart of Sri Lanka. Join us in experiencing the pure essence of this beautiful island, crafted with care and respect for nature, culture, and community.

    </p>
    <Link href="/about">
      <button className="text-white bg-green-500 rounded-full sm:text-sm sm:py-2 sm:mt-4 sm:px-4 md:text-base md:py-2.5 md:mt-5 md:px-5 lg:text-lg lg:py-3 lg:mt-6 lg:px-6 xl:text-lg xl:py-3 xl:mt-6 xl:px-6 2xl:text-xl 2xl:py-4 2xl:mt-8 2xl:px-8
  px-4">
        Read More
      </button>
    </Link>
  </div>

  {/* Image */}
  <div className="mt-10 lg:mt-0 lg:ml-12 w-full sm:w-[400px] md:w-[480px] lg:w-[500px] xl:w-[550px] 2xl:w-[600px] max-w-full">
    <img className="object-cover w-full h-auto rounded-xl" src="/images/ce.png" alt="Ceylon Essence" />
  </div>
</section>


{/* Our Products */}
<section className="py-[100px] max-h-screen">
  <h1 className="text-5xl  ml-[20px] sm:ml-[50px] md:ml-[80px] lg:ml-[100px] font-bold mb-[40px] sm:mb-[60px] md:mb-[80px] lg:mb-[100px] text-left text-custom-brown 2xl:text-7xl">
    Our Products
  </h1>

  <div className="flex items-center justify-center mt-2 2xl:mt-36">
    <div className="grid h-auto grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {/* Product Card */}
      <div className="relative items-center justify-center overflow-hidden transition-shadow rounded-[15px] cursor-pointer group hover:shadow-xl hover:shadow-black/30">
        <div className="mx-auto h-60">
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

      {/* Other product cards */}
      <div className="relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30 rounded-[15px]">
        <div className="mx-auto h-60">
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
        <div className="mx-auto h-60">
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

  <p className="justify-center mx-auto mt-20 text-justify px-[20px] sm:px-[50px] md:px-[100px] lg:px-[150px] xl:px-[200px] 2xl:px-[250px] text-zinc-600 text-1xl 2xl:text-2xl 2xl:mt-40">
  Discover the true essence of Sri Lanka through our carefully curated collection of products. From the bold and aromatic spices like Ceylon cinnamon to the finely crafted handcrafts reflecting the island's rich cultural heritage, each item tells a story of authenticity and tradition. Our herbs, sustainably sourced from Sri Lanka’s lush landscapes, offer natural remedies and wellness benefits, while our food & beverages bring the island’s flavors to your table, from aromatic teas to delicious local treats. Browse through our images to explore these categories, each crafted with care and commitment to sustainability. At Ceylon Essence, we’re proud to share the island’s finest offerings with the world. 
  </p>
</section>

{/* Heritage Section */}
<section className="py-[200px] lg:mt-2 xl:mt-2 2xl:mt-2 md:mt-[300px] mt-[1000px]">
  <h3 className="text-5xl font-bold ml-[100px] mb-16 text-green-600 2xl:mb-32 2xl:text-7xl">
    Heritage of Ceylon Trade
  </h3>

  <div className="slider-container">
    <Slider {...settings}>
      {[
        {
          img: "images/tea.webp",
          title: "Ceylon Tea",
          description:
            "The ancient Ceylon tea trade, rooted in Sri Lanka's lush highlands, flourished as a vital export, shaping global tea culture with its rich, aromatic blends",
        },
        {
          img: "images/coffee.webp",
          title: "Coffee",
          description:
            "Once the king of exports, Sri Lanka’s coffee had its moment — until tea took over the throne.",
        },
        {
          img: "images/cinnamon1.webp",
          title: "Cinnoman",
          description:
            "Cinnamon, native to Sri Lanka, has been a prized spice for centuries, valued for its sweet flavor and medicinal properties.",
        },
        {
          img: "images/rubber.webp",
          title: "Rubber",
          description:
            "Bouncing from the island to the world, Sri Lankan rubber revolutionized industries and kept economies rolling.",
        },
        {
          img: "images/gem.webp",
          title: "Gems",
          description:
            "Sri Lankan gems, sparkling with centuries of history, have always dazzled the world’s elite.",
        },
        {
          img: "images/coconut.webp",
          title: "Coconut",
          description:
            "From oil to coir, Sri Lanka’s coconuts have been trading treasures, versatile and ever-valuable.",
        },
        {
          img: "images/pearl.webp",
          title: "Pearls",
          description:
            "Sri Lanka’s pearls, glistening with timeless beauty, have been the island’s lustrous treasure in global trade for centuries.",
        },
        




        {
          img: "images/tea2.webp",
          title: "Ceylon Tea",
          description:
            "The ancient Ceylon tea trade, rooted in Sri Lanka's lush highlands, flourished as a vital export, shaping global tea culture with its rich, aromatic blends",
        },
        {
          img: "images/coffee2.webp",
          title: "Coffee",
          description:
            "Once the king of exports, Sri Lanka’s coffee had its moment — until tea took over the throne.",
        },
        {
          img: "images/cinnamon2.webp",
          title: "Cinnoman",
          description:
            "Cinnamon, native to Sri Lanka, has been a prized spice for centuries, valued for its sweet flavor and medicinal properties.",
        },
        {
          img: "images/rubber2.webp",
          title: "Rubber",
          description:
            "Bouncing from the island to the world, Sri Lankan rubber revolutionized industries and kept economies rolling.",
        },
        {
          img: "images/gem2.webp",
          title: "Gems",
          description:
            "Sri Lankan gems, sparkling with centuries of history, have always dazzled the world’s elite.",
        },
        {
          img: "images/coconut2.webp",
          title: "Coconut2",
          description:
            "From oil to coir, Sri Lanka’s coconuts have been trading treasures, versatile and ever-valuable.",
        },
        {
          img: "images/pearl2.webp",
          title: "Pearls",
          description:
            "Sri Lanka’s pearls, glistening with timeless beauty, have been the island’s lustrous treasure in global trade for centuries.",
        },
      ].map((card, index) => (
            <div

            key={index}
            className="w-[150px] h-[240px] sm:w-[180px] sm:h-[288px] md:w-[200px] md:h-[320px] lg:w-[220px] lg:h-[360px] xl:w-[250px] xl:h-[400px] 2xl:w-[350px] 2xl:h-[600px]"
            >
            <div className="relative items-center justify-center w-full h-full overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30">
              <img
                className="object-cover w-full h-full transition-transform duration-1000 scale-100 group-hover:scale-110"
                src={card.img}
                alt={card.title}
              />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-green-800/60 group-hover:via-green-800/50 group-hover:to-green-800/60"></div>
            <div className="max-w-full absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 pt-5 gap-5">
              <h1 className="text-2xl font-bold text-white font-dmserif">{card.title}</h1>
              <p className="mb-3 italic text-white transition-opacity duration-300 opacity-0 text-1xl group-hover:opacity-100">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>

  <div className="justify-center w-full mx-auto text-center px-[20px] sm:px-[100px] md:px-[150px] lg:px-[180px] xl:px-[200px] 2xl:px-[250px]">
  <p className="justify-center mx-auto mt-20 text-lg italic font-thinbold text-zinc-600 2xl:text-2xl">

" Sri Lanka, historically known as Ceylon, has been a hub of global trade for centuries. Renowned for its valuable spices, herbs, and natural resources, the island attracted traders from across the world long before modern commerce. The legacy of Ceylon's rich trade history is deeply embedded in its culture, with ancient maritime routes connecting Sri Lanka to Europe, the Middle East, and Asia."
<br/><br/>
"At Ceylon Essence, we honor this timeless heritage by continuing the tradition of offering the world Sri Lanka’s finest products, crafted with the same care and quality that made Ceylon famous. Our commitment to preserving this legacy means we work closely with local artisans and farmers to ensure the authenticity, sustainability, and integrity of every product. We invite you to explore the flavors, crafts, and natural treasures that have made Sri Lanka a prized destination for trade throughout history."
  </p>
  <Link href={'/about'}>
  <button className="mt-[20px] bg-green-500 text-white px-2 py-1 rounded-full text-sm 2xl:text-2xl 2xl:mt-[70px]">
    Read More
  </button>
  </Link>

</div>
</section>

<section className="max-h-screen ">
  <div className="flex flex-col justify-center gap-2 mx-auto lg:flex-row md:items-center">
    <div className="md:ml-[100px] ml-[40px] w-300px py-7 sm:w-[600px] md:w-[650px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px]">
      <p className="md:text-3xl text-1xl font-bold md:tracking-[2] text-custom-brown/80 2xl:text-4xl">
        Explore the Journey of Quality,
      </p>
      <div className="flex gap-5 mt-5">
        <p className="text-2xl font-bold md:text-5xl text-custom-green 2xl:text-7xl">From Plant</p>
        <p className="text-2xl font-bold md:text-5xl text-custom-brown 2xl:text-7xl">to Product</p>
      </div>
      <p className="px-10 mt-10 text-[15px] md:text-[20px] text-custom-brown/70 leading-tight sm:px-12 md:px-10 lg:px-16 xl:px-20 2xl:mt-20">
      At Ceylon Essence, every product tells a story of care, craftsmanship, and authenticity. Our journey begins with the careful selection of plants, herbs, and spices, grown in Sri Lanka’s fertile soil. Through sustainable farming practices, we ensure that each product is nurtured with respect for both the land and its people.
      </p>
      <Link href={"/resourceCenter"}>
        <button className="mt-[20px] bg-custom-brown/70 text-white px-2 py-1 rounded-full text-sm ml-16 2xl:mt-15 2xl:text-md">
          Read More
        </button>
      </Link>
    </div>
    <div className="w-[680px] h-[420px] rounded-lg sm:w-[700px] sm:h-[440px] md:w-[750px] md:h-[480px] lg:w-[800px] lg:h-[520px] xl:w-[900px] xl:h-[560px] 2xl:w-[1000px] 2xl:h-[600px] hidden md:block">
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
<section className="py-[50px] sm:py-[60px] md:py-[80px] lg:py-[100px] lg:mt-2 xl:mt-2 2xl:mt-2 md:mt-[300px] mt-[200px]">
  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-bold text-custom-green/60 sm:ml-[20px] md:ml-[40px] lg:ml-[100px] 2xl:ml-[200px] ml-[20px]">
    We're Ready to Help,
  </h3>
  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-custom-green mt-2 sm:ml-[20px] md:ml-[40px] lg:ml-[100px] 2xl:ml-[200px] ml-[20px]">
    Reach Out Today!
  </h3>


  <Contact/>    

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
