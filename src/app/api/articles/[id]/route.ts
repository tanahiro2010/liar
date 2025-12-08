import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";
import { notFound, ok, updated } from "@/lib/helpers/response";

interface ArticleProps {
    params: Promise<{ id: string }>;
}

export const GET = (async (_: NextRequest, { params }: ArticleProps) => {
    const { id } = await params;
    const article = await prisma.article.findUnique({
        where: { id },
    });

    return ok({ article }, "記事を取得しました");
});

export const PUT = (async (req: NextRequest, context: ArticleProps) => withAuth(req, async (auth, ctx) => {
    const { id } = ctx.params as { id: string };
    const article = await prisma.article.findUnique({
        where: { id, authorId: auth.user.id },
    });
    if (!article) {
        return notFound("記事が見つかりません");
    }

    const { title, content, published } = await req.json();
    const now = new Date();

    const updatedArticle = await prisma.article.updateMany({
        where: {
            id,
            author: { id: auth.user.id },
        },
        data: {
            title,
            content,
            updatedAt: now,
            published,
        },
    });

    return updated({ article: updatedArticle }, "記事を更新しました");
}, context));

export const DELETE = (async (req: NextRequest, context: ArticleProps) => withAuth(req, async (auth, ctx) => {
    const { id } = ctx.params as { id: string };
    const article = await prisma.article.findUnique({
        where: { id, authorId: auth.user.id },
    });
    if (!article) {
        return notFound("記事が見つかりません");
    }
    await prisma.article.deleteMany({
        where: {
            id,
            authorId: auth.user.id,
        },
    });

    return ok(null, "記事を削除しました");
}, context));