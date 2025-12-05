import Link from "next/link";

interface RankingItem {
    rank: number;
    title: string;
    url: string;
}

const rankingItems: RankingItem[] = [
    { rank: 1, title: "最も読まれているニュースのタイトルがここに表示されます", url: "#" },
    { rank: 2, title: "二番目に人気のニュースタイトル", url: "#" },
    { rank: 3, title: "三番目のランキングニュース", url: "#" },
    { rank: 4, title: "四番目に注目されているニュース", url: "#" },
    { rank: 5, title: "五番目のランキング記事", url: "#" },
]

export async function RankingSidebarCard() {
    { /* ここにランキングを取得する処理を */ }

    return (
        <div className="sidebar-section">
            <h2>アクセスランキング</h2>
            <ol className="ranking-list">
                {rankingItems.map((item) => (
                    <li key={item.rank} className="ranking-item">
                        <span className="rank-number">{item.rank}</span>
                        <Link href={item.url}>{item.title}</Link>
                    </li>
                ))}
            </ol>
        </div>
    )
}