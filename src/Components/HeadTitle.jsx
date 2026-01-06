import React from "react";
import { motion } from "framer-motion";
const HeadTitle = ({ children, className }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-primary text-center mb-10 relative after:content-[''] after:block after:w-24 hover:after:w-36 after:duration-500 after:h-1 after:bg-primary after:rounded-full after:mt-2 after:mx-auto mt-16 ${className}`}
    >
      {children}
    </motion.h2>
  );
};

export default HeadTitle;
