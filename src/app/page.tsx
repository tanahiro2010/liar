import Image from "next/image";
import "@/styles/main-content.css";
import "@/styles/sidebar.css";

export default function Home() {
  return (
    <div className="main-container">
      <main className="main-news">
        <article className="top-story">
          <div className="top-story-image">
            <Image
              src="https://placehold.co/800x350.png?text=Top+News&bg=e0e0e0&fc=666666"
              alt="トップニュース"
              width={800}
              height={350}
              sizes="(max-width: 900px) 100vw, 800px"
              priority
            />
          </div>
          <span className="category-tag">国内</span>
          <h1>主要ニュースのタイトルがここに表示されます</h1>
          <p>ニュースの概要や詳細情報がここに表示されます。重要なポイントや背景情報などを簡潔にまとめた文章が入ります。</p>
          <div className="news-meta">
            <span>提供元 12/3(火) 14:30</span>
          </div>
        </article>

        
        <div className="news-list">
          <article className="news-item">
            <div className="news-thumbnail">
              <Image
                src="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                alt="ニュース"
                width={120}
                height={80}
                sizes="120px"
              />
            </div>
            <div className="news-content">
              <h3><a href="#">二つ目の重要ニュースのタイトルがここに表示されます</a></h3>
              <p>ニュースの概要がここに表示されます。</p>
              <div className="news-meta">提供元 12/3(火) 13:45</div>
            </div>
          </article>

          <article className="news-item">
            <div className="news-thumbnail">
              <Image
                src="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                alt="ニュース"
                width={120}
                height={80}
                sizes="120px"
              />
            </div>
            <div className="news-content">
              <h3><a href="#">三つ目のニュースタイトルがここに入ります</a></h3>
              <p>ニュースの要約や重要なポイントを記載します。</p>
              <div className="news-meta">提供元 12/3(火) 12:30</div>
            </div>
          </article>

          <article className="news-item">
            <div className="news-thumbnail">
              <Image
                src="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                alt="ニュース"
                width={120}
                height={80}
                sizes="120px"
              />
            </div>
            <div className="news-content">
              <h3><a href="#">経済関連のニュースタイトルがここに表示されます</a></h3>
              <p>市場動向や企業の最新情報などを伝えます。</p>
              <div className="news-meta">提供元 12/3(火) 11:15</div>
            </div>
          </article>

          <article className="news-item">
            <div className="news-thumbnail">
              <Image
                src="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                alt="ニュース"
                width={120}
                height={80}
                sizes="120px"
              />
            </div>
            <div className="news-content">
              <h3><a href="#">国際ニュースのタイトルがここに入ります</a></h3>
              <p>世界各地の最新情報をお届けします。</p>
              <div className="news-meta">提供元 12/3(火) 10:00</div>
            </div>
          </article>

          <article className="news-item">
            <div className="news-thumbnail">
              <Image
                src="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                alt="ニュース"
                width={120}
                height={80}
                sizes="120px"
              />
            </div>
            <div className="news-content">
              <h3><a href="#">スポーツニュースのタイトルがここに表示されます</a></h3>
              <p>試合結果や選手の活躍などをレポートします。</p>
              <div className="news-meta">提供元 12/3(火) 9:30</div>
            </div>
          </article>
        </div>
      </main>

      
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
