import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};
const About = () => {
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col items-center justify-center
             text-gray-300 text-center gap-5 max-w-3xl mx-auto"
      >
        <motion.p variants={fadeUp}>
          “At ThreadMart, we believe in combining craftsmanship and innovation
          to deliver premium garments...”
        </motion.p>

        <motion.img
          variants={fadeUp}
          src={"https://i.postimg.cc/CxfDRkcL/hero.jpg"}
          alt=""
          className="w-full object-cover rounded-2xl
               border-primary border-4 h-80"
        />

        <motion.p variants={fadeUp}>
          “We collaborate closely with our clients...”
        </motion.p>

        <Link to={"/all-products"} className="btn btn-primary btn-outline">
          Explore Collection
        </Link>
      </motion.div>
    </>
  );
};

export default About;
