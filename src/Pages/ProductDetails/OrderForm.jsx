import React, { useState } from "react";
import HeadTitle from "../../Components/HeadTitle";
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import Loading from "../../Components/Loading";
import { axiosPublic } from "../../Hooks/axiosPublic";
import { toast, ToastContainer } from "react-toastify";

const OrderForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const { data: product } = useLoaderData();
  const splitName = user?.displayName.split(" ");
  const firstName = splitName[0];
  const lastName = splitName[1];
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm();
  const handleOrder = async (data) => {
    const {
      orderQuantity,
      perPrice,
      notes,
      buyerEmail,
      firstName,
      lastName,
      phoneNumber,
      paymentOption,
      productName,
      deliveryAddress,
    } = data;

    data.totalPrice = Number(orderQuantity) * Number(perPrice);
    const newOrder = {
      managerEmail: product?.managerEmail,
      productId: product?._id,
      productName,
      productPrice: perPrice,
      orderQuantity,
      totalPrice,
      paymentOption,
      paymentStatus: "pending",
      orderStatus: "pending",
      customer: {
        firstName,
        lastName,
        buyerEmail,
        phoneNumber,
        deliveryAddress,
      },
      notes,
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      const order = await axiosPublic.post("/orders", newOrder);
      if (order.data?.status === 409) {
        toast.error(order.data.message);
        setLoading(false);
      }
      if (order.data.insertedId) {
        if (paymentOption === "PayFirst") {
          const payment = await axiosPublic.post("/create-checkout-session", {
            orderQuantity,
            productPrice: perPrice,
            email: user?.email,
            orderId: order.data.insertedId,
            productId: product?._id,
            productName,
            images: product?.images,
          });

          if (payment.data.url) {
            window.location.assign(payment.data.url);
          }

          reset();
          setLoading(false);
        } else {
          reset();
          toast.success("Order Success");
          navigator(-1);
        }
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.code);
    }
    console.log(newOrder);
  };
  const inputBox = (condition) =>
    `w-full border px-4 py-3 rounded-md outline-none border-primary/20 focus:border-primary transition-all validator ${
      condition && "border-red-400 focus:border-red-400"
    }`;
  const watchOrderQuantity = useWatch({
    name: "orderQuantity",
    control,
    defaultValue: product?.moq,
  });
  const totalPrice = watchOrderQuantity * product?.price;
  return (
    <section>
      <HeadTitle className={"!mt-0"}>Order Form</HeadTitle>

      {/* order form */}
      <form onSubmit={handleSubmit(handleOrder)}>
        {/* parent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* personal information */}
            <div className="boxStyle">
              <p>Personal Information</p>
              <input
                type="text"
                value={user?.email}
                readOnly
                placeholder="My Email"
                className={inputBox(errors.buyerEmail)}
                {...register("buyerEmail", { required: "Enter Your Email" })}
              />
              {errors.buyerEmail && (
                <p className="text-red-400 text-sm">
                  {errors.buyerEmail.message}
                </p>
              )}

              {/* first and last name */}
              <div className="flex gap-2 flex-col sm:flex-row">
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="First Name"
                    defaultValue={firstName}
                    className={inputBox(errors.firstName)}
                    {...register("firstName", {
                      required: "Enter your FirstName",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </label>
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="Your Last Name"
                    defaultValue={lastName}
                    className={inputBox(errors.lastName)}
                    {...register("lastName", {
                      required: "Your Last Name",
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* product details */}
            <div className="boxStyle">
              <p>Product Details</p>
              <label htmlFor="">
                <p className="text-sm text-gray-300">Product Title</p>
                <input
                  type="text"
                  value={product?.productName}
                  readOnly
                  placeholder="Product Title"
                  className={inputBox(errors.productName)}
                  {...register("productName", { required: "Enter Your Email" })}
                />
                {errors.productName && (
                  <p className="text-red-400 text-sm">
                    {errors.productName.message}
                  </p>
                )}
              </label>

              {/* quantity and price */}
              <div className="flex gap-2 flex-col sm:flex-row pt-2">
                <label htmlFor="">
                  <p className="text-sm text-gray-300">Order Quantity</p>
                  <input
                    type="number"
                    defaultValue={product?.moq}
                    placeholder="Order Quantity"
                    className={inputBox(errors.orderQuantity)}
                    {...register("orderQuantity", {
                      required: "Enter order quantity",
                      min: {
                        value: product?.moq,
                        message: `Order quantity greater than ${product?.moq}`,
                      },
                      max: {
                        value: product?.availableQuantity,
                        message: `Order quantity less than ${product?.availableQuantity}`,
                      },
                    })}
                  />
                  {errors.orderQuantity && (
                    <p className="text-red-400 text-sm">
                      {errors.orderQuantity.message}
                    </p>
                  )}
                </label>

                <label htmlFor="">
                  <p className="text-sm text-gray-300">Par Price</p>
                  <input
                    type="number"
                    placeholder="Per Product Price"
                    className={inputBox(errors.perPrice)}
                    value={product?.price}
                    readOnly
                    {...register("perPrice", {
                      required: "Per Price",
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                    })}
                  />
                  {errors.perPrice && (
                    <p className="text-red-400 text-sm">
                      {errors.perPrice.message}
                    </p>
                  )}
                </label>
              </div>

              <label htmlFor="">
                <p className="text-sm text-gray-300">Total Price</p>
                <input
                  type="text"
                  placeholder="Total Price"
                  className={inputBox(errors.totalPrice)}
                  value={`${product?.price} * ${watchOrderQuantity} = ${totalPrice} ৳`}
                  readOnly
                  {...register("totalPrice", {
                    required: "Total Price",
                    min: {
                      value: 1,
                      message: "Price must be greater than 0",
                    },
                  })}
                />
                {errors.totalPrice && (
                  <p className="text-red-400 text-sm">
                    {errors.totalPrice.message}
                  </p>
                )}
              </label>
            </div>
          </div>

          {/* Delivery details */}
          <div className="boxStyle">
            <p>Delivery Details</p>

            <div className="flex gap-2 flex-col sm:flex-row">
              {/* payment method */}
              <label htmlFor="">
                <p className="text-sm text-gray-300">Payment Method</p>
                <input
                  type="text"
                  placeholder="Payment Method"
                  value={product?.paymentOption}
                  readOnly
                  className={inputBox(errors.paymentOption)}
                  {...register("paymentOption", {
                    required: "Payment Method is required",
                  })}
                />
                {errors.paymentOption && (
                  <p className="text-red-400 text-sm">
                    {errors.paymentOption.message}
                  </p>
                )}
              </label>
              {/* payment method */}
              <label htmlFor="">
                <p className="text-sm text-gray-300">Contact Number</p>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className={inputBox(errors.phoneNumber)}
                  {...register("phoneNumber", {
                    required: "Contract number is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Give me valid phone number without any symbol.",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-400 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </label>
            </div>

            <label htmlFor="">
              <p className="text-sm text-gray-300">Delivery Address</p>
              <input
                type="text"
                placeholder="Delivery Address"
                className={inputBox(errors.deliveryAddress)}
                {...register("deliveryAddress", {
                  required: "Delivery address is required",
                })}
              />
              {errors.deliveryAddress && (
                <p className="text-red-400 text-sm">
                  {errors.deliveryAddress.message}
                </p>
              )}
            </label>

            {/* notes */}
            <label htmlFor="">
              <p className="text-sm text-gray-300 mt-2">Notes</p>
              <textarea
                type="text"
                placeholder="Notes / Instruction"
                className={inputBox(errors.notes)}
                {...register("notes")}
                rows={5}
              />
              {errors.notes && (
                <p className="text-red-400 text-sm">{errors.notes.message}</p>
              )}
            </label>
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
    </section>
  );
};

export default OrderForm;
