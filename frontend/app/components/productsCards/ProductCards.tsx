"use client";

import {
  Bike,
  Car,
  CheckCircle,
  MapPin,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
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
  return (
    <div
      className="
      group 
      bg-white/80 backdrop-blur-xl 
      rounded-3xl shadow-sm 
      hover:shadow-xl 
      transition-all duration-500 
      overflow-hidden border border-violet-200/60 
      hover:border-violet-400/70 hover:-tranviolet-y-3
      max-w-full sm:max-w-sm w-full
      mx-auto
    "
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Discount Badge */}
        <div
          className="
          absolute top-3 left-3 
          bg-gradient-to-r from-violet-500 to-violet-600 
          text-white px-4 py-1.5 rounded-lg 
          font-bold text-xs sm:text-sm shadow-lg
        "
        >
          -{product.discount}% OFF
        </div>

        {/* Verified Badge */}
        {product.verified && (
          <div
            className="
            absolute top-3 right-3 flex items-center gap-1 
            bg-gradient-to-r from-indigo-400 to-violet-500 
            text-white px-3 py-1.5 rounded-full 
            text-[10px] sm:text-xs font-bold shadow-lg
          "
          >
            <CheckCircle className="w-4 h-4" />
            Verified
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-violet-100 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 text-violet-600 fill-violet-600" />
            <span className="font-semibold text-violet-800 text-sm">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-violet-500">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Product Name */}
        <h3
          className="
          font-bold text-violet-800 text-base sm:text-lg mb-2 
          line-clamp-2 group-hover:text-violet-600 
          transition-colors duration-300
        "
        >
          {product.name}
        </h3>

        {/* Store Name */}
        <p className="text-sm text-indigo-600 font-semibold mb-3">
          {product.store}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl sm:text-2xl font-bold text-violet-800">
            ${product.price}
          </span>
          <span className="text-sm text-violet-400 line-through">
            ${product.originalPrice}
          </span>
        </div>

        {/* Location & Travel Times */}
        <div className="space-y-2 mb-4">
          {/* Distance */}
          <div className="flex items-center gap-2 text-violet-600">
            <MapPin className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium">{product.distance}</span>
          </div>

          {/* Travel Times */}
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1 text-violet-600">
              <User className="w-4 h-4 text-violet-600" />
              <span>{product.walkTime}</span>
            </div>
            <div className="flex items-center gap-1 text-violet-600">
              <Bike className="w-4 h-4 text-violet-600" />
              <span>{product.bikeTime}</span>
            </div>
            <div className="flex items-center gap-1 text-violet-600">
              <Car className="w-4 h-4 text-violet-600" />
              <span>{product.carTime}</span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="
          w-full 
          bg-gradient-to-r from-violet-500 to-violet-600 
          hover:from-violet-600 hover:to-violet-700 
          text-white py-3 rounded-2xl 
          font-semibold flex items-center justify-center gap-2 
          transition-all duration-300 shadow-md hover:shadow-lg 
          group/btn active:scale-95
        "
        >
          <ShoppingCart className="w-5 h-5 group-hover/btn:tranviolet-y-[-2px] transition-all duration-300" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCards;
