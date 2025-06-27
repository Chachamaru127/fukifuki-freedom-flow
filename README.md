
# 退職代行フキフキ (FUKIFUKI)

確実・迅速・安心の退職代行サービス

## 🚀 プロジェクト概要

FUKIFUKIは、労働問題のプロが提供する退職代行サービスのWebアプリケーションです。ユーザーフレンドリーなインターフェースと確実な退職手続きサポートを提供します。

## ✨ 主な機能

- 🎯 **プロフェッショナルなランディングページ** - Lottie/SVGアニメーション付き
- 🔐 **完全な認証システム** - Email/Password認証 (Supabase)
- 📊 **ダッシュボード** - KPI表示・進捗管理
- 📋 **案件管理システム** - CRUD機能付き
- 📞 **リアルタイム通話機能** - LiveKit統合
- 🌙 **ダークモード対応** - システム連動
- 📱 **レスポンシブデザイン** - モバイルファースト

## 🛠 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **スタイリング**: Tailwind CSS + shadcn/ui
- **状態管理**: TanStack Query
- **ルーティング**: React Router v6
- **バックエンド**: Supabase
- **リアルタイム通話**: LiveKit
- **ビルドツール**: Vite
- **デプロイ**: Vercel

## 🎨 デザインシステム

### カラーパレット
- **Primary**: #0066CC (信頼感のあるブルー)
- **Accent**: #FFB703 (活気のあるオレンジ)
- **Neutral**: #F4F6F8 (クリーンなグレー)

### フォント
- **見出し**: M PLUS 1p
- **本文**: Noto Sans JP

## 🚦 セットアップ & 起動

### 必要な環境
- Node.js 18+
- npm または yarn

### インストール
```bash
# リポジトリをクローン
git clone <YOUR_GIT_URL>
cd fukifuki

# 依存関係をインストール
npm install
```

### 環境変数設定
`.env.local` ファイルを作成し、以下を設定：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 開発サーバー起動
```bash
npm run dev
```

### Supabase設定

#### データベーステーブル

```sql
-- プロフィールテーブル
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 案件テーブル
CREATE TABLE cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  company_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('draft', 'submitted', 'in_progress', 'completed')) DEFAULT 'draft',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 通話記録テーブル
CREATE TABLE call_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES cases NOT NULL,
  transcript TEXT,
  result_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### RLSポリシー設定

```sql
-- プロフィール
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 案件
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own cases" ON cases FOR ALL USING (auth.uid() = user_id);

-- 通話記録
ALTER TABLE call_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own call results" ON call_results FOR ALL USING (
  EXISTS (SELECT 1 FROM cases WHERE cases.id = call_results.case_id AND cases.user_id = auth.uid())
);
```

## 📁 プロジェクト構造

```
src/
├── components/          # 再利用可能コンポーネント
│   ├── ui/             # shadcn/ui コンポーネント
│   ├── AppSidebar.tsx  # アプリケーションサイドバー
│   └── ThemeToggle.tsx # ダークモード切替
├── hooks/              # カスタムフック
│   ├── useTheme.tsx    # テーマ管理
│   └── use-toast.ts    # トースト通知
├── pages/              # ページコンポーネント
│   ├── Index.tsx       # ランディングページ
│   ├── Login.tsx       # 認証ページ
│   ├── Dashboard.tsx   # ダッシュボード
│   ├── Cases.tsx       # 案件管理
│   └── Call.tsx        # 通話ページ
├── lib/                # ユーティリティ
│   └── utils.ts        # 共通関数
└── App.tsx             # メインアプリケーション
```

## 🔧 主要機能の実装状況

- ✅ レスポンシブランディングページ
- ✅ ダークモード対応
- ✅ 認証システム (モック実装)
- ✅ ダッシュボード (KPI表示)
- ✅ 案件管理 (CRUD)
- ✅ 通話ページ (UI実装)
- ⏳ Supabase統合 (要設定)
- ⏳ LiveKit統合 (要設定)

## 🚀 本番デプロイ

### Vercel へのデプロイ
```bash
# Vercel CLI をインストール
npm i -g vercel

# デプロイ
vercel --prod
```

### 環境変数設定
Vercelの管理画面で以下の環境変数を設定：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📊 パフォーマンス目標

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- Lighthouse Best Practices: 90+
- Lighthouse SEO: 90+

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 📞 サポート

ご質問やサポートが必要な場合は、以下までお問い合わせください：
- Email: info@fukifuki.app
- Tel: 0120-XXX-XXX (24時間365日対応)

---

**退職代行フキフキ** - あなたの新しいスタートを応援します 🌟
