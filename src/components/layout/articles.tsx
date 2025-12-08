import { formatDate } from "@/utils/date";
import Link from "next/link";
import "@/styles/article-view.css";

interface ArticleProps {
    title: string;
    subtitle?: string;
    articles: {
        id: string;
        title: string;
        excerpt: string | null;
        createdAt: Date;
    }[];
    baseUrl?: string;
    currentPage: number;
    totalPages: number;
}

export function ArticleList({ title, subtitle, articles, baseUrl = "/articles", currentPage, totalPages }: ArticleProps) {
    return (
        <div className="article-list-page">
            <main className="article-list-main">
                <header className="article-list-header">
                    <h1 className="article-list-title">{title}</h1>
                    {subtitle && <p className="article-list-sub">{subtitle}</p>}
                </header>

                <ul className="article-list">
                    {articles.map((article) => (
                        <li key={article.id} className="article-list-item">
                            <h2 className="article-list-item-title">
                                <Link href={`/articles/${article.id}`}>
                                    {article.title}
                                </Link>
                            </h2>
                            <div className="article-list-meta">
                                <span className="article-list-date">
                                    {formatDate(article.createdAt)}
                                </span>
                            </div>
                            {article.excerpt && (
                                <p className="article-list-excerpt">{article.excerpt}</p>
                            )}
                        </li>
                    ))}
                </ul>

                {totalPages > 1 && (
                    <nav className="article-list-pagination">
                        <div className="pagination-inner">
                            <span className="pagination-status">
                                {currentPage} / {totalPages} ページ
                            </span>
                            <div className="pagination-links">
                                {currentPage > 1 && (
                                    <Link
                                        href={`${baseUrl}?page=${currentPage - 1}`}
                                        className="pagination-link"
                                    >
                                        前のページ
                                    </Link>
                                )}
                                {currentPage < totalPages && (
                                    <Link
                                        href={`${baseUrl}?page=${currentPage + 1}`}
                                        className="pagination-link"
                                    >
                                        次のページ
                                    </Link>
                                )}
                            </div>
                        </div>
                    </nav>
                )}
            </main>
        </div>
    )
}