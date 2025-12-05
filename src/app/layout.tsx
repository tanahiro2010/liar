import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAdsense from "@/components/utils/adsence";
import Header from "@/components/layout/header";
import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/responsive.css";

export const metadata: Metadata = {
  title: {
    default: "Liar - すべてフェイクのニュースサイト | 創作型フィクションニュースプラットフォーム",
    template: "%s | Liar",
  },
  description: "Liarは誰でも投稿できるフェイクニュースプラットフォームです。虚構新聞のようなフィクション記事を作成・共有し、メディアリテラシーを楽しく学べます。すべての記事は創作であり、エンターテインメント目的です。",
  keywords: [
    "フェイクニュース",
    "虚構新聞",
    "フィクション",
    "パロディニュース",
    "創作ニュース",
    "メディアリテラシー",
    "風刺",
    "アンサイクロペディア",
    "投稿型ニュース",
    "UGC",
  ],
  authors: [{ name: "Liar編集部" }, { name: "tanahiro2010" }],
  creator: "Liar",
  publisher: "Liar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://liar-news.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    title: "Liar - すべてフェイクのニュースサイト",
    description: "誰でも投稿できるフィクションニュースプラットフォーム。創作記事を通じてメディアリテラシーを楽しく学ぼう。",
    siteName: "Liar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Liar - フェイクニュースプラットフォーム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liar - すべてフェイクのニュースサイト",
    description: "誰でも投稿できるフィクションニュースプラットフォーム。創作記事を通じてメディアリテラシーを楽しく学ぼう。",
    images: ["/twitter-image.png"],
    creator: "@liar_news",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "entertainment",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script 
          async 
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous" 
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />

        <div className="mt-10">
          {children}
        </div>

        <GoogleAdsense
          client="ca-pub-xxxxxxxxxxxxxxxx"
          slot="xxxxxxxxxx"
        />
      </body>
    </html>
  );
}
