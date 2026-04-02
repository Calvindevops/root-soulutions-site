import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// n8n polls this endpoint to get new subscribers since last check
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get("since");
  const secret = searchParams.get("secret");

  // Simple shared secret auth
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();
  let query = supabase
    .from("subscribers")
    .select("id, email, subscribed_at")
    .order("subscribed_at", { ascending: false });

  if (since) {
    query = query.gt("subscribed_at", since);
  }

  const { data, error } = await query.limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    subscribers: data || [],
    count: data?.length || 0,
    fetched_at: new Date().toISOString(),
  });
}
