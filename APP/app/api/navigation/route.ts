import { getNavItems } from "@/app/(home)/components/Navigation/Header/api/getNavItems";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getNavItems();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch navigation:", error); // Log fejl for debugging
    return NextResponse.json(
      { error: "Failed to fetch navigation", details: error.message },
      { status: 500 }
    );
  }
}
