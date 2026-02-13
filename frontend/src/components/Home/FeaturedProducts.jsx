import React from "react";
import { motion } from "motion/react";

import "./FeaturedProducts.css";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const FeaturedProducts = () => {
  const { data, error, isLoading } = useData(
    "/products/featured",
    null,
    ["products", "featured"],
    10 * 60 * 60 * 1000
  );
  // console.log("Data", data);
  let Skeletons = [1, 2, 3];
  return (
    <section className="featured_products">
      <motion.h2
        className="align_center navbar"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Featured Products
      </motion.h2>

      <div className="align_center featured_products_lists">
        {error && <p className="error_message">{error}</p>}
        {data &&
          data.map((product, index) => (
            <motion.div
              className="align_center navbar"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: index * 0.25, ease: "easeInOut" }}
            >
              <ProductCard key={product._id} product={product} />
            </motion.div>
          ))}
        {isLoading &&
          Skeletons.map((item) => <ProductCardSkeleton key={item} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
