import React from "react";
import { motion } from "motion/react";

import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = ({ title, subtitle, image, link }) => {
  return (
    <section className="hero">
      <motion.div
        className="align_center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">{subtitle}</p>
        <Link to={link} className="hero_link">
          Buy Now
        </Link>
      </motion.div>
      <motion.div
        className="align_center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <img src={image} alt="" className="hero_image" />
      </motion.div>
    </section>
  );
};

export default Hero;
