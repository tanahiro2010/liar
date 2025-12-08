import { prisma } from "@/lib/prisma";
import { ArticleList } from "@/components/layout/articles";
import { redirect } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string | undefined; }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { id } = await params;
    const category = await prisma.category.findUnique({
        where: { id: id.toUpperCase() },
        select: {
            name: true,
            description: true,
        },
    });

    if (!category) {
        return {
            title: "カテゴリーが見つかりません - ニュース一覧",
            description: "指定されたカテゴリーは存在しません。",
        };
    }
    return {
        title: `${category.name} - ニュース一覧`,
        description: category.description || `${category.name}に関連する最新ニュースをお届けします。`,
        
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const [{ id }, { page }] = await Promise.all([params, searchParams]);
    const currentPage = page ? parseInt(page, 10) : 1;
    const perPage = 20;

    

    const [category, totalCount] = await prisma.$transaction([
        prisma.category.findUnique({
            where: { id: id.toUpperCase() },
            select: {
                id: true,
                name: true,
                description: true,
                articles: {
                    where: {
                        published: true,
                    },
                    orderBy: {
                        updatedAt: "desc",
                    },
                    take: perPage,
                    skip: (currentPage - 1) * perPage,
                    select: {
                        id: true,
                        title: true,
                        excerpt: true,
                        createdAt: true,
                        category: false
                    }
                }
            }
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
            articles={category.articles}
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(totalCount / perPage))}
        />
    )
}