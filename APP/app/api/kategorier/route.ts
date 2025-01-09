import { getCategoryData } from "@/app/(home)/(pages)/(article-collections)/(pages)/kategori/api/getCategoryData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getCategoryData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch categories");
    return NextResponse.json(
      { error: "Failed to fetch navigation", details: error.message },
      { status: 500 }
    );
  }
}
