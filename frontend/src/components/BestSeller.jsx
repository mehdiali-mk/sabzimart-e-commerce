import React, { useRef } from "react";
import ProductCard from "./ProductCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";

export default function BestSeller() {
  const { products } = useAppContext();

  const swiperRef = useRef(null);

  return (
    <div className="mt-16 relative px-4">
      <p className="text-2xl md:text-3xl font-medium mb-4">Best Seller</p>
      <div
        onMouseEnter={() => {
          if (swiperRef.current) swiperRef.current.autoplay.stop();
        }}
        onMouseLeave={() => {
          if (swiperRef.current) swiperRef.current.autoplay.start();
        }}
      >
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
            reverseDirection: true,
          }}
          // Breakpoints remain exactly the same
          // breakpoints={{
          //   0: { slidesPerView: 2 },
          //   640: { slidesPerView: 3 },
          //   768: { slidesPerView: 5 },
          //   1024: { slidesPerView: 6 },
          //   1280: { slidesPerView: 7 },
          // }}
          // slidesPerView="auto"
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 }, // Reduced from 5
            1024: { slidesPerView: 4 }, // Reduced from 6
            1280: { slidesPerView: 5 }, // Reduced from 7
          }}
          className="pb-6" // Reduced bottom padding since dots are gone
        >
          {products &&
            products.length > 0 &&
            products
              .filter((product) => product.inStock)
              .slice(0, 15)
              .map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
