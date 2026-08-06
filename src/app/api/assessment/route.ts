import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // In production, save to MongoDB via server/index.js
    const reportId = Math.random().toString(36).slice(2, 10);
    return NextResponse.json({
      success: true,
      reportId,
      shareUrl: `/dashboard?share=${reportId}`,
      message: "Assessment progress saved",
    });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  return NextResponse.json({
    id,
    message: "Load saved assessment from localStorage or database",
  });
}
