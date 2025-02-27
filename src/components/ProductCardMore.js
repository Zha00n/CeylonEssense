import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { API_URL } from "@/configs/constants";

export default function SpiceProductCard({ product }) {

  // Fallback to empty string if a field doesn't exist
  const productTitle = product.title || "Product Title Not Available";
  const productImage = product.image && product.image.length > 0 ? `${API_URL}/${product.image[0]}` : "/fallback-image.jpg";

  
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
        <Link href={"/allProducts"}>
        <button
          className="mt-7 w-[105px] h-[32px] bg-custom-green/75 text-white rounded-[12px] text-small hover:bg-custom-green/90 transition"
        >
          View Products
        </button>
        </Link>
      </div>


    </div>
  );
}
