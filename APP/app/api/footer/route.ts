import { getFooterItems } from "@/app/(home)/components/Navigation/Footer/api/getFooterItems";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getFooterItems();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch footer:", error);
    return NextResponse.json(
      { error: "Failed to fetch footer" },
      { status: 500 }
    );
  }
}
