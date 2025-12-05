import Link from "next/link";
import Image from "next/image";

interface TopNewsProps {
    title: string;
    url: string;
    imageUrl: string;
    summary?: string;
    createdAt?: string;
    author?: string;
}
export function TopNews({ title, url, imageUrl, summary, createdAt, author }: TopNewsProps) {
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
                <div className="flex gap-4">
                    <div className="news-meta">提供日 {createdAt ?? "不明"}</div>
                    <div className="news-meta">提供者 {author ?? "不明"}</div>
                </div>
            </div>
        </article>

    );
}