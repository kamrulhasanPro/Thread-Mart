import React from "react";
import HeadTitle from "../../Components/HeadTitle";
import aboutImage from "../../assets/hero.jpg";
import CountUp from "react-countup";
import { FaShoppingBag, FaTshirt, FaSmileBeam, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";
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

const AboutUs = () => {
  const stats = [
    {
      id: 1,
      value: 5.2,
      suffix: "k",
      label: "Orders Completed",
      icon: <FaShoppingBag className="text-[#32e6e2]" />,
    },
    {
      id: 2,
      value: 18,
      suffix: "k",
      label: "Products Delivered",
      icon: <FaTshirt className="text-green-500" />,
    },
    {
      id: 3,
      value: 1.4,
      suffix: "k",
      label: "Happy Buyers",
      icon: <FaSmileBeam className="text-yellow-400" />,
    },
    {
      id: 4,
      value: 12,
      label: "Years of Excellence",
      icon: <FaAward className="text-purple-500" />,
    },
  ];

  return (
    <section>
      <title>ThreadMart | About Us</title>
      <HeadTitle className={"!mt-0 !mb-5"}>About Us</HeadTitle>
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
          src={aboutImage}
          alt=""
          className="w-full object-cover rounded-2xl
      border-primary border-4 h-80"
        />

        <motion.p variants={fadeUp}>
          “We collaborate closely with our clients...”
        </motion.p>

        <motion.button
          variants={fadeUp}
          className="btn btn-primary btn-outline"
        >
          Explore Collection
        </motion.button>
      </motion.div>

      {/* countup */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col sm:flex-row gap-4 items-center mt-16"
      >
        <div className="flex-1 ">
          <p className="text-lg">A Modern Garment Manufacturing Partner</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-4xl text-primary mb-4 mt-1"
          >
            You bring the vision, and we craft it with precision.
          </motion.h2>
          <p className="text-sm text-gray-400">
            We are a trusted garment manufacturing and export company delivering
            high-quality apparel to global brands. From fabric sourcing to final
            finishing, our production workflow ensures consistency, durability,
            and premium craftsmanship in every piece.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2">
          {stats.map((item) => (
            <div className="bg-secondary p-4 flex flex-col  items-center justify-center border border-gray-400 hover:border-primary duration-300 hover:bg-secondary/50 text-center border-dashed">
              <p className="text-5xl mb-1.5">{item.icon}</p>
              <p className="text-xm text-gray-300">{item.label}</p>
              {/* countup */}
              <CountUp
                start={0}
                end={item.value}
                duration={4}
                // separator=" "
                decimals={0}
                suffix={item?.suffix}
              >
                {({ countUpRef, start }) => (
                  <div className="text-2xl font-semibold">
                    <span ref={countUpRef} />
                    <button onClick={start}>+</button>
                  </div>
                )}
              </CountUp>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
