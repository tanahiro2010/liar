// app/api/og/route.ts
import { ImageResponse } from "next/og";
import { DefaultOGP } from "@/components/ogp/default";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const contentType = 'image/png';

export async function GET() {
  // デフォルトOGP（サイト全体用）
  return new ImageResponse(
    <DefaultOGP />
  );
}