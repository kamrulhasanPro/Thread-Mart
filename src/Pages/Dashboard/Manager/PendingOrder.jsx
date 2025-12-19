import React, { useState } from "react";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { useAuth } from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading";
import { MdEdit } from "react-icons/md";
import { FaCheckCircle, FaEye, FaTimes } from "react-icons/fa";
import ConfirmModal from "../../../Components/ConfirmModal";
import { Link } from "react-router";

const PendingOrder = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { user } = useAuth();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-orders", user?.email],
    queryFn: async () =>
      (await axiosPublic(`orders/${user?.email}/orderStatus?status=pending`))
        .data,
    enabled: !!user?.email,
  });

  console.log(orders);

  const handleOpenModal = (id, updateValue) => {
    setSelectedId({ id, updateValue });
    setOpen(true);
    // orderStatusUpdate(id, updateValue);
  };

  const orderStatusUpdate = async (id, updateValue) => {
    const updateStatus = await axiosPublic.patch(`/orders/${id}/statusUpdate`, {
      orderStatus: updateValue,
    });
    console.log(updateStatus);
    if (updateStatus.data.modifiedCount) {
      setOpen(false);
      refetch();
    }
  };
  return (
    <section>
      <div>
        <DashboardTitle>Pending Orders</DashboardTitle>
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
                <th>Order Date</th>
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

                  {/* Order Date */}
                  <td>{new Date(order.createdAt).toLocaleString()}</td>

                  {/* action */}
                  <td>
                    <div className="flex items-center justify-start gap-2">
                      <button
                        onClick={() => orderStatusUpdate(order._id, "approved")}
                        className="p-1.5 cursor-pointer bg-emerald-400 rounded-full text-lg inline-block"
                      >
                        <FaCheckCircle />
                      </button>
                      <button
                        onClick={() => handleOpenModal(order._id, "rejected")}
                        className="p-1.5 cursor-pointer bg-red-400 rounded-full text-lg"
                      >
                        <FaTimes />
                      </button>
                      <Link
                        to={`/product/${order.productId}`}
                        className="p-1.5 cursor-pointer bg-blue-400 rounded-full text-lg"
                      >
                        <FaEye />
                      </Link>
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
                Not Found Any Order
              </p>
            )
          )}
        </div>
        <ConfirmModal
          isOpen={open}
          type="info"
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          confirmText="Yes, Delete"
          confirmColor="bg-red-400"
          onConfirm={() =>
            orderStatusUpdate(selectedId.id, selectedId.updateValue)
          }
          onCancel={() => setOpen(false)}
        />
      </div>
    </section>
  );
};

export default PendingOrder;
