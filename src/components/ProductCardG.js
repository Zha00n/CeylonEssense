import { useState } from "react";
import Image from "next/image";
import { API_URL } from "@/configs/constants";

export default function SpiceProductCard({ title, image, description }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const seller = {
    title: "Jane Smith",
    phone: "+987654321",
    whatsapp: "+987654321"
  };

  const certifications = [
    "/images/c1.png",
    "/images/c2.png",
    "/images/c3.png"
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="w-[290px] h-[424px] text-center bg-white shadow-2xl">
        <div className="relative object-cover w-[290px] h-[290px]">
          <Image
            src={`${API_URL}/${image[0]}`}
            alt="Null"
            layout="fill"
            objectFit="contain"
            className=""
          />
        </div>
        <h3 className="px-5 mt-4 text-[25px] font-bold text-gray-500 truncate">{title}</h3>
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
                  src={image}
                  alt={title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-center">{title}</h2>
              <p className="mt-4 text-lg text-center text-gray-700">{description}</p>
            </div>

            {/* Right Side: Seller Info and Certifications */}
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-xl font-bold text-custom-green">Seller Information</h3>
              <p className="mt-2 text-lg">Name: {seller.title}</p>
              <p className="mt-2 text-lg">Phone: {seller.phone}</p>
              <p className="mt-2 text-lg">WhatsApp: {seller.whatsapp}</p>

              <div className="pt-4 mt-6 border-t-2 border-gray-200">
                <h3 className="text-xl font-bold text-custom-green">Product Certifications</h3>
                <div className="flex gap-4 mt-2">
                  {certifications.map((cert, index) => (
                    <div key={index} className="w-[80px] h-[80px] relative">
                      <Image
                        src={cert}
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
      )}
    </div>
  );
}
