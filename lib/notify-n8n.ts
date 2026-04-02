// Fire-and-forget webhook to n8n when new leads come in
// n8n receives the data instantly and appends to Google Sheets / Excel

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function notifyN8n(event: string, data: Record<string, unknown>) {
  if (!N8N_WEBHOOK_URL) return;

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString(),
        source: "root-soulutions-site",
      }),
    });
  } catch {
    // Fire and forget — don't block the user's request
  }
}
