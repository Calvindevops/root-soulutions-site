"use client";

import { useEffect, useState } from "react";
import { ChartBar, ShoppingCart, Users, CurrencyDollar, Envelope, Handshake, DownloadSimple } from "@phosphor-icons/react";
import StatsCard from "@/components/admin/StatsCard";

interface DashboardStats {
  subscribers: number;
  wholesale: number;
  wholesaleNew: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ subscribers: 0, wholesale: 0, wholesaleNew: 0, messages: 0 });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [subRes, whRes] = await Promise.all([
          fetch("/api/admin/subscribers"),
          fetch("/api/admin/wholesale"),
        ]);
        const subData = await subRes.json();
        const whData = await whRes.json();
        if (subData.error || whData.error) {
          throw new Error(subData.error || whData.error);
        }
        setStats({
          subscribers: subData.subscribers?.length || 0,
          wholesale: whData.inquiries?.length || 0,
          wholesaleNew: (whData.inquiries || []).filter((i: { status: string }) => i.status === "new").length,
          messages: 0,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        console.error("Admin dashboard load failed:", msg);
        setLoadError(msg);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadWorkbook = () => {
    window.location.href = "/api/admin/export-workbook";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">{currentDate}</p>
        </div>
        <button
          onClick={downloadWorkbook}
          className="bg-[#2D5A27] text-white rounded-lg px-5 py-2.5 font-semibold flex items-center gap-2 hover:bg-[#245020] transition shadow-sm"
        >
          <DownloadSimple size={20} weight="bold" />
          Export Business Workbook
        </button>
      </div>

      {loadError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">
          <strong>Dashboard load failed:</strong> {loadError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Subscribers"
          value={loading ? "..." : stats.subscribers}
          icon={<Envelope size={24} weight="regular" />}
          color="#2D5A27"
        />
        <StatsCard
          title="Wholesale Inquiries"
          value={loading ? "..." : stats.wholesale}
          icon={<Handshake size={24} weight="regular" />}
          color="#e85c2a"
        />
        <StatsCard
          title="New Wholesale"
          value={loading ? "..." : stats.wholesaleNew}
          icon={<ShoppingCart size={24} weight="regular" />}
          color="#6B3FA0"
        />
        <StatsCard
          title="Products"
          value="4"
          icon={<ChartBar size={24} weight="regular" />}
          color="#F5C542"
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Business Workbook</h2>
        <p className="text-gray-500 text-sm mb-4">
          Download a full Excel workbook with all your business data — Subscribers, Wholesale Inquiries, Messages, and a Summary sheet.
        </p>
        <button
          onClick={downloadWorkbook}
          className="bg-[#e85c2a] text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2 hover:brightness-110 transition"
        >
          <DownloadSimple size={20} weight="bold" />
          Download .xlsx Workbook
        </button>
      </div>
    </div>
  );
}
