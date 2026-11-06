import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return NextResponse.json({
    message: "Certificate download endpoint is ready for Supabase private storage integration.",
    certificateId: id,
    status: "not-configured",
  });
}
