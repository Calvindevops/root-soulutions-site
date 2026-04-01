"use client";

import { useEffect, useState } from "react";
import { Handshake, CaretDown, CaretUp, DownloadSimple } from "@phosphor-icons/react";
import { exportToExcel } from "@/lib/export-excel";
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
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/wholesale");
        const data = await res.json();
        setInquiries(data.inquiries || []);
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
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{inquiries.length} total</span>
          <button
            onClick={() => exportToExcel(
              inquiries.map((i) => ({
                "Business Name": i.business_name,
                "Contact Name": i.contact_name,
                Email: i.email,
                Phone: i.phone || "",
                "Business Type": i.business_type || "",
                Location: i.location || "",
                Message: i.message || "",
                Status: i.status,
                "Date": new Date(i.created_at).toLocaleDateString(),
              })),
              "rs-wholesale-inquiries",
              "Wholesale"
            )}
            className="bg-[#2D5A27] text-white rounded-lg px-4 py-2 font-semibold flex items-center gap-2 hover:bg-[#245020]"
          >
            <DownloadSimple size={18} weight="bold" />
            Export Excel
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Summary Row */}
            <button
              onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <div>
                  <div className="font-bold text-gray-900">{inq.business_name}</div>
                  <div className="text-sm text-gray-500">{inq.contact_name} &middot; {inq.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${STATUS_COLORS[inq.status] || "bg-gray-100 text-gray-600"}`}>
                  {inq.status}
                </span>
                <span className="text-xs text-gray-400 hidden md:block">
                  {new Date(inq.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {expanded === inq.id ? (
                  <CaretUp size={18} className="text-gray-400" />
                ) : (
                  <CaretDown size={18} className="text-gray-400" />
                )}
              </div>
            </button>

            {/* Expanded Details */}
            {expanded === inq.id && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Business Name</label>
                    <p className="text-sm text-gray-900 mt-1">{inq.business_name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Contact Name</label>
                    <p className="text-sm text-gray-900 mt-1">{inq.contact_name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
                    <p className="text-sm text-gray-900 mt-1">
                      <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline">{inq.email}</a>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Phone</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {inq.phone ? (
                        <a href={`tel:${inq.phone}`} className="text-blue-600 hover:underline">{inq.phone}</a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Business Type</label>
                    <p className="text-sm text-gray-900 mt-1">{inq.business_type || <span className="text-gray-400">—</span>}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
                    <p className="text-sm text-gray-900 mt-1">{inq.location || <span className="text-gray-400">—</span>}</p>
                  </div>
                </div>
                {inq.message && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
                    <p className="text-sm text-gray-900 mt-1 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">{inq.message}</p>
                  </div>
                )}
                <div className="mt-4 text-xs text-gray-400">
                  Submitted {new Date(inq.created_at).toLocaleString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                    hour: "numeric", minute: "2-digit"
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
