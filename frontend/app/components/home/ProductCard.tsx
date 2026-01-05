"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({
  product,
}: {
  product: {
    id: number;
    name: string;
    price: string;
    unit: string;
    distance: string;
    category: string;
    image?: string;
  };
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement add to cart functionality
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement wishlist functionality
  };

  return (
    <Link href={`/productDetails/${product.id}`} className="block bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100">
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 rounded-lg sm:rounded-xl mb-2 sm:mb-2.5 flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400 text-2xl sm:text-3xl font-black">{product.name[0]}</div>
        )}
        <button 
          onClick={handleWishlist}
          className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-6 sm:w-7 h-6 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors z-10"
        >
          <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="mb-2 sm:mb-2.5">
        <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5">{product.distance}</div>
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 group-hover:text-violet-700 transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-sm sm:text-base font-black text-gray-900">
          {product.price} <span className="text-[10px] sm:text-xs font-normal text-gray-500">bdt {product.unit}</span>
        </p>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full py-1.5 sm:py-2 bg-black text-white rounded-full font-semibold text-xs sm:text-sm hover:bg-violet-600 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
      >
        <ShoppingCart className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
        <span>Add to Cart</span>
      </button>
    </Link>
  );
};

export default ProductCard;
