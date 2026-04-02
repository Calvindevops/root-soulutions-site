import { NextResponse } from "next/server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

interface WholesaleData {
  business_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  business_type?: string;
  location?: string;
  message?: string;
}

export async function POST(request: Request) {
  const data = (await request.json()) as WholesaleData;

  if (!data.email || !data.business_name || !data.contact_name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Save to Supabase
  try {
    const { supabase } = await import("@/lib/supabase");
    await supabase.from("wholesale_inquiries").insert({
      business_name: data.business_name,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone || null,
      business_type: data.business_type || null,
      location: data.location || null,
      message: data.message || null,
    });
  } catch (err) {
    console.error("Supabase wholesale insert error:", err);
  }

  // Notify n8n for auto-sync to Excel/Sheets
  try {
    const { notifyN8n } = await import("@/lib/notify-n8n");
    await notifyN8n("wholesale_inquiry", {
      business_name: data.business_name,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone,
      business_type: data.business_type,
      location: data.location,
      message: data.message,
    });
  } catch {
    // Don't block on n8n
  }

  // Push to Shopify as a tagged customer
  if (adminToken && domain) {
    try {
      const nameParts = data.contact_name.split(" ");
      const firstName = nameParts[0] || data.contact_name;
      const lastName = nameParts.slice(1).join(" ") || "";

      const note = [
        `WHOLESALE INQUIRY`,
        `Business: ${data.business_name}`,
        data.business_type ? `Type: ${data.business_type}` : null,
        data.location ? `Location: ${data.location}` : null,
        data.phone ? `Phone: ${data.phone}` : null,
        data.message ? `Message: ${data.message}` : null,
        `Submitted: ${new Date().toISOString()}`,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch(
        `https://${domain}/admin/api/2024-10/customers.json`,
        {
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": adminToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: {
              first_name: firstName,
              last_name: lastName,
              email: data.email,
              phone: data.phone || undefined,
              tags: "wholesale",
              note,
              metafields: [
                {
                  key: "business_name",
                  value: data.business_name,
                  type: "single_line_text_field",
                  namespace: "wholesale",
                },
                {
                  key: "business_type",
                  value: data.business_type || "Not specified",
                  type: "single_line_text_field",
                  namespace: "wholesale",
                },
              ],
            },
          }),
        }
      );

      if (!res.ok) {
        const body = await res.text();
        // If customer already exists, try to update tags
        if (body.includes("has already been taken")) {
          // Search for existing customer and add wholesale tag
          const searchRes = await fetch(
            `https://${domain}/admin/api/2024-10/customers/search.json?query=email:${encodeURIComponent(data.email)}`,
            {
              headers: {
                "X-Shopify-Access-Token": adminToken,
                "Content-Type": "application/json",
              },
            }
          );
          if (searchRes.ok) {
            const { customers } = await searchRes.json();
            if (customers?.[0]) {
              const existingTags = customers[0].tags || "";
              const newTags = existingTags.includes("wholesale")
                ? existingTags
                : `${existingTags}, wholesale`.replace(/^, /, "");

              await fetch(
                `https://${domain}/admin/api/2024-10/customers/${customers[0].id}.json`,
                {
                  method: "PUT",
                  headers: {
                    "X-Shopify-Access-Token": adminToken,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    customer: {
                      id: customers[0].id,
                      tags: newTags,
                      note: `${customers[0].note || ""}\n\n---\n${note}`,
                    },
                  }),
                }
              );
            }
          }
        } else {
          console.error("Shopify customer create error:", body);
        }
      }
    } catch (err) {
      console.error("Shopify wholesale sync error:", err);
      // Don't fail the request — Supabase already has the data
    }
  }

  return NextResponse.json({ success: true });
}
