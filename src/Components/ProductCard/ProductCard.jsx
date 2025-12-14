import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { productName, description, _id, price, images } = product;
  const shortDescription =
    description.length > 50 ? description.slice(0, 50) + "..." : description;
  return (
    <div
      className="bg-[#0f172a]/50 hover:bg-[#111c35] backdrop-blur-md text-secondary-content hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 duration-300 rounded-t-2xl   hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(50,230,226,0.35)] flex flex-col
"
    >
      <figure className="overflow-hidden rounded-t-2xl flex items-center justify-center">
        <img src={images[0]} alt="" />
      </figure>
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-semibold mb-2 grow">{productName}</h3>
        <p className="text-sm text-gray-400">{shortDescription}</p>
        <p className="text-3xl mt-3">
          ${price} <small className="text-sm text-gray-400">/bulk</small>
        </p>
      </div>
      <Link
        to={`/product/${_id}`}
        className="btn btn-block btn-primary text-white bg-[#1eaba8] hover:bg-primary hover:text-secondary border-none rounded-none shadow-none"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
