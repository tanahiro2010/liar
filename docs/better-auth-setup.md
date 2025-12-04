# Better-Auth セットアップガイド

## 📋 完了した作業

### 1. パッケージのインストール
- ✅ `better-auth` をインストール

### 2. Prismaスキーマの更新
以下のモデルを追加しました:
- ✅ `Session` - セッション管理
- ✅ `Account` - OAuth/メール認証
- ✅ `Verification` - メール検証トークン

### 3. 設定ファイルの作成

#### `src/lib/auth.ts` (サーバーサイド)
- Prismaアダプターを使用したBetter-Auth設定
- メール/パスワード認証を有効化
- Google OAuth設定（環境変数が設定されている場合）
- カスタムユーザーフィールド（username, bio, avatar）

#### `src/lib/auth-client.ts` (クライアントサイド)
- React用の認証クライアント
- `signIn`, `signOut`, `signUp`, `useSession`, `useUser` をエクスポート

#### `src/app/api/auth/[...all]/route.ts`
- Next.js App Router用の認証APIエンドポイント

#### `src/components/providers/auth-provider.tsx`
- React用のSessionProvider

### 4. 環境変数の設定
`.env` ファイルに以下を追加:
```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=OEokvLIzR6hxNVKhBvZqegQMJbDm+PHno86PKngDYJ4=
```

### 5. レイアウトの更新
- `AuthProvider` を `layout.tsx` に統合

## 🔧 次のステップ

### 1. データベースマイグレーション
```bash
npm run prisma:migrate
```
または
```bash
npx prisma db push
```

### 2. Google OAuth設定（オプション）
Google Cloud Consoleで認証情報を取得し、`.env` に設定:
```env
GOOGLE_CLIENT_ID=your_actual_google_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
```

### 3. 認証コンポーネントの作成例

#### ログインフォーム
```tsx
"use client"

import { signIn } from "@/lib/auth-client"
import { useState } from "react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn.email({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <button type="submit">ログイン</button>
    </form>
  )
}
```

#### サインアップフォーム
```tsx
"use client"

import { signUp } from "@/lib/auth-client"
import { useState } from "react"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signUp.email({
      email,
      password,
      name,
      username,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="ユーザー名"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="表示名"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <button type="submit">登録</button>
    </form>
  )
}
```

#### ユーザー情報の取得
```tsx
"use client"

import { useSession } from "@/lib/auth-client"

export function UserProfile() {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>読み込み中...</div>
  if (!session) return <div>ログインしてください</div>

  return (
    <div>
      <h2>ようこそ、{session.user.name}さん</h2>
      <p>@{session.user.username}</p>
      <p>{session.user.email}</p>
    </div>
  )
}
```

## 📚 参考リンク
- [Better-Auth公式ドキュメント](https://www.better-auth.com/)
- [Prismaアダプター](https://www.better-auth.com/docs/integrations/prisma)
- [Next.js統合](https://www.better-auth.com/docs/integrations/next-js)
