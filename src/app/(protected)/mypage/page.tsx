import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ActionLink } from "@/components/ui/link";
import { StatItem } from "@/components/ui/stat";
import Link from "next/link";
import "@/styles/mypage.css";

interface ActionLink {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}
const actionLinks: ActionLink[] = [
    {
        href: "/mypage/articles/new",
        icon: "✏️",
        title: "記事を書く",
        description: "新しい記事を作成"
    },
    {
        href: "/mypage/articles",
        icon: "📄",
        title: "記事管理",
        description: "投稿した記事を管理"
    },
    {
        href: "/mypage/drafts",
        icon: "📝",
        title: "下書き",
        description: "下書きを確認"
    },
    {
        href: "/mypage/settings",
        icon: "⚙️",
        title: "設定",
        description: "プロフィール設定"
    }
];


export default async function Mypage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    return (
        <div className="mypage-container">
            {/* メインコンテンツ */}
            <main className="mypage-main">
                {/* プロフィールカード */}
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user?.image ? (
                                <img src={user.image} alt={user.name || "ユーザー"} />
                            ) : (
                                "👤"
                            )}
                        </div>
                        <div className="profile-info">
                            <h1>{user?.name || "ユーザー"}</h1>
                            <p className="profile-username">
                                @{user?.email?.split("@")[0] || "unknown"}
                            </p>
                        </div>
                    </div>
                    <div className="profile-stats">
                        <StatItem number={0} label="投稿記事" />
                        <StatItem number={0} label="フォロワー" />
                        <StatItem number={0} label="フォロー中" />
                    </div>
                </div>

                {/* クイックアクション */}
                <div className="quick-actions">
                    {actionLinks.map((link) => (
                        <ActionLink
                            key={link.href}
                            href={link.href}
                            icon={link.icon}
                            title={link.title}
                            description={link.description}
                        />
                    ))}
                </div>

                {/* 最近の記事 */}
                <div className="recent-articles">
                    <div className="section-header">
                        <h2 className="section-title">最近の投稿</h2>
                        <Link href="/mypage/articles" className="section-link">
                            すべて見る →
                        </Link>
                    </div>
                    <div className="empty-message">
                        まだ記事がありません。<br />
                        <Link href="/articles/new">最初の記事を書いてみましょう！</Link>
                    </div>
                </div>
            </main>

            {/* サイドバー */}
            <aside className="mypage-sidebar">
                {/* コンテンツ管理 */}
                <div className="menu-section">
                    <h3 className="menu-section-title">コンテンツ管理</h3>
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link href="/articles/new" className="menu-link">
                                <span className="menu-icon">✏️</span>
                                記事を書く
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link href="/mypage/articles" className="menu-link">
                                <span className="menu-icon">📄</span>
                                投稿した記事
                                <span className="menu-badge">0</span>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link href="/mypage/drafts" className="menu-link">
                                <span className="menu-icon">📝</span>
                                下書き
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link href="/mypage/comments" className="menu-link">
                                <span className="menu-icon">💬</span>
                                コメント
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* アカウント設定 */}
                <div className="menu-section">
                    <h3 className="menu-section-title">アカウント</h3>
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link href="/mypage/settings" className="menu-link">
                                <span className="menu-icon">👤</span>
                                プロフィール設定
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link href="/mypage/settings/account" className="menu-link">
                                <span className="menu-icon">🔐</span>
                                アカウント設定
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link href="/mypage/settings/notifications" className="menu-link">
                                <span className="menu-icon">🔔</span>
                                通知設定
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* お知らせ */}
                <div className="menu-section">
                    <div className="section-header" style={{ padding: "12px 16px", background: "#fafafa" }}>
                        <h3 className="section-title">お知らせ</h3>
                    </div>
                    <ul className="notification-list">
                        <li className="notification-item">
                            <div>ようこそ Liar News へ！</div>
                            <div className="notification-time">たった今</div>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}