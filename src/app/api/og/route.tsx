// app/api/og/route.ts
import { ImageResponse } from "next/og";
import { OGPNews } from "@/components/ogp/news";
import { DefaultOGP } from "@/components/ogp/default";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const category = searchParams.get("category") ?? "一般";
  const content = searchParams.get("content") ?? "";

  // 記事用（title あり）
  if (title) {
    return new ImageResponse(
      <div style={{ display: "flex" }}>
        <OGPNews title={title} category={category} content={content} />
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // デフォルトOGP（サイト全体用）
  return new ImageResponse(
    <div style={{ display: "flex" }}>
      <DefaultOGP />
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}