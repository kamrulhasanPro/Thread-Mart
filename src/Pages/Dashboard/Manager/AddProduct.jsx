import React, { useEffect, useState } from "react";
import HeadTitle from "../../../Components/share/HeadTitle";
import { Controller, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../../Hooks/useAuth";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../../../Components/share/Loading";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import RichTextEditor from "../../../Components/share/RichTextEditor";

const AddProduct = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [filesValue, setFilesValue] = useState([]);
  const [previewImg, setPreviewImag] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues:{
      description: ""
    }
  });

  const inputBox = (condition) =>
    `w-full border px-4 py-3 rounded-md outline-none border-primary/20 focus:border-primary transition-all validator ${
      condition && "border-red-400 focus:border-red-400"
    }`;

  // image upload in imgBB
  const imagesUpload = async (photos) => {
    const uploadURLS = [];
    for (const photo of photos) {
      const fromData = new FormData();
      fromData.append("image", photo);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        fromData
      );
      const url = response?.data?.data?.display_url;
      if (url) {
        uploadURLS.push(url);
      }
      console.log(response.data);
    }
    return uploadURLS;
  };

  // preview image handle
  const handlePreview = (files) => {
    const productImages = Array.from(files);
    const newPreviews = productImages.map((file) => URL.createObjectURL(file));
    setPreviewImag([...previewImg, ...newPreviews]);
    setFilesValue([...filesValue, ...files]);
    console.log(productImages);
  };

  // cleanup
  useEffect(() => {
    return () => {
      previewImg.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImg]);

  const queryClient = useQueryClient();
  // post product
  const handlePostProduct = async (data) => {
    setLoading(true);
    data.managerEmail = user?.email;
    data.showOnHomePage = false;
    data.createdAt = new Date();
    data.images = await imagesUpload(filesValue);
    console.log(data);
    try {
      const result = await axiosPublic.post(`/product/post`, data);
      if (result.data.insertedId) {
        reset();
        queryClient.invalidateQueries("products");
        setLoading(false);
        setFilesValue([]);
        setPreviewImag([]);
        toast.success("Complete Your Post");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.code);
    }
  };

  const TotalQuantity = useWatch({
    name: "availableQuantity",
    control,
  });
  const editContent = useWatch({
    name: "description",
    control,
  });

  console.log(editContent);

  return (
    <section>
      <title>ThreadMart Dashboard | Add Product</title>

      <div className="text-white">
        <DashboardTitle>Add Product</DashboardTitle>

        <form onSubmit={handleSubmit(handlePostProduct)}>
          {/* parent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* general information */}
            <div className="boxStyle ">
              <p>General Information</p>
              <input
                type="text"
                placeholder="Product Title"
                className={inputBox(errors.productName)}
                {...register("productName", { required: "Enter Product Name" })}
              />
              {errors.productName && (
                <p className="text-red-400 text-sm">
                  {errors.productName.message}
                </p>
              )}

              <Controller
                name="description"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.replace(/<[^>]*>/g, "").trim().length > 0
                      ? true
                      : "Enter Product Description",
                }}
                render={({ field }) => (
                  <RichTextEditor
                  placeholder={"Product Description"}
                    condition={errors.description}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-400 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* images */}
            <div className="boxStyle order-4 sm:order-2">
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
              <div
                className={`h-42 bg-green-200/20 border border-dashed rounded-lg border-primary p-4 flex items-center justify-center gap-2 ${inputBox(
                  filesValue.length === 0
                )}`}
              >
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
              {filesValue.length === 0 && (
                <p className="text-red-400 text-sm">{errors.images?.message}</p>
              )}

              {/* add image button */}
              <button type="button" className="w-full">
                <label
                  htmlFor="product-images"
                  className="bg-green-200/50 rounded-sm py-1 px-3 text-green-300 text-center  block cursor-pointer"
                >
                  + Add Image
                </label>
              </button>
            </div>

            {/* pricing & other information */}
            <div className="boxStyle order-2 sm:order-3">
              <p>Pricing & Quantity</p>
              <input
                type="number"
                placeholder="Per Price"
                className={inputBox(errors.price)}
                {...register("price", {
                  required: "Enter Product Price",
                  min: {
                    value: 1,
                    message: "Price must be greater than 0",
                  },
                })}
              />
              {errors.price && (
                <p className="text-red-400 text-sm">{errors.price.message}</p>
              )}
              <div className="flex gap-2 flex-col sm:flex-row">
                <div>
                  <input
                    type="number"
                    placeholder="Available Quantity"
                    className={inputBox(errors.availableQuantity)}
                    {...register("availableQuantity", {
                      required: "Enter product quantity",
                      min: {
                        value: 0,
                        message: "Quantity cannot be negative",
                      },
                    })}
                  />
                  {errors.availableQuantity && (
                    <p className="text-red-400 text-sm">
                      {errors.availableQuantity.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Minimum Order"
                    className={inputBox(errors.moq)}
                    {...register("moq", {
                      required: "Enter minium order quantity",
                      min: {
                        value: 1,
                        message: "Minimum Order must be at least 1",
                      },
                      max: {
                        value: TotalQuantity,
                        message: `Maximum Order must be at least ${TotalQuantity}`,
                      },
                    })}
                  />
                  {errors.moq && (
                    <p className="text-red-400 text-sm">{errors.moq.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* category & payment method */}
            <div className="boxStyle order-3 sm:order-4">
              <p>Category & Payment Method</p>

              {/* category */}
              <select
                defaultValue=""
                className={`${inputBox(errors.category)} [&>*]:bg-secondary
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
              {errors.category && (
                <p className="text-red-400 text-sm">
                  {errors.category.message}
                </p>
              )}

              {/* payment method */}
              <select
                defaultValue=""
                className={`${inputBox(errors.paymentOption)} [&>*]:bg-secondary
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
              {errors.paymentOption && (
                <p className="text-red-400 text-sm">
                  {errors.paymentOption.message}
                </p>
              )}
            </div>
          </div>

          {/* submit button */}
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            {loading ? <Loading /> : "Post Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
