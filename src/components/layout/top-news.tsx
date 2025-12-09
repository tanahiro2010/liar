import { prisma } from "@/lib/prisma";
import { TopNewsItem, SubNewsItem } from "../ui/news";
import { formatDateShort } from "@/utils/date";
import { _length } from "better-auth";

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
    const articles = await prisma.article.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            category: {
                select: {
                    name: true
                }
            },
            content: true,
            createdAt: true,
            author: {
                select: {
                    name: true
                }
            }
        },
        take: 7,
    });
    if (articles.length === 0) {
        return null;
    }
    const topNews = {
        title: articles[0].title,
        url: `/articles/${articles[0].id}`,
        imageUrl: `/api/og/news?title=${encodeURIComponent(articles[0].title)}&author=${encodeURIComponent(articles[0].author?.name || "匿名")}`,
        category: articles[0].category?.name,
        summary: articles[0].content.slice(0, 100) + "...",
        createdAt: formatDateShort(articles[0].createdAt),
        author: articles[0].author?.name || "匿名"
    }
    const subNewsItems: TopNewsItemItem[] = articles.slice(1).map((article) => {
        return {
            title: article.title,
            url: `/articles/${article.id}`,
            imageUrl: `/api/og/news?title=${encodeURIComponent(article.title)}&author=${encodeURIComponent(article.author?.name || "匿名")}`,
            category: article.category?.name,
            summary: article.content.slice(0, 100) + "...",
            createdAt: formatDateShort(article.createdAt),
            author: article.author?.name || "匿名"
        }
    });

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