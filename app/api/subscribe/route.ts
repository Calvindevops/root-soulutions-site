import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { notifyN8n } from "@/lib/notify-n8n";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("subscribers").insert({ email });

  if (error && !error.message.includes("duplicate")) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify n8n for auto-sync to Excel
  await notifyN8n("new_subscriber", { email });

  return NextResponse.json({ success: true });
}
