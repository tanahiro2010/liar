// app/api/og/route.ts
import { ImageResponse } from "next/og";
import { OGPSample } from "@/components/ogp/sample";

// export const runtime = "edge";
// export const dynamic = "force-dynamic";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "test";

  // デフォルトOGP（サイト全体用）
  return new ImageResponse(
    <OGPSample title={title} author="tanahiro2010"/>
  );
}