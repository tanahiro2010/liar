import { prisma } from "@/lib/prisma";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function ArticlePage({ params }: Props) {
    const { id } = await params;
    const article = await prisma.article.findUnique({
        where: {
            id
        },
    });

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
        </div>
    );
}