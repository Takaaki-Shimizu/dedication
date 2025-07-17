# Engineer Portfolio - CLAUDE.md

## プロジェクト概要

エンジニアのポートフォリオサイト。Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui を使用したモダンなレスポンシブWebサイト。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UI コンポーネント**: shadcn/ui
- **アイコン**: Lucide React
- **フォーム**: React Hook Form + Zod
- **テーマ**: next-themes (ダークモード対応)

## プロジェクト構造

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト・SEO設定
│   ├── page.tsx           # メインページ
│   ├── not-found.tsx      # 404エラーページ
│   ├── sitemap.ts         # サイトマップ生成
│   └── globals.css        # グローバルスタイル・アニメーション
├── components/
│   ├── ui/                # shadcn/ui コンポーネント
│   ├── about-section.tsx  # 経歴・プロフィールセクション
│   ├── contact-form.tsx   # お問い合わせフォーム
│   ├── footer.tsx         # フッター
│   ├── header-navigation.tsx # ヘッダーナビゲーション
│   ├── project-card.tsx   # プロジェクトカード
│   ├── projects-section.tsx # プロジェクト一覧
│   ├── skill-card.tsx     # スキルカード
│   ├── strengths-grid.tsx # 強み・特徴表示
│   ├── theme-provider.tsx # テーマプロバイダー
│   ├── theme-toggle.tsx   # ダークモード切替
│   ├── timeline.tsx       # 経歴タイムライン
│   └── typing-animation.tsx # タイピングアニメーション
└── lib/
    └── utils.ts           # ユーティリティ関数
```

## 実装済み機能

### 1. ヒーローセクション
- 日本語でのキャッチコピー・自己紹介
- タイピングアニメーション（職種の循環表示）
- プロフィール写真プレースホルダー
- CTA ボタン（お問い合わせ・作品・履歴書）
- ソーシャルリンク
- フローティングアニメーション

### 2. スキルセクション
- カテゴリ別スキル表示（バックエンド・フロントエンド・データベース・インフラ・ツール）
- プログレスバーによる習熟度表示
- 星評価による視覚的評価
- ホバーエフェクト・アニメーション
- 経験年数と詳細説明

### 3. プロジェクトセクション
- プロジェクトカード形式での表示
- カテゴリフィルタリング機能
- ホバーエフェクト
- サンプルプロジェクト6件
- ステータスバッジ（進行中・完了・公開中）

### 4. 経歴・About セクション
- インタラクティブタイムライン
- 2カラムレイアウト
- 強み・特徴の表示
- 趣味・興味関心
- 資格・認定の表示
- 展開可能な詳細情報

### 5. お問い合わせフォーム
- React Hook Form + Zod バリデーション
- リアルタイムエラー表示
- 送信状態管理
- 成功・エラーメッセージ
- アクセシビリティ対応

### 6. ナビゲーション・フッター
- 固定ヘッダーナビゲーション
- レスポンシブハンバーガーメニュー
- アクティブセクション検知
- スムーススクロール
- ダークモード切替
- フッターでの総合情報

## SEO・パフォーマンス最適化

### SEO設定
- 包括的なメタデータ（日本語・英語対応）
- Open Graph Protocol (OGP) 設定
- Twitter Cards 設定
- 構造化データ（JSON-LD）
- robots.txt
- 動的サイトマップ生成

### パフォーマンス最適化
- Next.js 15 の最新機能活用
- 画像最適化設定
- パッケージインポート最適化
- 圧縮・セキュリティヘッダー
- 静的生成（SSG）
- バンドルサイズ最適化（168kB first load）

### アクセシビリティ
- ARIA ラベル・説明文
- フォーカス管理
- スクリーンリーダー対応
- キーボードナビゲーション
- 動きを抑えるユーザー設定対応
- ハイコントラスト対応

## アニメーション・UI

### カスタムアニメーション
- フェードイン系（上・左・右）
- フローティングアニメーション
- グラデーション背景アニメーション
- タイピングアニメーション
- プログレスバーアニメーション
- ホバーリフトエフェクト

### レスポンシブデザイン
- モバイルファースト設計
- Tailwind CSS ブレークポイント活用
- フレキシブルグリッドレイアウト
- アダプティブタイポグラフィ

## 開発・ビルドコマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# リンター実行
npm run lint
```

## 修正した主要な問題

### 1. サーバーエラー修正
- **問題**: HeaderNavigation と Footer での hydration エラー
- **解決**: mounted state とクライアントサイド API チェック追加

### 2. ハンバーガーメニュー修正
- **問題**: Sheet コンポーネントの動作不良
- **解決**: Radix UI のアクセシビリティ要件対応、アニメーション CSS 追加

### 3. ページ構造修正
- **問題**: ヒーローセクションの HTML 構造エラー
- **解決**: JSX 要素の適切な開閉タグ修正

### 4. ESLint エラー修正
- **問題**: 未使用変数・インポートエラー
- **解決**: 不要なインポート削除、変数名修正

## デプロイ準備

- ✅ プロダクションビルド成功
- ✅ ESLint エラーなし
- ✅ TypeScript エラーなし
- ✅ パフォーマンス最適化済み
- ✅ SEO 設定完了
- ✅ アクセシビリティ対応済み

## 使用する主要パッケージ

```json
{
  "dependencies": {
    "next": "15.3.5",
    "react": "^19.0.0",
    "typescript": "^5",
    "tailwindcss": "^4",
    "@radix-ui/react-*": "latest",
    "lucide-react": "^0.525.0",
    "react-hook-form": "^7.60.0",
    "zod": "^4.0.5",
    "next-themes": "^0.4.6"
  }
}
```

## 今後の拡張可能性

1. **多言語対応**: next-intl などを使用した国際化
2. **CMS連携**: Headless CMS でのコンテンツ管理
3. **アナリティクス**: Google Analytics / Vercel Analytics 導入
4. **PWA化**: サービスワーカー追加
5. **テスト**: Jest + Testing Library でのテスト実装

## メンテナンス注意点

- 定期的な依存関係アップデート
- SEO パフォーマンス監視
- アクセシビリティ監査
- Core Web Vitals 監視
- セキュリティアップデート

---

This portfolio showcases modern web development practices with focus on performance, accessibility, and user experience.