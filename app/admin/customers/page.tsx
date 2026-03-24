"use client";

import { Users } from "@phosphor-icons/react";

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      
      <div className="bg-white rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <Users weight="duotone" size={48} color="#d1d5db" />
        <h2 className="text-gray-500 text-lg mt-4 font-semibold">No customers yet</h2>
        <p className="text-gray-400 text-sm mt-2 max-w-sm">
          Customers will appear here when they place an order or create an account.
        </p>
      </div>
    </div>
  );
}
