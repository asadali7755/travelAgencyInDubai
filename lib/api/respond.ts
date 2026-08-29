import { NextResponse } from "next/server";

export const ok = <T>(data: T, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

export const fail = (
  status: number,
  message: string,
  fields?: Record<string, string[] | undefined>,
) => NextResponse.json({ success: false, error: { message, fields } }, { status });
