export function DefaultOGP() {
  const title = "liar ニュース";

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
      <div
        style={{
          height: 70,
          background: "#0044cc",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          padding: "0 72px",
          fontSize: 34,
          fontWeight: 700,
        }}
      >
        liar ニュース
      </div>

      {/* グレー背景 + 中央の記事カード */}
      <div
        style={{
          flex: 1,
          background: "#f5f5f5",
          padding: "40px 80px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #dddddd",
            width: "100%",
            maxWidth: 880,
            padding: "32px 40px 28px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* 見出しエリア（中央寄せ） */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 15,
                color: "#777777",
                marginBottom: 10,
              }}
            >
              ニュース・話題
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.5,
                fontWeight: 700,
                color: "#222222",
                marginBottom: 10,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                lineHeight: 1.6,
                color: "#555555",
              }}
            >
              最新ニュースと話題を
              <br />
              まとめてチェック。
            </div>
          </div>

          {/* 下部メタ行 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 26,
              fontSize: 16,
              color: "#666666",
            }}
          >
            <span>liar</span>
            <span>liar-news.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}