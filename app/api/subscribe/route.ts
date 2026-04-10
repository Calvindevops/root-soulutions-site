import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { notifyN8n } from "@/lib/notify-n8n";

export async function POST(request: Request) {
  const { email, phone, sms_consent } = (await request.json()) as {
    email?: string;
    phone?: string;
    sms_consent?: boolean;
  };

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("subscribers").insert({
    email,
    ...(phone && sms_consent ? { phone, sms_consent: true } : {}),
  });

  if (error && !error.message.includes("duplicate")) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify n8n — includes phone + sms_consent so SMS welcome fires
  await notifyN8n("new_subscriber", {
    email,
    phone: phone || null,
    sms_consent: sms_consent || false,
  });

  return NextResponse.json({ success: true });
}
