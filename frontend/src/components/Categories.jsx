import React, { useContext, useRef } from "react";
import { assets, categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext.jsx";

// 1. Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// 2. Import ONLY core Swiper styles (removed navigation & pagination CSS)
import "swiper/css";

// 3. Import the Autoplay module
import { Autoplay } from "swiper/modules";
export default function Categories() {
  const navigate = useAppContext();
  // 1. Create a reference to hold the Swiper instance
  const swiperRef = useRef(null);

  return (
    <div
      className="mt-16 relative px-4"
      onMouseEnter={() => {
        if (swiperRef.current) swiperRef.current.autoplay.stop();
      }}
      onMouseLeave={() => {
        if (swiperRef.current) swiperRef.current.autoplay.start();
      }}
    >
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <Swiper
        // 3. Save the Swiper instance to our ref when it loads
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        // 4. Register the Autoplay module
        modules={[Autoplay]}
        spaceBetween={24}
        // 5. Autoplay & Smooth Scrolling Configuration
        loop={true} // Makes the carousel infinitely loop
        speed={3000} // How fast it scrolls (adjust this number to make it faster/slower)
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        // Breakpoints remain exactly the same
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
        className="pb-6" // Reduced bottom padding since dots are gone
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div
              className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center h-full"
              style={{ backgroundColor: category.bgColor }}
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
              }}
            >
              <img
                src={category.image}
                alt={category.text + " Image"}
                className="group-hover:scale-110 transition max-w-28"
              />
              <p className="text-sm font-medium">{category.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
