import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/analytics/getanalysis";
import { analyticsResponseSchema } from "@/lib/analytics/schema";
import { checkRateLimit } from "@/lib/analytics/rate-limits";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "anonymous";

  const rate = checkRateLimit(ip);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))
          ),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const rawData = await getAnalyticsData();
    const validatedData = analyticsResponseSchema.parse(rawData);

    return NextResponse.json(validatedData, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        "X-RateLimit-Remaining": String(rate.remaining),
      },
    });
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      { error: "Failed to load analytics data." },
      { status: 500 }
    );
  }
}
