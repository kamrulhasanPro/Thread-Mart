import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Hooks/useAuth";
import { axiosPublic } from "../../Hooks/axiosPublic";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../share/Loading";

const RevenueChart = ({ buyer = false }) => {
  const { user } = useAuth();
  const { data: orderStats = [], isLoading } = useQuery({
    queryKey: ["revenue-stats", user?.email],
    queryFn: async () => (await axiosPublic("/order-stats")).data,
  });
  console.log(orderStats);
  const totals = orderStats.reduce(
    (acc, item) => {
      acc.totalOrders += item.totalOrders;
      acc.revenue += item.revenue;
      return acc;
    },
    { totalOrders: 0, revenue: 0 }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-secondary rounded-xl p-6 shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {buyer ? "My Spending" : "Revenue"} & Orders
        </h3>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-400">Delivered Orders</p>
          <h2 className="text-2xl font-bold">{totals?.totalOrders}</h2>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            {buyer ? "Spending" : "Revenue"}
          </p>
          <h2 className="text-2xl font-bold">৳ {totals?.revenue}</h2>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={orderStats}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                borderRadius: "8px",
                border: "1px solid #334155",
                color: "#e5e7eb",
              }}
              labelStyle={{ color: "#94a3b8" }}
              itemStyle={{ color: "#22d3ee" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
