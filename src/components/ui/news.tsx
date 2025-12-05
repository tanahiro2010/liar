import Link from "next/link";
import Image from "next/image";

interface TopNewsProps {
    title: string;
    category?: string;
    url: string;
    imageUrl: string;
    summary?: string;
    createdAt?: string;
    author?: string;
}

export function TopNewsItem({ title, category, url, imageUrl, summary, createdAt, author }: TopNewsProps) {
    return (
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
            <span className="category-tag">{category ?? "国内"}</span>
            <h1>{title}</h1>
            <p>{summary}</p>
            <div className="news-meta">
                <span>提供元 {createdAt ?? "不明"}</span>
                <span>提供者 {author ?? "匿名"}</span>
            </div>
        </article>
    );
}

export function SubNewsItem({ title, url, imageUrl, summary, createdAt, author }: TopNewsProps) {
    return (
        <article className="news-item">
            <div className="news-thumbnail">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={120}
                    height={80}
                    sizes="120px"
                />
            </div>
            <div className="news-content">
                <h3>
                    <Link href={url}>{title}</Link>
                </h3>

                <p>{summary ?? "ニュースの要約や重要なポイントを記載します。"}</p>
                <div className="news-meta flex gap-4">
                    <span>提供日 {createdAt ?? "不明"}</span>
                    <span>提供者 {author ?? "匿名"}</span>
                </div>
            </div>
        </article>
    );
}