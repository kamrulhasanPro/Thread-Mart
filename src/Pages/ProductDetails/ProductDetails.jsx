import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowCircleLeft } from "react-icons/fa";
import ReviewAndRelevant from "./ReviewAndRelevant";

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const {
    data: {
      availableQuantity,
      category,
      demoVideo,
      description,
      images,
      moq,
      paymentOption,
      price,
      productName,
      _id,
    },
  } = useLoaderData();
  console.log(description, images);

  const backArrow = (
    <FaArrowCircleLeft
      onClick={() => navigate(-1)}
      size={25}
      className="mb-3 mt-1 cursor-pointer"
    />
  );
  return (
    <>
      <section>
        <div className="sm:hidden">{backArrow}</div>
        {/* product details */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 overflow-hidden">
            {/* product image */}
            <Swiper
              loop={true}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Thumbs, Navigation]}
              className="mainSwiper rounded-lg border-4 border-primary/50 aspect-square"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    className="w-full h-full object-cover hover:scale-110 duration-300 object-top"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* thumb image */}
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={4}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="thumbSwiper mt-3"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                      thumbsSwiper ? "border border-primary" : "border-none"
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* product details */}
          <div className="flex-1">
            <div className="hidden sm:inline-block">{backArrow}</div>

            {/* title */}
            <h1 className="text-3xl text-primary">{productName}</h1>

            {/* description */}
            <p className="text-gray-200 mt-4 whitespace-break-spaces text-sm mb-2">
              {description}
            </p>

            {/* category */}
            <p>
              Category: <span className="text-gray-300">{category}</span>
            </p>
            {/* available quantity */}
            <p>
              Available Quantity:{" "}
              <span className="text-gray-300">{availableQuantity} pice</span>
            </p>
            {/* minimum buy */}
            <p>
              Minium Order: <span className="text-gray-300">{moq} pice</span>
            </p>
            {/* Payment Option */}
            <p>
              Payment Options:{" "}
              <span className="text-gray-300">{paymentOption}</span>
            </p>

            {/* price */}
            <p className="text-2xl mt-4 font-medium">
              ৳ {price}{" "}
              <small className="text-sm text-gray-400">per pice</small>
            </p>

            <button className="btn btn-primary w-full mt-5">Order Now</button>
          </div>
        </div>
      </section>

      {/* relevant product */}
      <ReviewAndRelevant category={category} />
    </>
  );
};

export default ProductDetails;
