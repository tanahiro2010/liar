"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import "@/styles/article-editor.css";

const categories = [
    { value: "DOMESTIC", label: "国内" },
    { value: "INTERNATIONAL", label: "国際" },
    { value: "ECONOMY", label: "経済" },
    { value: "ENTERTAINMENT", label: "エンタメ" },
    { value: "SPORTS", label: "スポーツ" },
    { value: "IT", label: "IT" },
    { value: "SCIENCE", label: "科学" },
    { value: "LIFE", label: "ライフ" },
    { value: "LOCAL", label: "地域" },
];

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("DOMESTIC");
    const [published, setPublished] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 記事データを取得
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/articles/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    const article = data.data.article;
                    setTitle(article.title);
                    setContent(article.content);
                    setCategory(article.category);
                    setPublished(article.published);
                } else {
                    setError("記事が見つかりませんでした");
                }
            } catch (err) {
                console.error("記事の取得に失敗:", err);
                setError("記事の取得に失敗しました");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    published,
                }),
            });

            if (response.ok) {
                router.push("/mypage/articles");
            } else {
                alert("記事の更新に失敗しました");
            }
        } catch (error) {
            console.error("記事の更新に失敗:", error);
            alert("記事の更新に失敗しました");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("本当にこの記事を削除しますか？この操作は取り消せません。")) {
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                router.push("/mypage/articles");
            } else {
                alert("記事の削除に失敗しました");
            }
        } catch (error) {
            console.error("記事の削除に失敗:", error);
            alert("記事の削除に失敗しました");
        } finally {
            setIsDeleting(false);
        }
    };

    const titleLength = title.length;
    const contentLength = content.length;

    if (isLoading) {
        return (
            <div className="article-editor">
                <div className="editor-header">
                    <h1 className="editor-title">読み込み中...</h1>
                </div>
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}>
                    記事データを読み込んでいます...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="article-editor">
                <div className="editor-header">
                    <h1 className="editor-title">エラー</h1>
                </div>
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                    <p style={{ color: "#d32f2f", marginBottom: "20px" }}>{error}</p>
                    <Link href="/mypage/articles" className="btn btn-secondary">
                        記事一覧に戻る
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="article-editor">
            {/* ヘッダー */}
            <div className="editor-header">
                <h1 className="editor-title">✏️ 記事を編集</h1>
                <div className="editor-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        style={{ color: "#d32f2f", borderColor: "#d32f2f" }}
                    >
                        {isDeleting ? "削除中..." : "🗑️ 削除"}
                    </button>
                    <Link href="/mypage/articles" className="btn btn-secondary">
                        キャンセル
                    </Link>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={`editor-form ${isSubmitting ? "submitting" : ""}`}>
                {/* 基本情報 */}
                <div className="form-section">
                    <h2 className="form-section-title">基本情報</h2>

                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            タイトル
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-input form-input-title"
                            placeholder="記事のタイトルを入力..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                            required
                        />
                        <div className={`char-counter ${titleLength > 80 ? "warning" : ""} ${titleLength > 95 ? "error" : ""}`}>
                            {titleLength}/100
                        </div>
                    </div>
                </div>

                {/* カテゴリ選択 */}
                <div className="form-section">
                    <h2 className="form-section-title">カテゴリ</h2>
                    <div className="category-grid">
                        {categories.map((cat) => (
                            <div key={cat.value} className="category-option">
                                <input
                                    type="radio"
                                    id={`cat-${cat.value}`}
                                    name="category"
                                    value={cat.value}
                                    checked={category === cat.value}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                <label htmlFor={`cat-${cat.value}`}>{cat.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 本文 */}
                <div className="form-section">
                    <h2 className="form-section-title">本文</h2>
                    <div className="form-group">
                        <textarea
                            id="content"
                            name="content"
                            className="form-input form-textarea"
                            placeholder="記事の本文を入力..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <div className="char-counter">
                            {contentLength.toLocaleString()}文字
                        </div>
                    </div>
                </div>

                {/* 公開設定 */}
                <div className="form-section">
                    <h2 className="form-section-title">公開設定</h2>
                    <div className="publish-options">
                        <div className="publish-option">
                            <input
                                type="radio"
                                id="status-draft"
                                name="status"
                                value="draft"
                                checked={!published}
                                onChange={() => setPublished(false)}
                            />
                            <label htmlFor="status-draft">
                                <p className="publish-option-title">📝 下書き</p>
                                <p className="publish-option-desc">
                                    非公開状態で保存します
                                </p>
                            </label>
                        </div>
                        <div className="publish-option">
                            <input
                                type="radio"
                                id="status-publish"
                                name="status"
                                value="publish"
                                checked={published}
                                onChange={() => setPublished(true)}
                            />
                            <label htmlFor="status-publish">
                                <p className="publish-option-title">🚀 公開</p>
                                <p className="publish-option-desc">
                                    記事を公開します
                                </p>
                            </label>
                        </div>
                    </div>
                </div>

                {/* 送信ボタン */}
                <div className="editor-actions" style={{ justifyContent: "flex-end" }}>
                    <Link href="/mypage/articles" className="btn btn-secondary">
                        キャンセル
                    </Link>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting || !title.trim() || !content.trim()}
                    >
                        {isSubmitting ? "保存中..." : "💾 変更を保存"}
                    </button>
                </div>
            </form>
        </div>
    );
}