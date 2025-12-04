import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import "@/styles/header.css";
import "@/styles/navigation.css";

const navigationLinks = [
    { name: "国内", slug: "domestic" },
    { name: "国際", slug: "international" },
    { name: "経済", slug: "economy" },
    { name: "エンタメ", slug: "entertainment" },
    { name: "スポーツ", slug: "sports" },
    { name: "IT", slug: "it" },
    { name: "科学", slug: "science" },
    { name: "ライフ", slug: "life" },
    { name: "地域", slug: "local" },
];

export default async function Header() {
    const [headersList, session] = await Promise.all([
        headers(),
        auth.api.getSession(),
    ]);
    const pathname = headersList.get("x-pathname") || "/";
    const isAuthenticated = session?.user ? true : false;

    return (
        <header>
            <div className="header-top">
                <div className="header-container">
                    <a href="#" className="logo">Lair News!</a>
                    <div className="search-box">
                        <input type="text" placeholder="キーワードを入力" />
                    </div>
                    <div className="header-links">
                        {isAuthenticated ? (
                            <>
                                <a href="/profile">マイページ</a>
                                <a href="/auth/logout">ログアウト</a>
                            </>
                        ) : (
                            <>
                                <a href="/auth/login">ログイン</a>
                                <a href="/auth/register">新規取得</a>
                            </>
                        )}

                    </div>
                </div>
            </div>
            <nav className="nav-bar">
                <div className="nav-container">
                    {/* Navigation Links */}
                    <Link href={`/`} className={pathname === "/" ? "active" : ""}>トップ</Link>
                    {navigationLinks.map((link: { name: string; slug: string }) => (
                        <Link key={link.name} href={`/category/${link.slug}`} className={pathname === `/category/${link.slug}` ? "active" : ""}>
                            {link.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}