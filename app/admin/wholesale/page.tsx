"use client";

import { useEffect, useState } from "react";
import { Handshake } from "@phosphor-icons/react";
import type { WholesaleInquiry } from "@/lib/types";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
};

export default function AdminWholesale() {
  const [inquiries, setInquiries] = useState<WholesaleInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data } = await supabase
          .from("wholesale_inquiries")
          .select("*")
          .order("created_at", { ascending: false });
        if (data) setInquiries(data);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Wholesale Inquiries</h1>
        <div className="bg-white rounded-xl p-12 text-center shadow-sm animate-pulse min-h-[400px]" />
      </div>
    );
  }

  if (inquiries.length === 0) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Wholesale Inquiries</h1>
        <span className="text-sm text-gray-500">{inquiries.length} total</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Business</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Contact</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Type</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Location</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {inquiries.map((inq) => (
              <tr key={inq.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-semibold text-sm text-gray-900">{inq.business_name}</div>
                  {inq.message && (
                    <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">{inq.message}</div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{inq.contact_name}</div>
                  <div className="text-xs text-gray-400">{inq.email}</div>
                  {inq.phone && <div className="text-xs text-gray-400">{inq.phone}</div>}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-600">{inq.business_type || "—"}</td>
                <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-600">{inq.location || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase ${STATUS_COLORS[inq.status] || "bg-gray-100 text-gray-600"}`}>
                    {inq.status}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-400">
                  {new Date(inq.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
