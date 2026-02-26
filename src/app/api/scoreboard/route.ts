import { NextRequest, NextResponse } from "next/server";
import { scoreboardUrl } from "@/lib/espn";
import type { LeagueCode } from "@/lib/types";
import { LEAGUES } from "@/lib/types";

export async function GET(request: NextRequest) {
  const league = request.nextUrl.searchParams.get("league") as LeagueCode;

  if (!league || !(league in LEAGUES)) {
    return NextResponse.json({ error: "Invalid league" }, { status: 400 });
  }

  const res = await fetch(scoreboardUrl(league), {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch scoreboard" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
