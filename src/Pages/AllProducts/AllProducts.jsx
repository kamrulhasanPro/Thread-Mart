import React, { useState } from "react";
import HeadTitle from "../../Components/share/HeadTitle";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../Hooks/axiosPublic";
import Loading from "../../Components/share/Loading";
import { FaArrowLeft } from "react-icons/fa";
import SearchFilter from "../../Components/share/SearchFilter";
import { motion } from "framer-motion";

const AllProducts = () => {
  const limit = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const skip = currentPage * limit;
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // fetch products
  const { data: { result: products = [], quantity } = {}, isLoading } =
    useQuery({
      queryKey: ["products", skip, category, searchValue],
      queryFn: async () =>
        (
          await axiosPublic(
            `/products?limit=${limit}&skip=${skip}&category=${category}&search=${searchValue}`
          )
        ).data,
    });

  const pages = Math.ceil(quantity / limit);
  console.log(products.length, quantity);

  // animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  
  return (
    <section>
      <title>ThreadMart | All Products</title>
      <HeadTitle className={"!mt-0"}>All Products</HeadTitle>

      {/* searching and filtering */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex items-center  gap-3 justify-between mb-5"
      >
        <p className="text-gray-400">
          Found Products {quantity}/{products?.length}
        </p>
        <SearchFilter
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          filterValue={category}
          setFilterValue={setCategory}
        >
          <option value="">Filter All</option>
          <option>Shirt</option>
          <option>Pant</option>
          <option>Jacket</option>
          <option>Cap</option>
        </SearchFilter>
      </motion.div>

      {/* product */}
      {isLoading ? (
        <Loading />
      ) : (
        <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </motion.div>
      )}

      {/* pagination */}
      <div className="flex items-center justify-between mt-5">
        {/* preview */}
        <button
          onClick={() => setCurrentPage((pre) => pre - 1)}
          disabled={currentPage === 0 ? true : false}
          className="btn btn-circle btn-accent"
        >
          <FaArrowLeft />
        </button>
        <div className="space-x-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              className={`btn ${currentPage === i && "btn-primary"}`}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {/* next */}
        <button
          className="btn btn-circle btn-accent"
          onClick={() => setCurrentPage((next) => next + 1)}
          disabled={currentPage + 1 === pages ? true : false}
        >
          <FaArrowLeft size={16} className="rotate-180" />
        </button>
      </div>
    </section>
  );
};

export default AllProducts;
