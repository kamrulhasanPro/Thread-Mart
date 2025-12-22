import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { useAuth } from "../../../Hooks/useAuth";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import Loading from "../../../Components/Loading";
import { FaEye, FaFilter } from "react-icons/fa";
import { Link } from "react-router";
import SearchFilter from "../../../Components/SearchFilter";

const AllOrders = () => {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-orders", searchValue, orderStatus],
    queryFn: async () =>
      (
        await axiosPublic(
          `/all-orders?search=${searchValue}&status=${orderStatus}`
        )
      ).data,
    enabled: !!user?.email,
  });
  console.log(orderStatus);
  return (
    <section>
      <title>ThreadMart Dashboard | All Orders</title>

      <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
        <DashboardTitle>All Orders ({orders?.length})</DashboardTitle>

        {/* search & filter */}
        <SearchFilter
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          filterValue={orderStatus}
          setFilterValue={setOrderStatus}
        >
          <option value="">Filter Status</option>
          <option value={"pending"}>Pending</option>
          <option value={"approved"}>Approved</option>
          <option value={"rejected"}>Rejected</option>
        </SearchFilter>
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
                <th>Status</th>
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
                    <p className="font-semibold">
                      {order?.customer?.firstName} {order?.customer?.lastName}
                    </p>
                    <p className="text-gray-400">
                      {order?.customer?.buyerEmail}
                    </p>
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

                  {/* status */}
                  <td>
                    <p className="font-semibold">{order.orderStatus}</p>
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
      </div>
    </section>
  );
};

export default AllOrders;
