"use client";

import {
  Heart,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
  id: number;
  discount: number;
  verified: boolean;
  image: string;
  rating: number;
  reviews: number;
  name: string;
  store: string;
  price: number;
  originalPrice: number;
  distance: string;
  walkTime: string;
  bikeTime: string;
  carTime: string;
};

type ProductCardsProps = {
  product: Product;
};

const ProductCards = ({ product }: ProductCardsProps) => {
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
    <Link 
      href={`/productDetails/${product.id}`}
      className="block bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
    >
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-md sm:rounded-lg mb-1.5 sm:mb-2.5 flex items-center justify-center relative overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={handleWishlist}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors z-10"
        >
          <Heart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-600" />
        </button>
        {product.discount > 0 && (
          <span className="absolute top-1 left-1 sm:top-2 sm:left-2 px-1 sm:px-2 py-0.5 bg-red-500 text-white text-[8px] sm:text-xs font-semibold rounded-md sm:rounded-lg z-10">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="mb-1.5 sm:mb-2.5">
        <div className="text-[9px] sm:text-xs text-gray-500 mb-0.5 truncate">{product.distance}</div>
        <h3 className="text-[11px] sm:text-sm font-bold text-gray-900 mb-0.5 line-clamp-2 leading-tight group-hover:text-violet-700 transition-colors">{product.name}</h3>
        <p className="text-xs sm:text-base font-black text-gray-900">
          ${product.price} <span className="text-[9px] sm:text-xs font-normal text-gray-500 line-through">${product.originalPrice}</span>
        </p>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full py-1 sm:py-2 bg-black text-white rounded-full font-semibold text-[10px] sm:text-sm hover:bg-violet-600 transition-all flex items-center justify-center gap-1 sm:gap-2"
      >
        <ShoppingCart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
        <span>Add</span>
        <span className="hidden sm:inline">to Cart</span>
      </button>
    </Link>
  );
};

export default ProductCards;
