import { useState } from "react";
import Image from "next/image";
import { API_URL } from "@/configs/constants";

export default function SpiceProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fallback to empty string if a field doesn't exist
  const productTitle = product.title || "Product Title Not Available";
  const productImage = product.image && product.image.length > 0 ? `${API_URL}/${product.image[0]}` : "/fallback-image.jpg";
  const productDescription = product.description || "No description available";
  const sellerName = product.sellerName || "Unknown Seller";
  const sellerCall = product.sellerCall || "No phone number available";
  const sellerWa = product.sellerWa || "No WhatsApp available";

  return (
    <div>
      <div className="w-[290px] h-[424px] text-center bg-white shadow-2xl">
        <div className="relative object-cover w-[290px] h-[290px]">
          <Image
            src={productImage}
            alt={productTitle}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <h3 className="mt-4 text-[25px] font-bold text-gray-500 truncate">{productTitle}</h3>
        <button
          onClick={handleOpenModal}
          className="mt-7 w-[105px] h-[32px] bg-custom-green/75 text-white rounded-[12px] text-small hover:bg-custom-green/90 transition"
        >
          View Product
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white w-[80%] lg:w-[70%] rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <button
              onClick={handleCloseModal}
              className="absolute text-2xl text-gray-500 top-4 right-4"
            >
              &times;
            </button>

            {/* Left Side: Product Image and Description */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-[300px] h-[300px]">
                <Image
                  src={productImage}
                  alt={productTitle}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-center">{productTitle}</h2>
              <p className="mt-4 text-lg text-center text-gray-700">{productDescription}</p>
            </div>

            {/* Right Side: Seller Info and Certifications */}
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-xl font-bold text-custom-green">Seller Information</h3>
              <p className="mt-2 text-lg">Name: {sellerName}</p>
              <p className="mt-2 text-lg">Phone: {sellerCall}</p>
              <p className="mt-2 text-lg">WhatsApp: {sellerWa}</p>

              <div className="pt-4 mt-6 border-t-2 border-gray-200">
                <h3 className="text-xl font-bold text-custom-green">Product Certifications</h3>
                <div className="flex gap-4 mt-2">
                  {/* Handle the case where certifications are not available */}
                  {product.certiImages && product.certiImages.length > 0 ? (
                    product.certiImages.map((cert, index) => (
                      <div key={index} className="w-[80px] h-[80px] relative">
                        <Image
                          src={`${API_URL}/${cert}`}  // Assuming cert is the image file path from backend
                          alt={`Certification ${index + 1}`}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-md"
                        />
                      </div>
                    ))
                  ) : (
                    <p>No certifications available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
