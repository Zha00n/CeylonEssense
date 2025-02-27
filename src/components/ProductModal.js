import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductModal = ({ product, isOpen, closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simulate an array of product images
  const images = [product.image, "/images/image2.jpg", "/images/image3.jpg"];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentImageIndex(next),
  };

  // Wait until all images are loaded before showing the modal content
  const handleImageLoad = () => {
    // Check if all images are loaded
    const imageElements = document.querySelectorAll(".modal-image");
    const allLoaded = Array.from(imageElements).every((image) => image.complete);
    if (allLoaded) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset loading state when modal is closed
    if (!isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white w-[70%] lg:w-[50%] rounded-xl p-8 overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute text-2xl text-gray-500 top-4 right-4"
        >
          &times;
        </button>

        {/* Conditional rendering based on loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-16 h-16 border-t-4 border-b-4 border-gray-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Slider {...settings}>
              {images.map((img, idx) => (
                <div key={idx} className="flex items-center justify-center">
                  <img
                    src={img}
                    alt={product.name}
                    onLoad={handleImageLoad} // Trigger when each image is loaded
                    className="modal-image object-contain w-full h-[300px] rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}

        {/* Product details after images are loaded */}
        {!isLoading && (
          <>
            <h2 className="mt-4 text-2xl font-bold text-center">{product.name}</h2>
            <p className="mt-4 text-lg text-center text-gray-700">{product.description}</p>
            <div className="mt-6 text-center">
              <button className="px-6 py-2 text-white rounded-lg bg-custom-brown">
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
