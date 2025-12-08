import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";
import { ok, created } from "@/lib/helpers/response";

const GET = (async (req: NextRequest) => {
    const page = req.nextUrl.searchParams.get("page");
    const currentPage = page ? parseInt(page, 10) : 1;
    const articles = await prisma.article.findMany({
        where: {
            isAllowed: true,
            published: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 20,
        skip: (currentPage - 1) * 20,
    });

    return ok({ articles }, "記事一覧を取得しました");
});

const POST = ((req: NextRequest) => withAuth(req, async (auth) => {
    const { title, content, category } = await req.json();
    const newArticle = await prisma.article.create({
        data: {
            title,
            content,
            category: { connect: { id: category } },
            author: { connect: { id: auth.user.id } },
            isAllowed: false,
            published: false,
        }
    });

    return created({ article: newArticle }, "記事を作成しました");
}));

export { GET, POST };