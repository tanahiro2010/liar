import { prisma } from "@/lib/prisma";

interface Props {
    searchParams: Promise<{
        page?: string | undefined;
    }>;
}

export default async function ArticlesPage({ searchParams }: Props) {
    const { page } = await searchParams;
    const currentPage = page ? parseInt(page, 10) : 1;

    const articles = await prisma.article.findMany({
        where: {
            isAllowed: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
        skip: (currentPage - 1) * 10,
    });

    return (
        <div>
            <h1>Articles</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
}