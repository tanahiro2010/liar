interface OGPNewsProps {
  title?: string;
  category?: string;
  content?: string; // 追加
}

export function OGPNews({ title, category, content }: OGPNewsProps) {
  // OGP用なので長すぎる本文はカット
  const summary =
    content && content.length > 60
      ? content.slice(0, 60) + "…"
      : content ?? "";

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* 上部 青帯（ロゴエリア） */}
      {/* ... ここはそのまま ... */}

      {/* グレー背景の本文枠 */}
      <div
        style={{
          flex: 1,
          background: "#f5f5f5",
          padding: "40px 80px",
          boxSizing: "border-box",
          display: "flex",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #dddddd",
            padding: "32px 40px",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* 見出しエリア */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                fontSize: 16,
                color: "#777777",
                marginBottom: 8,
              }}
            >
              {category ?? "ニュース"}
            </div>
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.4,
                fontWeight: 700,
                color: "#222222",
                marginBottom: summary ? 12 : 0,
              }}
            >
              {title}
            </div>
            {summary && (
              <div
                style={{
                  fontSize: 20,
                  lineHeight: 1.5,
                  color: "#444444",
                }}
              >
                {summary}
              </div>
            )}
          </div>

          {/* フッターメタ情報 */}
          {/* ... ここもそのまま ... */}
        </div>
      </div>
    </div>
  );
}