import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

export default function ProductCard({ product }) {
  const {
    currency,
    cartItems,
    addCartItem,
    updateCartQuantity,
    removeCartItem,
    navigate,
  } = useAppContext();

  return (
    product && (
      <div
        className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full h-full flex flex-col justify-between"
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`,
          );
          scrollTo(0, 0);
        }}
      >
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="Star Icon"
                  key={i}
                />
              ))}
            <p>(4)</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-bold text-primary">
              {currency}
              {product.offerPrice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}
                {product.price}
              </span>
            </p>
            <div onClick={(e) => e.stopPropagation()} className="text-primary">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/20 border border-primary-300 md:w-[80px] w-[64px] h-[34px] rounded text-primary-600 font-medium cursor-pointer"
                  onClick={() => addCartItem(product._id)}
                >
                  <img src={assets.cart_icon} alt="Cart Icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/20 rounded select-none border border-primary-300">
                  <button
                    onClick={() => removeCartItem(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center font-bold">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addCartItem(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
