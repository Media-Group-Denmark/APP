// app/api/articles/route.ts
import { NextResponse } from "next/server";
import { getFreshArticleData } from "@/app/api/getFreshArticleData";
// ↑ Importér din eksisterende funktion

export async function GET(request: Request) {
  // Læs eventuelle query params (valgfrit)
  const { searchParams } = new URL(request.url);
  const categoryDefined = searchParams.get("category") || undefined;
  const tagDefined = searchParams.get("tag") || undefined;
  const journalistDefined = searchParams.get("journalist") || undefined;

  try {
    const data = await getFreshArticleData(
      categoryDefined,
      tagDefined,
      journalistDefined
    );
    return NextResponse.json(data); // Returnér JSON
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
