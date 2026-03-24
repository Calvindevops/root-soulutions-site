"use client";

import { Envelope } from "@phosphor-icons/react";

export default function AdminSubscribers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
        <button 
          className="bg-gray-100 text-gray-400 rounded-lg px-4 py-2 font-semibold cursor-not-allowed"
          disabled
        >
          Export CSV
        </button>
      </div>
      
      <div className="bg-white rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <Envelope weight="duotone" size={48} color="#d1d5db" />
        <h2 className="text-gray-500 text-lg mt-4 font-semibold">No subscribers yet</h2>
        <p className="text-gray-400 text-sm mt-2 max-w-sm">
          Newsletter signups will appear here.
        </p>
      </div>
    </div>
  );
}
