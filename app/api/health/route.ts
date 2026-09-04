import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Liveness check for the site *and* its database.
 *
 * It exists because Supabase pauses a free-tier project after a week without
 * database activity, and this site only touches Postgres when somebody submits
 * an enquiry. A quiet week would therefore put the database to sleep and the
 * next real enquiry — the first one that mattered — would be the one that
 * failed. .github/workflows/keep-alive.yml calls this daily, which both keeps
 * the project awake and turns a broken database into a failed workflow run
 * somebody gets emailed about.
 *
 * `categories` is used deliberately: RLS makes it public reference data, so the
 * query needs no credentials beyond the anon key the browser already carries,
 * and `head: true` returns a count rather than any rows.
 */

// A cached response would never reach Postgres, which is the whole point.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const noStore = { "Cache-Control": "no-store" };

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { ok: false, db: "not-configured" },
      { status: 503, headers: noStore },
    );
  }

  try {
    const supabase = await createServerClient();
    const { error } = await supabase
      .from("categories")
      .select("id", { head: true, count: "exact" });

    if (error) {
      // Logged in full for us, generic for the caller: a public endpoint should
      // not narrate the database's internals to whoever asks.
      console.error("health: database unreachable —", error.message);
      return NextResponse.json(
        { ok: false, db: "unreachable" },
        { status: 503, headers: noStore },
      );
    }

    return NextResponse.json(
      { ok: true, db: "reachable", checkedAt: new Date().toISOString() },
      { headers: noStore },
    );
  } catch (cause) {
    console.error("health:", cause);
    return NextResponse.json(
      { ok: false, db: "unreachable" },
      { status: 503, headers: noStore },
    );
  }
}
