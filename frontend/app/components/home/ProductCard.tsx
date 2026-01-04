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
    console.log(`Added product ${product.id} to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added product ${product.id} to wishlist`);
  };

  return (
    <Link href={`/productDetails/${product.id}`} className="block bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-lg mb-2.5 flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400 text-3xl font-black">{product.name[0]}</div>
        )}
        <button 
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors z-10"
        >
          <Heart className="w-3.5 h-3.5 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="mb-2.5">
        <div className="text-xs text-gray-500 mb-0.5">{product.distance}</div>
        <h3 className="text-sm font-bold text-gray-900 mb-0.5 group-hover:text-violet-700 transition-colors">{product.name}</h3>
        <p className="text-base font-black text-gray-900">
          {product.price} bdt <span className="text-xs font-normal text-gray-500">{product.unit}</span>
        </p>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full py-2 bg-black text-white rounded-full font-semibold text-sm hover:bg-violet-600 transition-all flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        <span>Add to Cart</span>
      </button>
    </Link>
  );
};

export default ProductCard;
