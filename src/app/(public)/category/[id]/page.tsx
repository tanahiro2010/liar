import { prisma } from "@/lib/prisma";
import { ArticleList } from "@/components/layout/articles";
import { redirect } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string | undefined; }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const [{ id }, { page }] = await Promise.all([params, searchParams]);
    const currentPage = page ? parseInt(page, 10) : 1;
    const perPage = 20;

    

    const [category, articles, totalCount] = await prisma.$transaction([
        prisma.category.findUnique({
            where: { id: id.toUpperCase() },
        }),
        prisma.article.findMany({
            where: {
                published: true,
                isAllowed: false,
                categoryId: id,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                excerpt: true,
                createdAt: true,
                category: false
            },
            take: perPage,
            skip: (currentPage - 1) * perPage,
        }),
        prisma.article.count({
            where: {
                published: true,
                isAllowed: false,
                categoryId: id,
            },
        }),
    ]);

    if (!category) {
        redirect("/category");
    }

    return (
        <ArticleList
            title={`${category?.name} - ニュース一覧`}
            subtitle="最新の記事を新着順に表示しています。"
            baseUrl={`/category/${id}`}
            articles={articles}
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(totalCount / perPage))}
        />
    )
}