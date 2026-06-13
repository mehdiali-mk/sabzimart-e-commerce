import React from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";

export default function MainBanner() {
  return (
    <div>
      <div className="relative">
        <img
          src={assets.main_banner_bg}
          alt="Main Banner"
          className="w-full hidden md:block"
        />
        <img
          src={assets.main_banner_bg_sm}
          alt="Main Banner"
          className="w-full md:hidden"
        />

        <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-12 mb:pb-0 px-4 md:pl-18 lg:pl-32">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 sm:max-w-80 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
            Freshens You Can Trust, Savings You Will Love!
          </h1>
          <div className="flex items-center mt-6 font-medium gap-2">
            <Link
              to="/products"
              className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
            >
              Shop Now{" "}
              <img
                className="md:hidden transition group-focus:translate-x-1"
                src={assets.white_arrow_icon}
                alt="Arrow Icon"
              />
            </Link>
            <Link
              to="/products"
              className="group hidden md:flex items-center gap-2 px-9 py-3  transition rounded  cursor-pointer"
            >
              Explore Details{" "}
              <img
                className="transition group-focus:translate-x-1 group-hover:pl-2"
                src={assets.black_arrow_icon}
                alt="Back Icon"
              />
            </Link>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
