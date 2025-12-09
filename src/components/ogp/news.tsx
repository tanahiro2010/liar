interface OGPSampleProps {
    title: string;
    author: string;
}

export function NewsOGP({ title, author }: OGPSampleProps) {
    return (
        <div style={{ display: "flex", padding: 5, width: "100%", height: "100%", flexDirection: "column", backgroundColor: "#f0f0f0" }}>
            <div style={{
                position: "absolute",
                top: 40, left: 40,
                fontSize: 24,
                color: "#333333",
                textDecoration: "none",
                fontWeight: "bold",
                fontFamily: "NotoSansJP",
                display: "flex",
            }}>著者 { author }</div>
            
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", width: "100%", height: "100%", border: "8px solid #ff0033", boxSizing: "border-box", padding: 40, }}>
                <h1 style={{ fontSize: 60, fontWeight: "bold", marginBottom: 20, }}>{ title }</h1>
            </div>

            <div style={{ 
                position: "absolute", 
                bottom: 40, right: 40, 
                fontSize: 34, 
                color: "#ff0033", 
                textDecoration: "none", 
                fontWeight: "bold", 
                fontFamily: "NotoSansJP" 
            }}>
                Liar News!
            </div>
        </div>
    );
}