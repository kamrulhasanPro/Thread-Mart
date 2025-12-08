import React from "react";

const ProductCard = () => {
  return (
    <div className="bg-[#0f172a]/50 backdrop-blur-md text-secondary-content hover:-translate-y-1 border-1 border-transparent hover:border-primary/20 duration-300 rounded-sm">
      <figure className="p-4 flex items-center justify-center">
        <img
          src="https://i.postimg.cc/GhKHnzSB/High_Speed_Racing_Rechargeable_Remote_Co_Non_Brand_9ccd0_360012.png"
          alt=""
        />
      </figure>
      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-2">Racing Car</h3>
        <p className="text-sm text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, vel
          ipsam.
        </p>
        <p className="text-3xl mt-3">$100</p>
      </div>
      <button className="btn btn-block btn-primary text-white bg-[#1eaba8] hover:bg-primary hover:text-secondary border-none rounded-none shadow-none">
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
