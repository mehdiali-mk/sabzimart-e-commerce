import React from "react";
import MainBanner from "../components/MainBanner.jsx";
import Categories from "../components/Categories.jsx";

export default function Home() {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
    </div>
  );
}
