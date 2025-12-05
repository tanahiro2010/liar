import { TopNews } from "../ui/news";
import Image from "next/image";

export async function TopNewsCard() {
    return (
        <main className="main-news">
            <article className="top-story">
                <div className="top-story-image">
                    <Image
                        src="https://placehold.co/800x350.png?text=Top+News&bg=e0e0e0&fc=666666"
                        alt="トップニュース"
                        width={800}
                        height={350}
                        sizes="(max-width: 900px) 100vw, 800px"
                        priority
                    />
                </div>
                <span className="category-tag">国内</span>
                <h1>主要ニュースのタイトルがここに表示されます</h1>
                <p>ニュースの概要や詳細情報がここに表示されます。重要なポイントや背景情報などを簡潔にまとめた文章が入ります。</p>
                <div className="news-meta">
                    <span>提供元 12/3(火) 14:30</span>
                </div>
            </article>


            <div className="news-list"> { /* TopNews items - 6 items */ }
                <TopNews
                    title="test news 1"
                    url="#"
                    imageUrl="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                />

                <TopNews
                    title="test news 2"
                    url="#"
                    imageUrl="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                />
                <TopNews
                    title="test news 3"
                    url="#"
                    imageUrl="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                />
                <TopNews
                    title="test news 4"
                    url="#"
                    imageUrl="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                />

                <TopNews
                    title="test news 5"
                    url="#"
                    imageUrl="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                />

                <TopNews
                    title="test news 6"
                    url="#"
                    imageUrl="https://placehold.co/120x80.png?text=News&bg=e0e0e0&fc=666666"
                />
            </div>
        </main>
    );
}