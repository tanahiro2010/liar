import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/ui/stat";
import { formatDateShort } from "@/utils/date";
import Link from "next/link";
import "@/styles/my-articles.css";

// カテゴリの日本語マッピング
const categoryLabels: Record<string, string> = {
    DOMESTIC: "国内",
    INTERNATIONAL: "国際",
    ECONOMY: "経済",
    ENTERTAINMENT: "エンタメ",
    SPORTS: "スポーツ",
    IT: "IT",
    SCIENCE: "科学",
    LIFE: "ライフ",
    LOCAL: "地域",
};

interface MyArticlePageProps {
    searchParams: Promise<{
        status?: "published" | "draft";
    }>;
}

export default async function MyArticlePage({ searchParams }: MyArticlePageProps) {
    const [session, { status }] = await Promise.all([
        auth.api.getSession({ headers: await headers() }),
        searchParams
    ]);
    const articles = await prisma.article.findMany({
        where: {
            authorId: session!.user?.id,

            ...(status === "published" ? { published: true } : {}),
            ...(status === "draft" ? { published: false } : {}),
        },
        orderBy: { createdAt: "desc" },
    });

    const publishedCount = articles.filter((a) => a.published).length;
    const draftCount = articles.filter((a) => !a.published).length;
    const totalViews = articles.reduce((sum, a) => sum + a.viewCount, 0);

    return (
        <div className="articles-page">
            {/* ページヘッダー */}
            <div className="page-header">
                <h1 className="page-title">記事管理</h1>
                <Link href="/mypage/articles/new" className="new-article-btn">
                    ✏️ 新規作成
                </Link>
            </div>

            {/* 統計カード */}
            <div className="stats-row">
                <StatCard number={articles.length} label="総記事数" />
                <StatCard number={publishedCount} label="公開中" />
                <StatCard number={draftCount} label="下書き" />
                <StatCard number={totalViews} label="総閲覧数" />
            </div>

            {/* フィルタータブ */}
            <div className="filter-tabs">
                <Link href="/mypage/articles" className={`filter-tab ${!status ? " active" : ""}`}>
                    すべて
                    <span className="filter-tab-count">{articles.length}</span>
                </Link>
                <Link href="/mypage/articles?status=published" className={`filter-tab ${status === "published" ? " active" : ""}`}>
                    公開中
                    <span className="filter-tab-count">{publishedCount}</span>
                </Link>
                <Link href="/mypage/articles?status=draft" className={`filter-tab ${status === "draft" ? " active" : ""}`}>
                    下書き
                    <span className="filter-tab-count">{draftCount}</span>
                </Link>
            </div>

            {/* 記事一覧 */}
            <div className="articles-container">
                {articles.length > 0 ? (
                    <>
                        <div className="articles-table-header">
                            <span>記事</span>
                            <span>ステータス</span>
                            <span>更新日</span>
                            <span>操作</span>
                        </div>
                        {articles.map((article) => (
                            <div key={article.id} className="article-row">
                                <div className="article-info">
                                    <div className="article-thumbnail">
                                        {article.coverImage ? (
                                            <img src={article.coverImage} alt={article.title} />
                                        ) : (
                                            <div style={{ width: "100%", height: "100%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: "12px" }}>
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="article-details">
                                        <Link href={`/articles/${article.id}`} className="article-title-link">
                                            {article.title}
                                        </Link>
                                        <div className="article-meta">
                                            <span className="article-category">
                                                {categoryLabels[article.categoryId] || article.categoryId}
                                            </span>
                                            <span>👁 {article.viewCount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className={`article-status ${article.published ? "published" : "draft"}`}>
                                        {article.published ? "公開中" : "下書き"}
                                    </span>
                                </div>
                                <div className="article-date">
                                    {formatDateShort(article.updatedAt)}
                                </div>
                                <div className="article-actions">
                                    <Link href={`/mypage/articles/${article.id}`} className="action-btn edit">
                                        編集
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <h3 className="empty-title">まだ記事がありません</h3>
                        <p className="empty-message">
                            最初の記事を書いて、あなたの創作を世界に発信しましょう！
                        </p>
                        <Link href="/mypage/articles/new" className="empty-action">
                            ✏️ 記事を書く
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}