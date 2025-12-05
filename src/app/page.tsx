import { TopNewsItemCard } from "@/components/layout/top-news";
import GoogleAdsense from "@/components/utils/adsence";
import "@/styles/main-content.css";
import "@/styles/sidebar.css";

export default function Home() {
  return (
    <div className="main-container">
      <TopNewsItemCard />
      
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
              <a href="#">政治</a>
            </div>
            <div className="topic-item">
              <a href="#">ビジネス</a>
            </div>
            <div className="topic-item">
              <a href="#">テクノロジー</a>
            </div>
            <div className="topic-item">
              <a href="#">エンタメ</a>
            </div>
            <div className="topic-item">
              <a href="#">スポーツ</a>
            </div>
            <div className="topic-item">
              <a href="#">ライフスタイル</a>
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
    </div>
  )
}
