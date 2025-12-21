import React, { useRef, useState } from "react";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { useAuth } from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading";
import ReuseableModal from "../../../Components/ReuseableModal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { MdDateRange, MdLocationPin } from "react-icons/md";

const ApproveOrder = () => {
  const STEPS = [
    "Picked",
    "Packed",
    "Shipped",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];
  const { user } = useAuth();
  const addTrackRef = useRef(null);
  const viewTrackRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approved-orders", user?.email],
    queryFn: async () =>
      (await axiosPublic(`/orders/${user?.email}/orderStatus?status=approved`))
        .data,
    enabled: !!user?.email,
  });

  const { data: updates = [] } = useQuery({
    queryKey: ["tracking-timeline", selectedId],
    queryFn: async () =>
      (await axiosPublic(`/tracking-get/${selectedId}`)).data.updates,
    enabled: !!selectedId,
  });

  console.log(updates);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log(orders);

  const handleTracking = async (data) => {
    console.log(data);
    const addTrack = await axiosPublic.patch(
      `/tracking-add/${selectedId}`,
      data
    );
    if (addTrack.data.modifiedCount) {
      reset();
      setSelectedId(null);
      toast.success("Add Successfully");
      addTrackRef.current.close();
    }
    console.log(addTrack.data);
  };

  const inputBox = (condition) =>
    `w-full border px-4 py-3 rounded-md outline-none border-primary/20 focus:border-primary transition-all validator ${
      condition && "border-red-400 focus:border-red-400"
    }`;

  return (
    <section>
      <div>
        <DashboardTitle>Approved Orders ({orders.length})</DashboardTitle>
      </div>
      <div>
        <div className="overflow-x-auto border border-gray-600/50 rounded-xl max-h-[calc(100vh-100px)]">
          <table className="table text-nowrap">
            {/* head */}
            <thead className="sticky top-0 bg-secondary">
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Approved Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((order, i) => (
                <tr key={order._id}>
                  <th>{i + 1}</th>

                  {/* Order ID */}
                  <td>{order._id}</td>

                  {/* user */}
                  <td>
                    <div>
                      <p className="font-semibold">{`${order.customer.firstName} ${order.customer.lastName}`}</p>
                      <p className="text-gray-300">
                        {order.customer.buyerEmail}
                      </p>
                    </div>
                  </td>

                  {/* product */}
                  <td>
                    <div>
                      <p className="font-semibold">{order.productName}</p>
                      <p className="text-gray-300">{order.category}</p>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td>{order.orderQuantity}</td>

                  {/* approved Date */}
                  <td>{new Date(order.approvedAt).toLocaleString()}</td>

                  {/* action */}
                  <td>
                    <div className="flex items-center justify-start gap-2">
                      <button
                        onClick={() => {
                          addTrackRef.current.showModal();
                          setSelectedId(order._id);
                        }}
                        className="px-2 py-1.5 cursor-pointer bg-emerald-400 rounded-full text-sm inline-block"
                      >
                        Add Track{" "}
                      </button>
                      <button
                        onClick={() => {
                          viewTrackRef.current.showModal();
                          setSelectedId(order._id);
                        }}
                        className="py-1.5 px-2 cursor-pointer bg-blue-400 rounded-full text-sm"
                      >
                        View Track
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? (
            <div className="h-20">
              <Loading />
            </div>
          ) : (
            orders.length === 0 && (
              <p className="text-lg text-gray-400 font-medium text-center py-10">
                Not Found Approved Order
              </p>
            )
          )}
        </div>

        {/* add track modal */}
        <ReuseableModal modalRef={addTrackRef}>
          <form
            onSubmit={handleSubmit(handleTracking)}
            className="flex flex-col gap-2"
          >
            {/* location */}
            <label htmlFor="">
              <input
                type="text"
                placeholder="Location"
                className={inputBox(errors.location)}
                {...register("location", {
                  required: "Enter delivery product location.",
                })}
              />
              {errors.location && (
                <p className="text-red-400 text-sm">
                  {errors.location.message}
                </p>
              )}
            </label>

            {/* status */}
            <label htmlFor="">
              <select
                defaultValue=""
                className={`${inputBox(errors.status)} [&>*]:bg-secondary
    [&>*]:text-white`}
                {...register("status", {
                  required: "Enter delivery product status.",
                })}
              >
                <option disabled value="">
                  Delivery Status
                </option>
                {STEPS.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-400 text-sm">{errors.status.message}</p>
              )}
            </label>

            {/* note */}
            <label htmlFor="">
              <textarea
                placeholder="Note"
                className={inputBox(errors.note)}
                {...register("note", {
                  required: "Enter delivery product note.",
                })}
              />
              {errors.note && (
                <p className="text-red-400 text-sm">{errors.note.message}</p>
              )}
            </label>
            <div className="space-x-2">
              <button type="submit" className="btn  btn-soft btn-primary">
                Add Track
              </button>
              <button
                type="button"
                onClick={() => addTrackRef.current.close()}
                className="btn btn-soft btn-error"
              >
                Cancel
              </button>
            </div>
          </form>
        </ReuseableModal>

        {/* view tracking */}
        <ReuseableModal modalRef={viewTrackRef}>
          <div className="flex items-center justify-end">
            <button
              onClick={() => viewTrackRef.current.close()}
              className="p-1.5 cursor-pointer bg-red-400 rounded-full text-sm"
            >
              <FaTimes />
            </button>
          </div>

          <ul className="timeline timeline-vertical">
            {STEPS.map((label, i) => {
              const isComplete = updates.find((item) => item.status === label);
              console.log(isComplete);

              return (
                <li key={i}>
                  {i !== 0 && (
                    <hr
                      className={`${isComplete ? "bg-primary" : "bg-gray-300"}`}
                    />
                  )}
                  {i % 2 === 0 && (
                    <div className="timeline-start timeline-box bg-primary/10 text-right">
                      <p className="font-semibold">{label}</p>
                      {isComplete && (
                        <div className="text-gray-300">
                          <p className="flex gap-1 justify-end">
                            <MdDateRange />
                            {new Date(isComplete.updateAt).toLocaleString()}
                          </p>
                          <h5 className="flex gap-1 justify-end">
                            <MdLocationPin />
                            {isComplete.location}
                          </h5>
                          <h5>{isComplete.note}</h5>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`${isComplete && "text-primary"} h-5 w-5`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {i % 2 !== 0 && (
                    <div className="timeline-end timeline-box bg-primary/10">
                      <p className="font-semibold">{label}</p>
                      {isComplete && (
                        <div className="text-gray-300">
                          <p className="flex gap-1">
                            <MdDateRange />
                            {new Date(isComplete.updateAt).toLocaleString()}
                          </p>
                          <h5 className="flex gap-1">
                            <MdLocationPin />
                            {isComplete.location}
                          </h5>
                          <h5>{isComplete.note}</h5>
                        </div>
                      )}
                    </div>
                  )}
                  <hr
                    className={`${isComplete ? "bg-primary" : "bg-gray-300"}`}
                  />
                </li>
              );
            })}
          </ul>
        </ReuseableModal>
      </div>
    </section>
  );
};

export default ApproveOrder;
