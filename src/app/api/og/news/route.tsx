// app/api/og/route.ts
import { ImageResponse } from "next/og";
import { NewsOGP } from "@/components/ogp/news";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const contentType = 'image/png';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "test";
  const author = searchParams.get("author") ?? "匿名";

  // デフォルトOGP（サイト全体用）
  return new ImageResponse(
    <NewsOGP title={title} author={author} />
  );
}