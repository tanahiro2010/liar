import { prisma } from "@/lib/prisma";
import Link from "next/link";
import GoogleAdsense from "@/components/utils/adsence";

export default async function Sidebar() {
    const categories = await prisma.category.findMany({
        orderBy: {
            articles: {
                _count: "desc",
            }
        },
        take: 6,
        select: {
            id: true,
            name: true,
        }
    });
    return (
        <aside className="sidebar">
            <div className="ad-section">
                <p>広告</p>
                <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GoogleAdsense />
                </div>
            </div>

            <div className="sidebar-section">
                <h2>トピックス</h2>
                <div className="topics-grid">
                    {categories.map((category) => (
                        <div key={category.id} className="topic-item">
                            <Link href={`/category/${category.id.toLowerCase()}`}>{category.name}</Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="ad-section">
                <p>広告</p>
                <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GoogleAdsense />
                </div>
            </div>
        </aside>
    );
}