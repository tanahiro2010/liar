// app/api/og/route.ts
import { ImageResponse } from "next/og";
import { OGPNews } from "@/components/ogp/news";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "ニュースタイトルが入ります";
  const category = searchParams.get("category") ?? "一般";
  const content = searchParams.get("content") ?? "ニュースの内容がここに入ります";

  return new ImageResponse(<OGPNews title={title} category={`ニュース ― ${category}`} content={content} />, {
    width: 1200,
    height: 630,
  });
}