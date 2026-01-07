import React from "react";
import MyContainer from "../../../Components/MyContainer";
import bannerImage from "../../../assets/heroImage.jpg";
import herosecond from "../../../assets/herosecond.jpg";
import herofourth from "../../../assets/herofourth.jpg";
import { Link } from "react-router";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.15 } },
};

const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 items-center justify-between min-h-[calc(100vh-80px)]">
      {/* text content */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.p variants={fadeUp} className="text-lg sm:text-xl mb-4">
          Trusted Bulk Garment Marketplace
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-1"
        >
          Streamline Your Garment Orders & Production in One Smart Platform
        </motion.h1>

        <motion.p variants={fadeUp} className="text-sm text-gray-400">
          Manage bulk garment orders, track production progress, and connect
          buyers with manufacturers all from one powerful, easy to use platform
          designed for modern apparel businesses.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-4 flex-wrap mt-4">
          <Link to={"/all-products"} className="btn btn-primary">
            Browse Collection
          </Link>
          <Link to={"/dashboard"} className="btn btn-primary btn-outline">
            View Dashboard
          </Link>
        </motion.div>
      </motion.div>

      {/* image */}
      <motion.div
        className="flex-1 grid grid-cols-2 gap-4 h-[460px]"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          variants={fadeUp}
          className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src={bannerImage}
            loading="lazy"
            decoding="async"
            alt="hero"
            className="w-full h-full object-cover opacity-80 hover:opacity-100 duration-300 will-change-transform"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src={herosecond}
            alt="hero"
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src={herofourth}
            alt="hero"
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
