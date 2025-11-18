import { Bike, Car, CheckCircle, MapPin, ShoppingCart, Star, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Product ={
  id: number
  discount: number
  verified: boolean
  image: string
  rating: number
  reviews: number
  name: string
  store: string
  price: number
  originalPrice: number
  distance: string
  walkTime: string
  bikeTime: string
  carTime: string
}


type ProductCardsProps  = {
  product: Product
  
 
}


const ProductCards = ({ product }: ProductCardsProps  ) => {




  return (
   <div
             
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-orange-200 hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                  -{product.discount}% OFF
                </div>

                {/* Verified Badge */}
                {product.verified && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-800 text-sm">{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>

                {/* Store Name */}
                <p className="text-sm text-orange-600 font-semibold mb-3">
                  {product.store}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-slate-800">
                    ${product.price}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>

                {/* Location & Travel Times */}
                <div className="space-y-2 mb-4">
                  {/* Distance */}
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">{product.distance}</span>
                  </div>

                  {/* Travel Times */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-slate-600">
                      <User className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{product.walkTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Bike className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{product.bikeTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Car className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{product.carTime}</span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg group/btn">
                  <ShoppingCart className="w-5 h-5 group-hover/btn:animate-bounce" />
                  Add to Cart
                </button>
              </div>
            </div>
  )
}

export default ProductCards
