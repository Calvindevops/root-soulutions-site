"use client";

import { Handshake } from "@phosphor-icons/react";

export default function AdminWholesale() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Wholesale Inquiries</h1>
      
      <div className="bg-white rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <Handshake weight="duotone" size={48} color="#d1d5db" />
        <h2 className="text-gray-500 text-lg mt-4 font-semibold">No wholesale inquiries yet</h2>
        <p className="text-gray-400 text-sm mt-2 max-w-sm">
          Inquiries from the wholesale form will appear here.
        </p>
      </div>
    </div>
  );
}
