import { TopNewsItem, SubNewsItem } from "../ui/news";

interface TopNewsItemItem {
    title: string;
    category?: string;
    url: string;
    imageUrl: string;
    summary?: string;
    createdAt?: string;
    author?: string;
}

const TopNewsItemItems: TopNewsItemItem[] = [
    {
        title: "主要ニュースのタイトルがここに表示されます",
        url: "#",
        imageUrl: "https://placehold.co/800x350.png?text=Top+News&bg=e0e0e0&fc=666666",
        summary: "ニュースの概要や詳細情報がここに表示されます。重要なポイントや背景情報などを簡潔にまとめた文章が入ります。",
        createdAt: "12/3(火) 14:30",
    },
    {
        title: "サブニュースタイトル1",
        url: "#",
        imageUrl: "https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666",
        summary: "サブニュースの概要や詳細情報がここに表示されます。",
        createdAt: "12/3(火) 14:30",
        author: "tanahiro2010"
    },
    {
        title: "サブニュースタイトル2",
        url: "#",
        imageUrl: "https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666",
        summary: "サブニュースの概要や詳細情報がここに表示されます。",
        createdAt: "12/3(火) 14:30",
        author: "tanahiro2010"
    },
    {
        title: "サブニュースタイトル3",
        url: "#",
        imageUrl: "https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666",
        summary: "サブニュースの概要や詳細情報がここに表示されます。",
        createdAt: "12/3(火) 14:30",
        author: "tanahiro2010"
    },
    {
        title: "サブニュースタイトル4",
        url: "#",
        imageUrl: "https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666",
        summary: "サブニュースの概要や詳細情報がここに表示されます。",
        createdAt: "12/3(火) 14:30",
        author: "tanahiro2010"
    },
    {
        title: "サブニュースタイトル5",
        url: "#",
        imageUrl: "https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666",
        summary: "サブニュースの概要や詳細情報がここに表示されます。",
        createdAt: "12/3(火) 14:30",
        author: "tanahiro2010"
    },
]

export async function TopNewsItemCard() {
    const date = new Date();
    const topNews = TopNewsItemItems[0];
    const subNewsItems: TopNewsItemItem[] = TopNewsItemItems.slice(1);
    
    return (
        <main className="main-news">
            <TopNewsItem
                title={topNews.title}
                category={topNews.category}
                url={topNews.url}
                imageUrl={topNews.imageUrl}
                summary={topNews.summary}
                createdAt={topNews.createdAt}
            />

            <div className="news-list"> { /* TopNewsItem items - 6 items */}
                {subNewsItems.map((item, index) => (
                    <SubNewsItem
                        key={index}
                        title={item.title}
                        url={item.url}
                        imageUrl={item.imageUrl}
                        summary={item.summary}
                        createdAt={item.createdAt}
                        author={item.author}
                    />
                ))}
            </div>
        </main>
    );
}