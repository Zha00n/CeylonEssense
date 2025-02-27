// Use `useRouter` from 'next/navigation'
"use client"; // Ensure this is a Client Component

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample data (this can be replaced with an API call in a real-world app)
const productData = [
  {
    id: 1,
    name: "Cinnamon",
    description: "Aromatic and flavorful spice perfect for baking and cooking.",
    category: "Spice",
    images: [
      "/images/cinnamon1.png",
      "/images/cinnamon2.png",
      "/images/cinnamon3.png",
    ],
  },
  {
    id: 2,
    name: "Pepper",
    description: "Freshly ground black pepper with rich flavor.",
    category: "Spice",
    images: [
      "/images/pepper1.png",
      "/images/pepper2.png",
      "/images/pepper3.png",
    ],
  },
  // Add more products as needed
];

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Get the product data by ID
  const product = productData.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <div>Loading...</div>; // Handle loading state or product not found
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container py-20 mx-auto">
      <h2 className="mb-4 text-3xl font-bold text-gray-700">{product.name}</h2>

      {/* Image Carousel */}
      <div className="mb-8 carousel">
        <Slider {...settings}>
          {product.images.map((img, idx) => (
            <div key={idx}>
              <Image src={img} alt={`Image ${idx + 1} of ${product.name}`} width={500} height={500} className="object-contain" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <p className="mb-2 text-lg text-gray-600">Category: {product.category}</p>
        <p className="mb-4 text-lg text-gray-600">{product.description}</p>

        {/* Add other product details like price, weight, etc. */}
        <button className="w-[180px] h-[40px] bg-custom-brown text-white rounded-xl text-lg hover:bg-custom-brown/90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
