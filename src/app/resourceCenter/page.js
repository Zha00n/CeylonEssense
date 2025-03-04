"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import { ScrollShadow } from "@heroui/react";
import { API_URL } from "@/configs/constants";

export default function ResourceCenter() {
  const [hoveredCrop, setHoveredCrop] = useState(null);
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);

  // Fetch all resources (crops) when the component mounts
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${API_URL}/r/getAll`);
        const data = await response.json();
        setCrops(data); // Store the fetched crops (resources) in state
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  // Function to fetch resource by ID
  const fetchResourceById = async (resourceId) => {
    try {
      const response = await fetch(`${API_URL}/r/get/${resourceId}`);
      const data = await response.json();
      setSelectedCrop(data); // Set the selected crop's data
    } catch (error) {
      console.error("Error fetching resource by ID:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto">
        {/* Hero Section with Parallax Effect */}
        <div className="px-12 ">
          <motion.div
            className="relative h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <video
              className="object-cover w-full h-full"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/images/about.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-white">
              <motion.h1
                className="text-5xl font-extrabold"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Discover the Legacy of Sri Lankan Export Crops
              </motion.h1>
              <motion.p
                className="mt-4 text-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Explore the journey from planting to packaging, and uncover the heritage behind every crop.
              </motion.p>
            </div>
          </motion.div>
        </div>

        <section className="px-20 py-24 space-y-12 bg-gray-50">
          <div className="relative flex justify-center gap-5">
            <motion.h2
              className="text-5xl font-bold text-center text-custom-green"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              The Production
            </motion.h2>
            <motion.h2
              className="text-5xl font-bold text-center text-custom-brown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Process
            </motion.h2>
          </div>

          <div className="relative inset-0 flex items-start justify-between">
            {/* Left side: Process steps */}
            <div className="w-1/2 pr-8">
              <div className="absolute top-0 w-px h-full transform -translate-x-1/2 bg-gray-300 left-1/2"></div>
              {["Planting", "Harvesting", "Processing", "Packaging"].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-center justify-start mb-12 space-x-4"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.8 }}
                >
                  <div className="flex items-center justify-center w-8 h-8 text-lg font-bold text-white bg-green-500 rounded-full">
                    {index + 1}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-semibold">{step}</h3>
                    <p className="mt-2 text-gray-600">
                      {`The ${step.toLowerCase()} stage ensures high quality at every step of production.`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side: Vector graphic */}
            <div className="w-1/2 px-10 pb-20">
              <Process />
            </div>
          </div>
        </section>

        {/* Spotlight on Crops - Hover Effects and Detailed Info */}
        <section className="px-20 py-12 space-y-12">
          <h2 className="mb-8 text-5xl font-bold text-center text-custom-brown">Spotlight on Our Products</h2>

          {crops.length === 0 ? (
            <div className="text-xl text-center text-gray-600">No resources available</div>
          ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
              <motion.div
                key={crop.resourceId} // Use unique resourceId here
                className="relative p-6 overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
                onHoverStart={() => setHoveredCrop(crop.resourceId)}
                onHoverEnd={() => setHoveredCrop(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => fetchResourceById(crop.resourceId)} // Fetch resource data by ID
              >
                <motion.div
                  className="absolute inset-0 transition-opacity duration-300 bg-gray-800 opacity-0 hover:opacity-50"
                ></motion.div>
                <div className="relative">
                  <Image
                    src={`${API_URL}/${crop.image}`}
                    alt={crop.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-64 rounded-lg"
                  />
                  <h3 className="mt-4 text-2xl font-semibold">{crop.title}</h3> {/* Use crop.title */}
                  <p className="mt-2 text-gray-600 line-clamp-3 ">{crop.description}</p> {/* Use crop.description */}
                </div>
                {hoveredCrop === crop.resourceId && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-center text-white bg-black bg-opacity-60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-xl font-semibold">{crop.title} - A treasure from Sri Lanka!</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          )}
        </section>

{/* Video Modal */}
{selectedCrop && (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    onClick={() => setSelectedCrop(null)}
  >
    <motion.div
      className="relative bg-[#403c3c] p-6 rounded-lg shadow-lg w-[90%] max-w-5xl "
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute px-3 py-1 text-sm rounded-full text-custom-green top-2 right-2"
        onClick={() => setSelectedCrop(null)}
      >
        ✖
      </button>

      <h2 className="text-2xl font-bold text-white">{selectedCrop.title}</h2> {/* Use selectedCrop.title */}

      {/* Flex container to align video and description */}
      <div className="flex items-start mt-4">
        {/* Video with larger size */}
        {/* <video className="w-[75%] rounded-lg" autoPlay controls>
          <source src={selectedCrop.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
          <iframe 
              className="rounded-lg "
              width=" 640" 
              height="360" 
              src={`https://www.youtube.com/embed/${selectedCrop.video}`} 
              allow="autoplay; encrypted-media" 
              allowFullScreen
              title="Video"
              autoPlay
            ></iframe>

        {/* Description (25% of the container) */}

        <ScrollShadow className="w-[25%] max-h-[400px] dark">
        <p className="ml-6 mr-2 text-sm text-white">{selectedCrop.description}</p> 
        </ScrollShadow>


      </div>
    </motion.div>
  </motion.div>
)}

      </div>

      <Footer />
    </>
  );
}