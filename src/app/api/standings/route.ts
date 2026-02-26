import { NextRequest, NextResponse } from "next/server";
import { standingsUrl } from "@/lib/espn";
import type { LeagueCode } from "@/lib/types";
import { LEAGUES } from "@/lib/types";

export async function GET(request: NextRequest) {
  const league = request.nextUrl.searchParams.get("league") as LeagueCode;

  if (!league || !(league in LEAGUES)) {
    return NextResponse.json({ error: "Invalid league" }, { status: 400 });
  }

  const res = await fetch(standingsUrl(league), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch standings" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
