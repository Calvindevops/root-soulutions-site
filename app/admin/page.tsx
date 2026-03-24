"use client";

import { ChartBar, ShoppingCart, Users, CurrencyDollar } from "@phosphor-icons/react";
import StatsCard from "@/components/admin/StatsCard";
import { products } from "@/lib/products";

export default function AdminDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">{currentDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={products.length}
          icon={<ChartBar size={24} weight="regular" />}
          color="#2D5A27"
        />
        <StatsCard
          title="Total Orders"
          value="0"
          icon={<ShoppingCart size={24} weight="regular" />}
          color="#e85c2a"
        />
        <StatsCard
          title="Customers"
          value="0"
          icon={<Users size={24} weight="regular" />}
          color="#6B3FA0"
        />
        <StatsCard
          title="Revenue"
          value="$0.00"
          icon={<CurrencyDollar size={24} weight="regular" />}
          color="#F5C542"
        />
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl p-6 shadow-sm min-h-[200px] flex items-center justify-center">
          <p className="text-gray-400">No recent activity</p>
        </div>
      </div>
    </div>
  );
}
