import React from "react";
import MainSlider from "../Components/Header/MainSlider";
import MainCategory from "../Components/Products/MainCategory";
import LatestProducts from "../Components/Products/LatestProducts";
const Home = () => {
  return (
    <>
      <MainSlider />
      <MainCategory />
      <LatestProducts />
    </>
  );
};

export default Home;
