import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { productName, description, _id, price, images } = product;
  const shortDescription =
    description.length > 50 ? description.slice(0, 50) + "..." : description;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // premium easing
        delay: 0.2,
      }}
      className="bg-[#0f172a]/50 hover:bg-[#111c35] backdrop-blur-md text-secondary-content hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 duration-300 rounded-t-2xl   hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(50,230,226,0.35)] flex flex-col
"
    >
      {/* image */}
      <figure className="overflow-hidden rounded-t-2xl flex items-center justify-center aspect-square">
        <img
          src={images[0]}
          alt=""
          className="w-ful h-full object-cover object-top"
        />
      </figure>

      {/* text content */}
      <div className="p-4 flex flex-col grow">
        {/* name */}
        <h3 className="text-lg font-semibold mb-2 grow">{productName}</h3>

        {/* description */}
        <p className="text-sm text-gray-400">{shortDescription}</p>

        {/* price */}
        <p className="text-3xl mt-3">
          ${price} <small className="text-sm text-gray-400">/per piece</small>
        </p>
      </div>
      {/* button */}
      <Link
        to={`/product/${_id}`}
        className="btn btn-block btn-primary text-white bg-[#1eaba8] hover:bg-primary hover:text-secondary border-none rounded-none shadow-none"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default ProductCard;
