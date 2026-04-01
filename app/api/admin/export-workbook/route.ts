import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import * as XLSX from "xlsx";

export async function GET() {
  const supabase = createServerClient();

  // Fetch all data in parallel
  const [subscribersRes, wholesaleRes, messagesRes] = await Promise.all([
    supabase.from("subscribers").select("*").order("subscribed_at", { ascending: false }),
    supabase.from("wholesale_inquiries").select("*").order("created_at", { ascending: false }),
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
  ]);

  const wb = XLSX.utils.book_new();

  // Sheet 1: Subscribers
  const subscribers = (subscribersRes.data || []).map((s) => ({
    Email: s.email,
    "Signed Up": new Date(s.subscribed_at).toLocaleDateString(),
  }));
  const subWs = XLSX.utils.json_to_sheet(subscribers.length > 0 ? subscribers : [{ Email: "", "Signed Up": "" }]);
  subWs["!cols"] = [{ wch: 35 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(wb, subWs, "Subscribers");

  // Sheet 2: Wholesale Inquiries
  const wholesale = (wholesaleRes.data || []).map((w) => ({
    "Business Name": w.business_name,
    "Contact Name": w.contact_name,
    Email: w.email,
    Phone: w.phone || "",
    "Business Type": w.business_type || "",
    Location: w.location || "",
    Message: w.message || "",
    Status: w.status,
    Date: new Date(w.created_at).toLocaleDateString(),
  }));
  const whWs = XLSX.utils.json_to_sheet(wholesale.length > 0 ? wholesale : [{ "Business Name": "" }]);
  whWs["!cols"] = [{ wch: 25 }, { wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 18 }, { wch: 20 }, { wch: 40 }, { wch: 12 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, whWs, "Wholesale");

  // Sheet 3: Contact Messages
  const messages = (messagesRes.data || []).map((m) => ({
    Name: m.name,
    Email: m.email,
    Phone: m.phone || "",
    Message: m.message,
    Read: m.read ? "Yes" : "No",
    Date: new Date(m.created_at).toLocaleDateString(),
  }));
  const msgWs = XLSX.utils.json_to_sheet(messages.length > 0 ? messages : [{ Name: "" }]);
  msgWs["!cols"] = [{ wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 50 }, { wch: 6 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, msgWs, "Messages");

  // Sheet 4: Summary
  const summary = [
    { Metric: "Total Subscribers", Value: subscribersRes.data?.length || 0 },
    { Metric: "Total Wholesale Inquiries", Value: wholesaleRes.data?.length || 0 },
    { Metric: "Total Contact Messages", Value: messagesRes.data?.length || 0 },
    { Metric: "New Wholesale (Pending)", Value: (wholesaleRes.data || []).filter((w) => w.status === "new").length },
    { Metric: "Report Generated", Value: new Date().toLocaleString() },
  ];
  const sumWs = XLSX.utils.json_to_sheet(summary);
  sumWs["!cols"] = [{ wch: 30 }, { wch: 25 }];
  XLSX.utils.book_append_sheet(wb, sumWs, "Summary");

  // Generate buffer
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const today = new Date().toISOString().split("T")[0];
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="Root-Soulutions-Business-Workbook-${today}.xlsx"`,
    },
  });
}
