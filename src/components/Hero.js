"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const images = [
    "/images/hero.webp",
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg", // Add your images here
  ];
  
  const [currentImage, setCurrentImage] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt="Spices"
          className="object-cover w-full h-full transition-all duration-1000 ease-in-out"
        />
      </div>
    </section>
  );
}



// import { useState, useEffect } from 'react';

// export default function Home() {
//   const images = [
//     { src: '/images/image1.png', alt: 'Image 1', text: 'Ceylon Tea Cultivation' },
//     { src: '/images/image2.png', alt: 'Image 2', text: 'Tea Leaves Harvesting' },
//     // Add more images as needed
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="my-4 text-2xl font-bold text-center">Ceylon Tea</h1>
//       <div className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg h-96">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`absolute w-full h-full transition-opacity duration-1000 ${
//               index === currentIndex ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="object-cover w-full h-full"
//             />
//             <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
//               <span className="text-lg font-semibold text-white">{image.text}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }