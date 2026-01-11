import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import Loading from "../../../Components/share/Loading";
import { MdDateRange, MdLocationPin } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const TrackOrder = () => {
  const { orderId } = useParams();
  console.log(orderId);
  const navigate = useNavigate();
  const STEPS = [
    "Picked",
    "Packed",
    "Shipped",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];
  const { data: updates = [] } = useQuery({
    queryKey: ["tracking-timeline", orderId],
    queryFn: async () =>
      (await axiosPublic(`/tracking-get/${orderId}`)).data.updates,
    enabled: !!orderId,
  });
  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["specific-order", orderId],
    queryFn: async () => (await axiosPublic(`/order/${orderId}/specific`)).data,
    enabled: !!orderId,
  });

  const {
    _id,
    productName,
    productPrice,
    orderQuantity,
    totalPrice,
    paymentOption,
    paymentStatus,
    orderStatus,
    createdAt,
    approvedAt,
    notes,
    customer,
  } = order;

  console.log(order);

  if (isLoading) {
    return <Loading className={"!h-screen"} />;
  }

  return (
    <section>
      <title>ThreadMart Dashboard | Track Order</title>

      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">📦 Order Details</h3>
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 cursor-pointer bg-red-400 rounded-full text-sm"
          >
            <FaTimes />
          </button>
        </div>

        {/* Order Info */}
        <div className="space-y-3 text-sm">
          <InfoRow label="Order ID" value={_id} />
          <InfoRow label="Product Name" value={productName} />
          <InfoRow label="Product Price" value={`৳${productPrice}`} />
          <InfoRow label="Order Quantity" value={orderQuantity} />
          <InfoRow label="Total Price" value={`৳${totalPrice}`} />

          <div className="flex justify-between">
            <span className="font-medium">Payment Option</span>
            <span className="badge badge-info">{paymentOption}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Payment Status</span>
            <span
              className={`badge ${
                paymentStatus === "paid" ? "badge-success" : "badge-warning"
              }`}
            >
              {paymentStatus}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Order Status</span>
            <span className="badge badge-primary">{orderStatus}</span>
          </div>

          <InfoRow
            label="Ordered At"
            value={new Date(createdAt).toLocaleString()}
          />
          <InfoRow
            label="Approved At"
            value={
              approvedAt
                ? new Date(approvedAt).toLocaleString()
                : "Not approved yet"
            }
          />
        </div>

        {/* Customer Info */}
        <div className="mt-5 border-t border-dashed border-gray-400 pt-4">
          <h4 className="font-semibold mb-2">👤 Customer Info</h4>
          <InfoRow
            label="Name"
            value={`${customer?.firstName} ${customer?.lastName}`}
          />
          <InfoRow label="Email" value={customer?.buyerEmail} />
          <InfoRow label="Phone" value={customer?.phoneNumber} />
          <InfoRow label="Address" value={customer?.deliveryAddress} />
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-4 border-t pt-3">
            <h4 className="font-semibold">📝 Notes</h4>
            <p className="text-sm text-gray-600">
              {notes || "No additional notes"}
            </p>
          </div>
        )}
      </div>
      <ul className="timeline timeline-vertical mt-5 border-t border-dashed border-gray-400 pt-4">
        <h4
          className="font-semibold mb-2 flex items-center gap-1
            "
        >
          <MdLocationPin fill="red" /> Order Time Line
        </h4>
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
              <hr className={`${isComplete ? "bg-primary" : "bg-gray-300"}`} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-right break-all">{value}</span>
  </div>
);
export default TrackOrder;
