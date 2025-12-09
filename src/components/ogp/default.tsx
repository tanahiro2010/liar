export function DefaultOGP() {
  return (
    <div style={{ display: "flex", padding: 5, width: "100%", height: "100%", flexDirection: "column", backgroundColor: "#f0f0f0" }}>
      <div style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", width: "100%", height: "100%", border: "8px solid #ff0033", boxSizing: "border-box", padding: 40, }}>
        <h1 style={{
          fontSize: 60,
          marginBottom: 20,
          color: "#ff0033",
          textDecoration: "none",
          fontWeight: "bold",
          fontFamily: "NotoSansJP"
        }}>Liar News!</h1>
      </div>

      <div style={{
        position: "absolute",
        bottom: 40, right: 40,
        fontSize: 34,
        textDecoration: "none",
        fontWeight: "bold",
        fontFamily: "NotoSansJP"
      }}>
        すべてフェイクのニュースサイト
      </div>
    </div>
  );
}