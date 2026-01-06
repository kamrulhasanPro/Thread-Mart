import React, { useState } from "react";
import HeadTitle from "../../Components/HeadTitle";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../Hooks/axiosPublic";
import Loading from "../../Components/Loading";
import { FaArrowLeft } from "react-icons/fa";

const AllProducts = () => {
  const limit = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const skip = currentPage * limit;
  const { data: { result: products = [], quantity } = {}, isLoading } =
    useQuery({
      queryKey: ["products", skip],
      queryFn: async () =>
        (await axiosPublic(`/products?limit=${limit}&skip=${skip}`)).data,
    });

  const pages = Math.ceil(quantity / limit);
  console.log(pages, currentPage);

  return (
    <section>
      <title>ThreadMart | All Products</title>
      <HeadTitle className={"!mt-0"}>All Products ({quantity})</HeadTitle>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
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
