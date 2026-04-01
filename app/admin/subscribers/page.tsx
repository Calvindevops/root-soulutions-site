"use client";

import { useEffect, useState } from "react";
import { Envelope, DownloadSimple, Spinner } from "@phosphor-icons/react";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const res = await fetch("/api/admin/subscribers");
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchSubscribers();
  }, []);

  const exportCSV = () => {
    if (subscribers.length === 0) return;
    const csv = ["email,signed_up", ...subscribers.map(s => `${s.email},${new Date(s.subscribed_at).toLocaleDateString()}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rs-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Subscribers {!loading && <span className="text-gray-400 text-lg">({subscribers.length})</span>}
        </h1>
        <button
          onClick={exportCSV}
          disabled={subscribers.length === 0}
          className={`rounded-lg px-4 py-2 font-semibold flex items-center gap-2 ${subscribers.length > 0 ? "bg-[#2D5A27] text-white hover:bg-[#245020]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
        >
          <DownloadSimple size={18} weight="bold" />
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <Spinner size={32} className="animate-spin text-gray-400" />
        </div>
      ) : subscribers.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <Envelope weight="duotone" size={48} color="#d1d5db" />
          <h2 className="text-gray-500 text-lg mt-4 font-semibold">No subscribers yet</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-sm">
            Newsletter signups from the welcome popup will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Signed Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((s, idx) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(s.subscribed_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
