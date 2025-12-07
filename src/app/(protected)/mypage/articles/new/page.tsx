"use client";
import { FormEvent, useState, useRef } from "react";
import { useRouter } from "next/navigation";
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

export default function NewArticlePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("DOMESTIC");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                router.push(`/mypage/articles/${data.data.article.id}`);
            } else {
                alert("記事の作成に失敗しました");
            }
        } catch (error) {
            console.error("記事の作成に失敗しました:", error);
            alert("記事の作成に失敗しました");
        } finally {
            setIsSubmitting(false);
        }
    };

    const titleLength = title.length;
    const contentLength = content.length;

    return (
        <div className="article-editor">
            {/* ヘッダー */}
            <div className="editor-header">
                <h1 className="editor-title">📝 新しい記事を作成</h1>
                <div className="editor-actions">
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
                            placeholder="記事の本文を入力...&#10;&#10;Markdown記法が使えます。"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <div className="char-counter">
                            {contentLength.toLocaleString()}文字
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
                        {isSubmitting ? "送信中..." : "送信する"}
                    </button>
                </div>
            </form>
        </div>
    );
}