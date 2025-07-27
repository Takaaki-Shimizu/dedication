# Basic認証導入 - 実装計画書

## 実装ステップ

### ステップ1: 認証ユーティリティの実装
**ファイル**: `src/lib/auth.ts`

**実装内容**:
1. Basic認証ヘッダーの解析関数
2. 認証情報の検証関数  
3. 環境変数チェック関数

**実装詳細**:
```typescript
// Base64デコードと認証情報抽出
export function parseBasicAuth(authHeader: string): { username: string; password: string } | null

// 環境変数との認証情報照合
export function validateCredentials(username: string, password: string): boolean

// 認証環境の確認
export function checkAuthEnvironment(): boolean
```

### ステップ2: ミドルウェアの実装
**ファイル**: `src/middleware.ts`

**実装内容**:
1. Next.js ミドルウェア関数の作成
2. Basic認証ロジックの統合
3. パスマッチャーの設定

**実装詳細**:
- リクエストのAuthorizationヘッダー確認
- 認証失敗時の401レスポンス
- 静的ファイルの除外設定

### ステップ3: 環境変数設定
**ファイル**: `.env.local` (開発用)

**設定項目**:
```
BASIC_AUTH_USER=portfolio_access_7k9m
BASIC_AUTH_PASSWORD=P0rtf0l!o_S3cur3_2024_xK8nM9qR
```

### ステップ4: TypeScript型定義の追加
**ファイル**: 必要に応じて型定義ファイル更新

**内容**:
- ミドルウェア関連の型定義
- 認証関数の型安全性確保

## 実装順序

### 1. 認証ライブラリ実装 (30分)
- [ ] `src/lib/auth.ts` 作成
- [ ] `parseBasicAuth` 関数実装
- [ ] `validateCredentials` 関数実装
- [ ] `checkAuthEnvironment` 関数実装

### 2. ミドルウェア実装 (45分)
- [ ] `src/middleware.ts` 作成
- [ ] Basic認証チェックロジック実装
- [ ] パスマッチャー設定
- [ ] エラーレスポンス実装

### 3. 環境設定 (15分)
- [ ] `.env.local` ファイル作成
- [ ] 認証情報の設定
- [ ] 開発環境での動作確認

### 4. 動作テスト (30分)
- [ ] 認証なしアクセステスト
- [ ] 正しい認証情報でのアクセステスト
- [ ] 間違った認証情報でのアクセステスト
- [ ] 静的ファイルアクセステスト

## コード実装詳細

### auth.ts の実装方針
```typescript
// 標準ライブラリのみ使用
// エラーハンドリングを適切に実装
// 型安全性を確保
// ログ出力は最小限
```

### middleware.ts の実装方針
```typescript
// Next.js 15 App Router対応
// NextRequest/NextResponseの使用
// 適切なHTTPステータスコード
// WWW-Authenticateヘッダーの設定
```

## テスト計画

### 単体テスト項目
1. `parseBasicAuth` 関数の各種入力パターン
2. `validateCredentials` 関数の認証ロジック
3. `checkAuthEnvironment` 関数の環境変数チェック

### 統合テスト項目
1. ミドルウェアの基本動作
2. 各種HTTPステータスコードの確認
3. ヘッダー設定の確認

### 手動テスト項目
1. ブラウザでの認証プロンプト動作
2. 認証後のページアクセス
3. 開発環境での認証バイパス

## リスク・注意事項

### 実装時の注意点
- Base64デコード時のエラーハンドリング
- 環境変数未設定時の適切な処理
- セキュリティを考慮したログ出力制御

### 潜在的リスク
- HTTPS未使用環境でのパスワード漏洩
- 環境変数の設定漏れ
- 開発環境での認証バイパス設定の本番反映

## 完了基準

### 機能完了基準
- [ ] 全ページでBasic認証が動作
- [ ] 正しい認証情報で正常アクセス可能
- [ ] 間違った認証情報でアクセス拒否
- [ ] 静的ファイルが認証なしでアクセス可能

### 品質完了基準
- [ ] TypeScriptエラーなし
- [ ] ESLintエラーなし
- [ ] 手動テスト全項目パス
- [ ] 既存機能への影響なし

## デプロイ時の追加作業

### 本番環境設定
1. 環境変数 `BASIC_AUTH_USER` の設定（予測困難な値に変更）
2. 環境変数 `BASIC_AUTH_PASSWORD` の設定（強固なパスワードに変更）
3. HTTPS設定の確認
4. 認証動作の本番環境での確認

**本番環境推奨値例**:
- ユーザー名: ランダムな文字列（例: `pf_acc_9kR7mN2x`）
- パスワード: 20文字以上の複雑なパスワード（大小英数字+記号）