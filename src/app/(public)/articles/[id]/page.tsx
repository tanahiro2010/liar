import { prisma } from "@/lib/prisma";
import { formatDate, timeAgo } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import "@/styles/article-view.css";
import "@/styles/sidebar.css"

interface Props {
    params: Promise<{
        id: string;
    }>;
}

// カテゴリーの色マッピング
const categoryColors: Record<string, string> = {
    technology: "#2196F3",
    business: "#4CAF50",
    entertainment: "#9C27B0",
    sports: "#FF9800",
    lifestyle: "#E91E63",
    science: "#00BCD4",
    politics: "#F44336",
    health: "#8BC34A",
    world: "#3F51B5",
    local: "#795548",
};

export default async function ArticlePage({ params }: Props) {
    const { id } = await params;
    
    // 記事を取得（著者情報も含む）
    const article = await prisma.article.findUnique({
        where: {
            id,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
    });

    // 記事が見つからない場合
    if (!article) {
        return (
            <div className="article-page">
                <div className="article-main">
                    <div className="article-not-found">
                        <div className="not-found-icon">📄</div>
                        <h1 className="not-found-title">記事が見つかりません</h1>
                        <p className="not-found-message">
                            お探しの記事は削除されたか、URLが間違っている可能性があります。
                        </p>
                        <Link href="/" className="not-found-link">
                            トップページへ戻る
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 非公開記事の場合
    if (!article.published) {
        return (
            <div className="article-page">
                <div className="article-main">
                    <div className="article-not-found">
                        <div className="not-found-icon">🔒</div>
                        <h1 className="not-found-title">この記事は非公開です</h1>
                        <p className="not-found-message">
                            この記事は現在公開されていません。
                        </p>
                        <Link href="/" className="not-found-link">
                            トップページへ戻る
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    
    const categoryColor = article.category?.name 
        ? categoryColors[article.category.name.toLowerCase()] || "#666"
        : "#666";

    return (
        <div className="article-page">
            <main className="article-main">
                {/* パンくずリスト */}
                <nav className="breadcrumb">
                    <Link href="/">トップ</Link>
                    <span className="breadcrumb-separator">›</span>
                    {article.category && (
                        <>
                            <Link href={`/category/${article.category.id.toLowerCase()}`}>
                                {article.category.name}
                            </Link>
                            <span className="breadcrumb-separator">›</span>
                        </>
                    )}
                    <span>{article.title.length > 30 ? article.title.substring(0, 30) + "..." : article.title}</span>
                </nav>

                {/* 記事ヘッダー */}
                <header className="article-header">
                    {article.category && (
                        <span 
                            className="article-category-tag"
                            style={{ backgroundColor: categoryColor }}
                        >
                            { article.category.name }
                        </span>
                    )}
                    <h1 className="article-title">{article.title}</h1>
                    <div className="article-meta">
                        <div className="article-author">
                            <div className="author-avatar">
                                {article.author?.image ? (
                                    <Image
                                        src={article.author.image}
                                        alt={article.author.name || "著者"}
                                        width={32}
                                        height={32}
                                    />
                                ) : (
                                    "👤"
                                )}
                            </div>
                            <span className="author-name">
                                {article.author?.name || "匿名"}
                            </span>
                        </div>
                        <div className="article-date">
                            📅 {formatDate(article.createdAt)}
                            {article.updatedAt > article.createdAt && (
                                <span style={{ color: "#999", marginLeft: "8px" }}>
                                    （更新: {timeAgo(article.updatedAt)}）
                                </span>
                            )}
                        </div>
                    </div>
                </header>

                {/* カバー画像 */}
                {article.coverImage && (
                    <figure className="article-cover">
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            width={800}
                            height={450}
                            sizes="(max-width: 900px) 100vw, 800px"
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </figure>
                )}

                {/* 記事本文 */}
                <article 
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: formatContent(article.content || "") }}
                />

                {/* アクションバー */}
                <div className="article-actions">
                    <button className="action-button">
                        👍 いいね
                    </button>
                    <button className="action-button">
                        💬 コメント
                    </button>
                    <button className="action-button">
                        🔖 保存
                    </button>
                    <div className="share-buttons">
                        <button 
                            className="share-button twitter"
                            title="Xでシェア"
                        >
                            𝕏
                        </button>
                        <button 
                            className="share-button facebook"
                            title="Facebookでシェア"
                        >
                            f
                        </button>
                        <button 
                            className="share-button line"
                            title="LINEでシェア"
                        >
                            L
                        </button>
                        <button 
                            className="share-button copy"
                            title="リンクをコピー"
                        >
                            🔗
                        </button>
                    </div>
                </div>

                {/* 著者カード */}
                {article.author && (
                    <div className="author-card">
                        <div className="author-card-header">
                            <div className="author-card-avatar">
                                {article.author.image ? (
                                    <Image
                                        src={article.author.image}
                                        alt={article.author.name || "著者"}
                                        width={48}
                                        height={48}
                                    />
                                ) : (
                                    "👤"
                                )}
                            </div>
                            <div>
                                <h3 className="author-card-name">
                                    {article.author.name || "匿名"}
                                </h3>
                                <p className="author-card-username">
                                    @{article.author.id.substring(0, 8)}
                                </p>
                            </div>
                        </div>
                        <p className="author-card-bio">
                            記事をお読みいただきありがとうございます。
                        </p>
                    </div>
                )}

                {/* 注意書き */}
                <div className="article-disclaimer">
                    <h4 className="disclaimer-title">
                        ⚠️ ご注意
                    </h4>
                    <p className="disclaimer-text">
                        この記事の内容は投稿者の見解であり、サイト運営者の意見を代表するものではありません。
                        情報の正確性については、ご自身でご確認ください。
                    </p>
                </div>
            </main>
        </div>
    );
}

// コンテンツをHTMLにフォーマット（簡易マークダウン対応）
function formatContent(content: string): string {
    // XSS対策のため、基本的なエスケープを行う
    let html = content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    
    // 改行をbrに変換
    html = html.replace(/\n\n/g, "</p><p>");
    html = html.replace(/\n/g, "<br>");
    
    // 見出し
    html = html.replace(/^## (.+)$/gm, "</p><h2>$1</h2><p>");
    html = html.replace(/^### (.+)$/gm, "</p><h3>$1</h3><p>");
    
    // 強調
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    
    // リンク
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // 引用
    html = html.replace(/^&gt; (.+)$/gm, "</p><blockquote>$1</blockquote><p>");
    
    // コード
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    
    // 空のpタグを削除
    html = html.replace(/<p><\/p>/g, "");
    
    return `<p>${html}</p>`;
}