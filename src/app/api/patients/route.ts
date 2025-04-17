import { NextResponse } from "next/server";
import { getPatients } from "@/lib/patients";

export const runtime = "edge";          // small, fast, stateless
export const dynamic = "force-static";  // still keeps data on server

export async function GET() {
  const patients = await getPatients();
  return NextResponse.json(patients, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
