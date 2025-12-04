# 🎭 Liar - フェイクニュースプラットフォーム

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**「真実より面白い嘘を。」**

Liarは、ユーザーが創作したフェイクニュースを投稿・共有できるエンターテインメントプラットフォームです。虚構新聞のアクセシビリティとアンサイクロペディアの自由度を融合し、誰もが「嘘のニュース」を通じてクリエイティビティを発揮できる場を提供します。

> ⚠️ **重要**: このサイトのすべてのコンテンツはフィクションです。メディアリテラシー向上を目的とした教育的エンターテインメントプラットフォームです。

## ✨ 主要機能

- 📝 **ニュース投稿**: マークダウン対応エディターで自由に創作
- 🎨 **カテゴリー分類**: 政治、経済、スポーツ、エンタメ、科学など
- ⭐ **評価システム**: 面白さ度、リアリティ度、創造性の3軸評価
- 🏆 **ランキング**: 24時間/週間/月間の人気記事
- 👥 **ユーザープロフィール**: フォロー機能とバッジシステム
- 🛡️ **審査システム**: AI + コミュニティによる多段階審査
- 💬 **インタラクション**: いいね、コメント、シェア機能

## 🚀 技術スタック

### フロントエンド
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

### バックエンド（予定）
- **API**: Next.js API Routes / [tRPC](https://trpc.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Supabase / Vercel Postgres)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Storage**: Vercel Blob / Cloudinary
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

### 開発ツール
- **Package Manager**: npm / pnpm / yarn
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git & GitHub

## 📦 セットアップ

### 前提条件
- Node.js 18.17以上
- npm / pnpm / yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/tanahiro2010/liar.git
cd liar

# 依存関係をインストール
npm install
# or
pnpm install
# or
yarn install
```

### 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# サイトURL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# データベース（開発中は不要）
# DATABASE_URL=

# 認証（開発中は不要）
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=

# その他のAPI Key（必要に応じて）
# OPENAI_API_KEY=
```

### 開発サーバーの起動

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# Lintチェック
npm run lint

# 型チェック
npm run type-check
```

## 📁 プロジェクト構造

```
liar/
├── public/              # 静的ファイル
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── layout.tsx  # ルートレイアウト
│   │   └── page.tsx    # ホームページ
│   ├── components/     # Reactコンポーネント
│   ├── hooks/          # カスタムフック
│   ├── lib/            # ユーティリティ・ライブラリ
│   ├── styles/         # グローバルスタイル
│   └── utils/          # ヘルパー関数
├── liar.md            # プロジェクト企画書
├── next.config.ts     # Next.js設定
├── tailwind.config.ts # Tailwind CSS設定
└── tsconfig.json      # TypeScript設定
```

## 🎯 開発ロードマップ

### Phase 1: MVP（進行中）
- [x] プロジェクトセットアップ
- [x] 企画書作成
- [x] SEO対策
- [ ] 基本UI/UXデザイン
- [ ] ホームページ実装
- [ ] 記事閲覧機能
- [ ] ユーザー認証

### Phase 2: コア機能
- [ ] 記事投稿エディター
- [ ] カテゴリー・タグシステム
- [ ] 審査システム
- [ ] いいね・コメント機能
- [ ] ユーザープロフィール

### Phase 3: 高度な機能
- [ ] ランキングシステム
- [ ] フォロー機能
- [ ] バッジ・実績システム
- [ ] AIモデレーション
- [ ] レコメンドエンジン

### Phase 4: マネタイズ
- [ ] 広告統合
- [ ] プレミアムプラン
- [ ] クリエイターエコノミー

## 🛡️ 安全性・倫理的配慮

このプロジェクトは以下のルールに従って運営されます：

### 必須ルール
- ✅ すべてのページに「フィクション」の明示
- ❌ 実在の個人への誹謗中傷禁止
- ❌ 差別的・ヘイトスピーチ禁止
- ❌ 性的・暴力的な過激コンテンツ禁止
- ❌ 詐欺・犯罪の助長禁止

### モデレーション体制
1. AI自動審査（第一段階）
2. コミュニティレビュー（第二段階）
3. 運営による最終チェック（第三段階）

## 🤝 コントリビューション

コントリビューションは大歓迎です！以下の手順でお願いします：

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### コントリビューションガイドライン
- コードスタイルはESLintとPrettierに従ってください
- コミットメッセージは明確に書いてください
- テストを追加してください（実装後）
- ドキュメントを更新してください

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 📞 お問い合わせ

- **開発者**: [tanahiro2010](https://github.com/tanahiro2010)
- **リポジトリ**: [https://github.com/tanahiro2010/liar](https://github.com/tanahiro2010/liar)
- **企画書**: [liar.md](liar.md)

## 🙏 謝辞

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Hosting & Deployment
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI Components
- [虚構新聞](https://kyoko-np.net/) - Inspiration
- すべてのコントリビューターの皆様

---

**Made with 🎭 by the Liar Team**

*すべてのコンテンツはフィクションです。メディアリテラシーを楽しく学びましょう。*