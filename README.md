
# FUKIFUKI - 退職代行サービス

確実・迅速・安心の退職代行サービス

## 🚀 プロジェクト概要

FUKIFUKIは、労働問題のプロフェッショナルが提供する退職代行サービスのWebアプリケーションです。ユーザーフレンドリーなインターフェースと確実な退職手続きサポートを提供します。

## ⚡ セットアップ手順

### 1. リポジトリのクローン
```bash
git clone <YOUR_REPOSITORY_URL>
cd fukifuki
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. Supabaseプロジェクトの設定
1. [Supabase](https://supabase.com) でプロジェクトを作成
2. SQL Editorで以下のテーブルを作成:

```sql
-- プロフィールテーブル
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 案件テーブル
CREATE TABLE cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  company_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('draft', 'submitted', 'hearing', 'negotiating', 'completed')) DEFAULT 'draft',
  reason TEXT,
  employee_name TEXT,
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

### 4. 環境変数の設定
1. `.env.example`を`.env`にコピー
2. Supabaseの設定値を入力:
```bash
cp .env.example .env
```

### 5. 開発サーバーの起動
```bash
npm run dev
```

## ✨ 機能一覧

### ユーザー機能
- 🔐 **認証システム** - メール/パスワード認証
- 📝 **案件作成** - 退職相談フォーム
- 📊 **案件管理** - 自分の案件一覧・進捗確認
- 📈 **進捗追跡** - リアルタイム状況更新

### 管理者機能
- 📊 **ダッシュボード** - KPI表示・統計情報
- 📋 **案件管理** - 全案件の監視・ステータス更新
- 🔍 **検索・フィルター** - 効率的な案件管理
- 📈 **レポート** - 月次推移・成果分析

## 🛠 技術スタック

### フロントエンド
- **React 18** + **TypeScript** - モダンなUI開発
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - ユーティリティファーストCSS
- **shadcn/ui** - 高品質UIコンポーネント
- **React Router v6** - SPA ルーティング
- **TanStack Query** - データフェッチング・状態管理

### バックエンド
- **Supabase** - PostgreSQL + 認証 + リアルタイム
- **Row Level Security (RLS)** - セキュアなデータアクセス

### 将来の実装
- **LiveKit** - リアルタイム通話機能
- **FastAPI + MIDORI** - AI音声アシスタント

## 🎨 デザインシステム

### カラーパレット
- **Primary**: #0066CC (信頼感のあるブルー)
- **Accent**: #FFB703 (活気のあるオレンジ)
- **Secondary**: #10B981 (成功を表すグリーン)

### フォント
- **見出し**: M PLUS 1p
- **本文**: Noto Sans JP

## 📁 プロジェクト構造

```
src/
├── components/          # 再利用可能コンポーネント
│   ├── ui/             # shadcn/ui コンポーネント
│   ├── UserNavigation.tsx
│   └── AdminNavigation.tsx
├── hooks/              # カスタムフック
│   ├── useAuth.tsx     # 認証管理
│   ├── useCases.tsx    # 案件管理
│   └── useStatistics.tsx
├── pages/              # ページコンポーネント
│   ├── Index.tsx       # ランディングページ
│   ├── Login.tsx       # 認証ページ
│   ├── MyPage.tsx      # ユーザーダッシュボード
│   ├── ConsultationNew.tsx # 新規相談
│   ├── AdminDashboard.tsx  # 管理者ダッシュボード
│   └── AdminCases.tsx      # 管理者案件管理
├── lib/                # ユーティリティ
│   ├── utils.ts        # 共通関数
│   └── database-utils.ts # DB操作ヘルパー
└── integrations/       # 外部サービス連携
    └── supabase/       # Supabase設定
```

## 🔧 実装済み機能

- ✅ レスポンシブランディングページ
- ✅ 認証システム (Supabase Auth)
- ✅ ユーザーダッシュボード (案件管理)
- ✅ 管理者ダッシュボード (統計・KPI)
- ✅ 案件CRUD操作
- ✅ リアルタイムデータ更新
- ✅ ステータス管理（5段階）
- ✅ 検索・フィルター機能
- ⏳ 通話機能 (UI実装済み、LiveKit統合待ち)

## 🚀 デプロイ

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
