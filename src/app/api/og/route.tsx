// app/api/og/route.ts
import { ImageResponse } from "next/og";
import { DefaultOGP } from "@/components/ogp/default";

export async function GET(request: Request) {
  // デフォルトOGP（サイト全体用）
  return new ImageResponse(
    <DefaultOGP />
  );
}