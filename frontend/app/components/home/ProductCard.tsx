"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
  distance: string;
  category: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-lg mb-2.5 flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="text-gray-400 text-3xl font-black">{product.name[0]}</div>
        )}
        <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors z-10">
          <Heart className="w-3.5 h-3.5 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="mb-2.5">
        <div className="text-xs text-gray-500 mb-0.5">{product.distance}</div>
        <h3 className="text-sm font-bold text-gray-900 mb-0.5">{product.name}</h3>
        <p className="text-base font-black text-gray-900">
          {product.price} bdt <span className="text-xs font-normal text-gray-500">{product.unit}</span>
        </p>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full py-2 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
        <ShoppingCart className="w-3.5 h-3.5" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductCard;
