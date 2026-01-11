import React from "react";
import ViewCard from "../../../Components/Dashboard/ViewCard";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../Hooks/useRole";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { GoPackage, GoClock, GoCheckCircle, GoRocket } from "react-icons/go";
import Loading from "../../../Components/share/Loading";
import RevenueChart from "../../../Components/ReChart/RevenueChart";

const ManagerDashboardHome = () => {
  const { role } = useRole();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["manager-stats", role],
    queryFn: async () => (await axiosPublic("/manager/dashboard-stats")).data,
  });

  if (isLoading) {
    return <Loading />;
  }

  const { myProducts, pendingOrders, approvedOrders, deliveredOrders } = stats;

  const managerStats = [
    {
      label: "My Products",
      value: myProducts,
      icon: GoPackage,
      color: "text-green-600 bg-green-400/10",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: GoClock,
      color: "text-yellow-600 bg-yellow-400/10",
    },
    {
      label: "Approved Orders",
      value: approvedOrders,
      icon: GoCheckCircle,
      color: "text-blue-600 bg-blue-400/10",
    },
    {
      label: "Delivered Orders",
      value: deliveredOrders,
      icon: GoRocket,
      color: "text-purple-600 bg-purple-400/10",
    },
  ];

  console.log(stats);
  return (
    <>
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5  ">
        {/* stats show */}
        {managerStats.map((item, i) => (
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
      </div>
    </>
  );
};

export default ManagerDashboardHome;
