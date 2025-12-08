import Link from "next/link";
import GoogleAdsense from "@/components/utils/adsence";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="ad-section">
                <p>広告</p>
                <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GoogleAdsense />
                </div>
            </div>

            <div className="sidebar-section">
                <h2>トピックス</h2>
                <div className="topics-grid">
                    <div className="topic-item">
                        <Link href="#">政治</Link>
                    </div>
                    <div className="topic-item">
                        <Link href="#">ビジネス</Link>
                    </div>
                    <div className="topic-item">
                        <Link href="#">テクノロジー</Link>
                    </div>
                    <div className="topic-item">
                        <Link href="#">エンタメ</Link>
                    </div>
                    <div className="topic-item">
                        <Link href="#">スポーツ</Link>
                    </div>
                    <div className="topic-item">
                        <Link href="#">ライフスタイル</Link>
                    </div>
                </div>
            </div>

            <div className="ad-section">
                <p>広告</p>
                <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GoogleAdsense />
                </div>
            </div>
        </aside>
    );
}