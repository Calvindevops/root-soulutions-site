import { NextResponse } from "next/server";
import { getMergedProducts } from "@/lib/fetch-products";

export async function GET() {
  const { products, source } = await getMergedProducts();

  return NextResponse.json(
    { products, source },
    {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
