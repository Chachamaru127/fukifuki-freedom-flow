
# FUKIFUKI - 退職代行サービス フロントエンド

## 概要
AI音声対話型の退職代行サービス「FUKIFUKI」のフロントエンドアプリケーション

## 技術スタック
- Frontend: React + TypeScript + Vite
- UI: shadcn/ui + Tailwind CSS  
- Database: Supabase (PostgreSQL + Auth + RLS)
- 将来実装: FastAPI + MIDORI Engine (LiveKit)

## セットアップ手順

### 1. 必要条件
- Node.js 18+
- npm または pnpm
- Supabaseアカウント

### 2. インストール
```bash
git clone [your-repo-url]
cd fukifuki-frontend
npm install
```

### 3. Supabase設定
1. [Supabase](https://supabase.com)でプロジェクト作成
2. SQL Editorで以下を実行:
   - テーブル作成スクリプト（既存のマイグレーションファイル）
   - RLSポリシー設定

### 4. 環境変数
```bash
cp .env.example .env
# .envファイルを編集してSupabase認証情報を設定
```

### 5. 開発サーバー起動
```bash
npm run dev
```

## プロジェクト構成
```
src/
├── components/         # 再利用可能なコンポーネント
│   ├── ui/            # shadcn/uiコンポーネント
│   ├── UserNavigation.tsx
│   └── AdminNavigation.tsx
├── hooks/             # カスタムフック（データ取得等）
│   ├── useAuth.tsx
│   ├── useCases.tsx
│   └── useProfile.tsx
├── lib/               # ユーティリティ、型定義
│   ├── utils.ts
│   └── database.types.ts
├── pages/             # ページコンポーネント
│   ├── Index.tsx      # ランディングページ
│   ├── Login.tsx      # ログインページ
│   ├── MyPage.tsx     # ユーザーダッシュボード
│   ├── ConsultationNew.tsx # 新規相談申込
│   ├── AdminDashboard.tsx  # 管理者ダッシュボード
│   └── AdminCases.tsx      # 管理者案件管理
└── integrations/      # 外部サービス連携
    └── supabase/      # Supabase設定
```

## 機能一覧

### エンドユーザー機能
- ✅ ユーザー登録・ログイン
- ✅ 退職相談申込
- ✅ 案件進捗確認
- ✅ プロフィール管理

### 管理者機能
- ✅ 全案件管理
- ✅ ステータス更新
- ✅ 統計ダッシュボード
- ✅ 検索・フィルター

### セキュリティ機能
- ✅ Row Level Security (RLS) による権限制御
- ✅ 認証必須のプロテクトルート
- ✅ ユーザー別データアクセス制限

## 環境変数設定
`.env`ファイルに以下の変数を設定してください：

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# LiveKit (将来の実装用)
LIVEKIT_URL=your_livekit_server_url
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret

# AI Services (将来の実装用)
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

## データベーススキーマ

### profiles テーブル
- ユーザープロフィール情報
- 権限管理（user/admin）

### cases テーブル
- 退職代行案件管理
- ステータス管理（draft/submitted/hearing/negotiating/completed）

### call_results テーブル
- 通話記録保存（将来実装）

## 開発・デプロイ

### 開発
```bash
npm run dev          # 開発サーバー起動
npm run build        # プロダクションビルド
npm run preview      # ビルド結果プレビュー
npm run lint         # ESLintチェック
```

### デプロイ
```bash
npm run build
# distフォルダをVercel/Netlifyにデプロイ
```

## API エンドポイント

### 認証
- POST `/auth/login` - ログイン
- POST `/auth/signup` - ユーザー登録
- POST `/auth/logout` - ログアウト

### 案件管理
- GET `/api/cases` - 案件一覧取得
- POST `/api/cases` - 新規案件作成
- PUT `/api/cases/:id` - 案件更新
- DELETE `/api/cases/:id` - 案件削除

### プロフィール
- GET `/api/profile` - プロフィール取得
- PUT `/api/profile` - プロフィール更新

## ライセンス
MIT License

## 将来の機能拡張
- 🔄 LiveKitによるリアルタイム通話機能
- 🤖 MIDORI EngineによるAI音声アシスタント
- 📊 高度な分析・レポート機能
- 📱 モバイルアプリ対応

## サポート
ご質問やサポートが必要な場合は、以下までお問い合わせください：
- Email: support@fukifuki.app
- GitHub Issues: プロジェクトのIssuesページ

---
**FUKIFUKI** - あなたの新しいスタートを支援する退職代行サービス 🌟
