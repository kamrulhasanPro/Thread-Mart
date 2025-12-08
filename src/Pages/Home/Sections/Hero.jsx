import React from "react";
import MyContainer from "../../../Components/MyContainer";
import bannerImage from "../../../assets/heroImage.jpg";

const Hero = () => {
  return (
    <div
      className={
        "flex flex-col-reverse md:flex-row gap-5 items-center min-h-[calc(100vh-80px)]"
      }
    >
      {/* text content */}
      <div className="flex-1">
        {/* tagline */}
        <p className="text-lg sm:text-xl mb-4">
          Trusted Bulk Garment Marketplace
        </p>

        {/* headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-1">
          Streamline Your Garment Orders & Production in One Smart Platform
        </h1>

        {/* description */}
        <p className="text-sm text-gray-400">
          Manage bulk garment orders, track production progress, and connect
          buyers with manufacturers all from one powerful, easy to use platform
          designed for modern apparel businesses.
        </p>

        <div className="flex gap-4 flex-wrap mt-4">
          <button className="btn btn-primary">Browse Collection</button>
          <button className="btn btn-primary btn-outline">
            View Dashboard
          </button>
        </div>

        {/* free time */}
        {/* Stats: 1,200+ Orders | 150+ Suppliers | 98% On-Time */}
      </div>

      {/* image */}
      <div className="flex-1">
        <figure className="rounded-2xl overflow-hidden border-7 border-primary hover:scale-105 hover:rotate-0 rotate-2 transition-all hover:shadow-lg shadow-primary">
          <img
            src={bannerImage}
            alt="heroImage"
            className="object-cover hover:scale-110 transition duration-300"
          />
        </figure>
      </div>
    </div>
  );
};

export default Hero;
