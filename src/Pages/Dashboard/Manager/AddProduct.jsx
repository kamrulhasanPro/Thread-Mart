import React, { useState } from "react";
import HeadTitle from "../../../Components/HeadTitle";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const [previewImg, setPreviewImag] = useState([]);
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const inputBox = `w-full border px-4 py-3 rounded-md outline-none border-primary/20 focus:border-primary transition-all validator`;

  const handlePostProduct = (data) => {
    console.log(data);
  };

  const handlePreview = (files) => {
    const productImages = Array.from(files);
    const newPreviews = productImages.map((file) => URL.createObjectURL(file));
    setPreviewImag([...previewImg, ...newPreviews]);
    console.log(productImages);
  };
  console.log(previewImg);

  return (
    <section>
      <div className="text-white">
        <HeadTitle className={"!mt-0"}>Add Product</HeadTitle>

        <form onSubmit={handleSubmit(handlePostProduct)}>
          {/* parent */}
          <div className="grid grid-cols-2 gap-4">
            {/* general information */}
            <div className="boxStyle">
              <p>General Information</p>
              <input
                type="text"
                placeholder="Product Title"
                className={inputBox}
                {...register("productName", { required: "Enter Product Name" })}
              />

              <textarea
                placeholder="Product Description"
                rows="5"
                className={inputBox}
                {...register("description", {
                  required: "Enter Product Description",
                })}
              ></textarea>
            </div>

            {/* images */}
            <div className="boxStyle">
              <p>Product Media</p>

              <input
                type="file"
                id="product-images"
                multiple
                {...register("images", { required: "Image is required" })}
                onChange={(e) => handlePreview(e.target.files)}
                hidden
              />

              {/* preview */}
              <div className="h-42 bg-green-200/20 border border-dashed rounded-lg border-primary p-4 flex items-center gap-2">
                {previewImg.length === 0
                  ? "Preview Images"
                  : previewImg.map((src, i) => (
                      <figure
                        key={i}
                        className="w-3/12 h-30 rounded-sm overflow-hidden"
                      >
                        <img src={src} className="w-full h-full object-cover" />
                      </figure>
                    ))}
              </div>

              {/* add image button */}
              <label
                htmlFor="product-images"
                className="bg-green-200/50 rounded-sm py-1 px-3 text-green-300 block text-center"
              >
                + Add Image
              </label>
            </div>

            {/* pricing & other information */}
            <div className="boxStyle">
              <p>Pricing & Quantity</p>
              <input
                type="number"
                placeholder="Per Price"
                className={inputBox}
                {...register("price", { required: "Enter Product Price" })}
              />
              <div className="flex gap-2 flex-col sm:flex-row">
                <input
                  type="number"
                  placeholder="Available Quantity"
                  className={inputBox}
                  {...register("availableQuantity", {
                    required: "Enter product quantity",
                  })}
                />
                <input
                  type="number"
                  placeholder="Minimum Order"
                  className={inputBox}
                  {...register("moq", {
                    required: "Enter minium order quantity",
                  })}
                />
              </div>
            </div>

            {/* category & payment method */}
            <div className="boxStyle">
              <p>Category & Payment Method</p>

              {/* category */}
              <select
                defaultValue=""
                className={`${inputBox} [&>*]:bg-secondary
    [&>*]:text-white`}
                {...register("category", { required: "Select a category" })}
              >
                <option disabled value="">
                  Select a category
                </option>
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Cap</option>
              </select>

              {/* payment method */}
              <select
                defaultValue=""
                className={`${inputBox} [&>*]:bg-secondary
    [&>*]:text-white`}
                {...register("paymentOption", {
                  required: "Select a payment method",
                })}
              >
                <option disabled value="">
                  Payment Method
                </option>
                <option>Cash on Delivery</option>
                <option>PayFirst</option>
              </select>
            </div>
          </div>

          {/* submit button */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Post Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
