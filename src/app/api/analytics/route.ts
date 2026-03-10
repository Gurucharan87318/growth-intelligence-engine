import { NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/analytics/getanalysis";

export async function GET() {
  try {
    const data = await getAnalyticsData();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch analytics data." },
      { status: 500 }
    );
  }
}
