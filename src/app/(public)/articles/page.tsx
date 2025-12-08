import { prisma } from "@/lib/prisma";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import "@/styles/article-view.css";

interface Props {
    searchParams: Promise<{
        page?: string | undefined;
    }>;
}

export default async function ArticlesPage({ searchParams }: Props) {
    const { page } = await searchParams;
    const currentPage = page ? parseInt(page, 10) : 1;

    const perPage = 20;

    const [articles, totalCount] = await Promise.all([
        prisma.article.findMany({
            where: {
                published: true,
                isAllowed: false,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                excerpt: true,
                createdAt: true,
            },
            take: perPage,
            skip: (currentPage - 1) * perPage,
        }),
        prisma.article.count({
            where: {
                published: true,
                isAllowed: false,
            },
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

    return (
        <div className="article-list-page">
            <main className="article-list-main">
                <header className="article-list-header">
                    <h1 className="article-list-title">ニュース一覧</h1>
                    <p className="article-list-sub">最新の記事を新着順に表示しています。</p>
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
                                        href={`/articles?page=${currentPage - 1}`}
                                        className="pagination-link"
                                    >
                                        前のページ
                                    </Link>
                                )}
                                {currentPage < totalPages && (
                                    <Link
                                        href={`/articles?page=${currentPage + 1}`}
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
    );
}