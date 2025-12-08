import { prisma } from "@/lib/prisma";
import Link from "next/link";
import "@/styles/article-view.css";

export default async function CategoryPage() {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
        select: {
            id: true,
            name: true,
            description: true,
        },
    });

    return (
        <div className="category-page">
            <main className="category-main">
                <header className="category-header">
                    <h1 className="category-title">カテゴリー一覧</h1>
                    <p className="category-subtitle">ジャンル別にニュースを探せます。</p>
                </header>

                <ul className="category-list">
                    {categories.map((category) => (
                        <li key={category.id} className="category-list-item">
                            <h2 className="category-list-item-name">
                                <Link href={`/articles?page=1&category=${category.id}`}>
                                    {category.name}
                                </Link>
                            </h2>
                            {category.description && (
                                <p className="category-list-item-description">{category.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}