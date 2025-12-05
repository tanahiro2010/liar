import { TopNewsCard } from "@/components/layout/top-news";
import "@/styles/main-content.css";
import "@/styles/sidebar.css";

export default function Home() {
  return (
    <div className="main-container">
      <TopNewsCard />
      
      <aside className="sidebar">
        
        <div className="sidebar-section">
          <h2>アクセスランキング</h2>
          <ol className="ranking-list">
            <li className="ranking-item">
              <span className="ranking-number">1</span>
              <a href="#">最も読まれているニュースのタイトルがここに表示されます</a>
            </li>
            <li className="ranking-item">
              <span className="ranking-number">2</span>
              <a href="#">二番目に人気のニュースタイトル</a>
            </li>
            <li className="ranking-item">
              <span className="ranking-number">3</span>
              <a href="#">三番目のランキングニュース</a>
            </li>
            <li className="ranking-item">
              <span className="ranking-number">4</span>
              <a href="#">四番目に注目されているニュース</a>
            </li>
            <li className="ranking-item">
              <span className="ranking-number">5</span>
              <a href="#">五番目のランキング記事</a>
            </li>
          </ol>
        </div>

        <div className="ad-section">
          <p>広告</p>
          <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
            Advertisement
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
            Advertisement
          </div>
        </div>
      </aside>
    </div>
  )
}
