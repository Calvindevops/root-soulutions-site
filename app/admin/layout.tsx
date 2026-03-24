"use client";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 text-gray-900">
        {children}
      </main>
    </div>
  );
}
