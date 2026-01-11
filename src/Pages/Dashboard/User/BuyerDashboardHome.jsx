import React from "react";
import ViewCard from "../../../Components/Dashboard/ViewCard";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../Hooks/useRole";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { GoChecklist, GoClock, GoCheckCircle, GoXCircle } from "react-icons/go";
import Loading from "../../../Components/share/Loading";
import StatusChart from "../../../Components/ReChart/StatusChart";
import RevenueChart from "../../../Components/ReChart/RevenueChart";

const BuyerDashboardHome = () => {
  const { role } = useRole();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["buyer-stats", role],
    queryFn: async () => (await axiosPublic("/buyer/dashboard-stats")).data,
  });

  if (isLoading) {
    return <Loading />;
  }

  const { myOrders, pendingOrders, rejectedOrders, deliveredOrders } = stats;

  const buyerStats = [
    {
      label: "My Orders",
      value: myOrders,
      icon: GoChecklist,
      color: "text-blue-600 bg-blue-400/10",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: GoClock,
      color: "text-yellow-600 bg-yellow-400/10",
    },
    {
      label: "Delivered Orders",
      value: deliveredOrders,
      icon: GoCheckCircle,
      color: "text-green-600 bg-green-400/10",
    },
    {
      label: "Rejected Orders",
      value: rejectedOrders,
      icon: GoXCircle,
      color: "text-red-600 bg-red-400/10",
    },
  ];

  console.log(stats);
  return (
    <>
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5  ">
        {/* stats show */}
        {buyerStats.map((item, i) => (
          <ViewCard
            key={i}
            label={item.label}
            Icon={item.icon}
            value={item.value}
            color={item.color}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <RevenueChart />
        <StatusChart />
      </div>
    </>
  );
};

export default BuyerDashboardHome;
