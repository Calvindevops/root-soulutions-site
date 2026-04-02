import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// n8n polls this endpoint to get new wholesale inquiries since last check
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get("since");
  const secret = searchParams.get("secret");

  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();
  let query = supabase
    .from("wholesale_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (since) {
    query = query.gt("created_at", since);
  }

  const { data, error } = await query.limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    inquiries: data || [],
    count: data?.length || 0,
    fetched_at: new Date().toISOString(),
  });
}
