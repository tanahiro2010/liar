import { NextResponse } from "next/server";

// ===========================================
// 型定義
// ===========================================

export type ApiResponse<T = unknown> = {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
};

export type PaginationParams = {
    page?: number;
    limit?: number;
    total: number;
};

// ===========================================
// 成功レスポンス
// ===========================================

/**
 * 成功レスポンス (200 OK)
 */
export function ok<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status: 200 }
    );
}

/**
 * 作成成功レスポンス (201 Created)
 */
export function created<T>(data: T, message = "作成しました"): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status: 201 }
    );
}

/**
 * 更新成功レスポンス (200 OK)
 */
export function updated<T>(data: T, message = "更新しました"): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status: 200 }
    );
}

/**
 * 削除成功レスポンス (200 OK)
 */
export function deleted(message = "削除しました"): NextResponse<ApiResponse<null>> {
    return NextResponse.json(
        {
            success: true,
            data: null,
            message,
        },
        { status: 200 }
    );
}

/**
 * ページネーション付きレスポンス (200 OK)
 */
export function paginated<T>(
    data: T[],
    pagination: PaginationParams
): NextResponse<ApiResponse<T[]>> {
    const { page = 1, limit = 10, total } = pagination;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
        {
            success: true,
            data,
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
        },
        { status: 200 }
    );
}

/**
 * 空レスポンス (204 No Content)
 */
export function noContent(): NextResponse {
    return new NextResponse(null, { status: 204 });
}

// ===========================================
// エラーレスポンス
// ===========================================

/**
 * バリデーションエラー (400 Bad Request)
 */
export function badRequest(error = "リクエストが不正です"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 400 }
    );
}

/**
 * 認証エラー (401 Unauthorized)
 */
export function unauthorized(error = "ログインが必要です"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 401 }
    );
}

/**
 * 権限エラー (403 Forbidden)
 */
export function forbidden(error = "アクセス権限がありません"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 403 }
    );
}

/**
 * 見つからない (404 Not Found)
 */
export function notFound(error = "見つかりませんでした"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 404 }
    );
}

/**
 * メソッド不許可 (405 Method Not Allowed)
 */
export function methodNotAllowed(error = "許可されていないメソッドです"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 405 }
    );
}

/**
 * 競合エラー (409 Conflict)
 */
export function conflict(error = "既に存在します"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 409 }
    );
}

/**
 * ペイロード過大 (413 Payload Too Large)
 */
export function payloadTooLarge(error = "データサイズが大きすぎます"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 413 }
    );
}

/**
 * 処理不能 (422 Unprocessable Entity)
 */
export function unprocessable(error = "処理できませんでした"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 422 }
    );
}

/**
 * レート制限 (429 Too Many Requests)
 */
export function tooManyRequests(error = "リクエストが多すぎます。しばらくお待ちください"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 429 }
    );
}

/**
 * サーバーエラー (500 Internal Server Error)
 */
export function serverError(error = "サーバーエラーが発生しました"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 500 }
    );
}

/**
 * サービス利用不可 (503 Service Unavailable)
 */
export function serviceUnavailable(error = "サービスが一時的に利用できません"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 503 }
    );
}

// ===========================================
// ユーティリティ
// ===========================================

/**
 * カスタムステータスコードでレスポンスを返す
 */
export function json<T>(
    data: ApiResponse<T>,
    status: number
): NextResponse<ApiResponse<T>> {
    return NextResponse.json(data, { status });
}

/**
 * エラーをキャッチしてサーバーエラーレスポンスを返す
 */
export function handleError(error: unknown): NextResponse<ApiResponse> {
    console.error("API Error:", error);

    if (error instanceof Error) {
        // 開発環境ではエラーメッセージを返す
        if (process.env.NODE_ENV === "development") {
            return serverError(error.message);
        }
    }

    return serverError();
}

/**
 * APIハンドラをラップしてエラーハンドリングを自動化
 */
export function withErrorHandler<T>(
    handler: () => Promise<NextResponse<ApiResponse<T>>>
): Promise<NextResponse<ApiResponse<T>>> {
    return handler().catch((error) => handleError(error) as NextResponse<ApiResponse<T>>);
}
