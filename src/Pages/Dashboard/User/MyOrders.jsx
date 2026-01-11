import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { useAuth } from "../../../Hooks/useAuth";
import ConfirmModal from "../../../Components/share/ConfirmModal";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import Loading from "../../../Components/share/Loading";
import { FaEye, FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";
import ReuseableModal from "../../../Components/share/ReuseableModal";
import { MdDateRange, MdLocationPin } from "react-icons/md";

const MyOrders = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const openModalRef = useRef(null);
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => (await axiosPublic(`/my-orders/${user?.email}`)).data,
    enabled: !!user?.email,
  });

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleRemove = async (id) => {
    const result = await axiosPublic.delete(`/order/${id}/delete`);
    if (result.data.deletedCount) {
      toast.success("Delete success");
      refetch();
      setOpen(false);
    }
  };

  return (
    <section>
      <title>ThreadMart Dashboard | My Orders</title>

      <div>
        <DashboardTitle>My Orders ({orders?.length})</DashboardTitle>
      </div>
      <div>
        <div className="overflow-x-auto border border-gray-600/50 rounded-xl max-h-[calc(100vh-100px)]">
          <table className="table text-nowrap">
            {/* head */}
            <thead className="sticky top-0 bg-secondary">
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Payment</th>
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

                  {/* product */}
                  <td>
                    <div>
                      <p className="font-semibold">{order.productName}</p>
                      <p className="text-gray-300">{order.category}</p>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td>{order.orderQuantity}</td>

                  {/* status */}
                  <td>
                    <p className="font-semibold">{order.orderStatus}</p>
                  </td>

                  {/* payment */}
                  <td>
                    <p className="font-semibold">{order.paymentStatus}</p>
                  </td>

                  {/* action */}
                  <td>
                    <div className="flex items-center justify-start gap-2">
                      <Link
                        to={`/dashboard/track-order/${order._id}`}
                        className="p-1.5 cursor-pointer bg-blue-400 rounded-full text-lg"
                      >
                        <FaEye />
                      </Link>
                      {order.orderStatus === "pending" && (
                        <button
                          title="Remove"
                          onClick={() => handleOpenModal(order._id)}
                          className="p-1.5 cursor-pointer bg-red-400 rounded-full text-lg"
                        >
                          <FaTimes />
                        </button>
                      )}
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
          onConfirm={() => handleRemove(selectedId)}
          onCancel={() => setOpen(false)}
        />

        {/* show details & and order status timeline */}
        {/* view tracking */}
        <ReuseableModal modalRef={openModalRef}></ReuseableModal>
      </div>
    </section>
  );
};

export default MyOrders;
