"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests
import Image from "next/image";

// Set API base URL
const API_URL = 'http://localhost:5000'; 

export default function ProductPage() {
  const categories = ["All", "Spice", "Herb", "Handcraft", "Food"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State for products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/p/getAll`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter((product) => product.category === selectedCategory);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar />
      
      <div className="py-12 mb-20 bg-gray-50">
        {/* Filter Section */}
        <div className="flex items-center justify-between h-20 px-10 mb-10 shadow-md">
          <h2 className="ml-10 text-4xl font-bold text-custom-brown">All Products</h2>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedCategory === category
                    ? "bg-custom-brown text-white"
                    : "bg-gray-200 text-gray-700"
                } transition`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-10 px-20 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="w-[220px] h-[320px] text-center bg-white shadow-lg rounded-lg overflow-hidden transition-all hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative w-full h-[200px] ">
                <img
                  src={`${API_URL}/${product.image[0]}`} // Assuming the first image in the array is the main image
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Product Info */}
              <div className="px-4 py-2 ">
                <h3 className="text-lg font-semibold text-gray-700 truncate">{product.title}</h3>

                {/* View Button */}
                <button onClick={() => handleOpenModal(product)} className="mt-10 w-32 py-1.5 bg-custom-brown text-white rounded-md hover:bg-custom-brown/80 transition text-sm">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      <Footer />
    </>
  );
}

function ProductModal({ product, onClose }) {
  const seller = {
    name: "John Doe",
    phone: "+123456789",
    whatsapp: "+123456789"
  };

  // Ensure that certiImages exists in the product object before trying to map over it
  const certiImages = product.certiImages || []; // Fallback to empty array if certiImages is undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white w-[80%] lg:w-[70%] rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <button
          onClick={onClose}
          className="absolute text-2xl text-gray-500 top-4 right-4"
        >
          &times;
        </button>

        {/* Left Side: Product Image and Description */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[300px] h-[300px]">
            <Image
              src={`${API_URL}/${product.image[0]}`} // Assuming the first image in the array is the main image
              alt={product.title}
              layout="fill"
              objectFit="contain"
              className="object-cover rounded-lg"
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-center">{product.title}</h2>
          <p className="mt-4 text-lg text-center text-gray-700">{product.description}</p>
        </div>

        {/* Right Side: Seller Info */}
        <div className="flex flex-col items-start justify-start">
          <h3 className="text-xl font-bold text-custom-brown">Seller Information</h3>
          <p className="mt-2 text-lg">Name: {product.sellerName}</p>
          <p className="mt-2 text-lg">Phone: {product.sellerCall}</p>
          <p className="mt-2 text-lg">WhatsApp: {product.sellerWa}</p>

          <div className="pt-4 mt-6 border-t-2 border-gray-200">
            <h3 className="text-xl font-bold text-custom-brown">Product Certifications</h3>
            <div className="flex gap-4 mt-2">
              {certiImages.map((cert, index) => (
                <div key={index} className="w-[80px] h-[80px] relative">
                  <Image
                    src={`${API_URL}/${cert}`}  // Assuming cert is the image file path from backend
                    alt={`Certification ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
