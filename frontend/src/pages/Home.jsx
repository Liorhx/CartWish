import React from "react";

import "./Home.css";
import banner from "../assets/banner.jpg";
import mac from "../assets/mac.jpg";

import Hero from "./../components/Home/Hero";
import FeaturedProducts from "./../components/Home/FeaturedProducts";
const Home = () => {
  return (
    <div>
      <Hero
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of iPhone 14 Pro with most Pro camera ever"
        image={banner}
        link={"/product/6890a23a1b581c0f8cff7df5"}
      />
      <FeaturedProducts />
      <Hero
        title="Build the ultimate setup"
        subtitle="The Future of Computing. In Your Hands"
        image={mac}
        link={"/product/6890a23a1b581c0f8cff7dfe"}
      />
    </div>
  );
};

export default Home;
