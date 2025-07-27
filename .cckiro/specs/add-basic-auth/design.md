# Basic認証導入 - 設計書

## システム構成図

```
Request → Next.js Middleware → Basic認証チェック → Route Handler/Page
                ↓
        401 Unauthorized (認証失敗)
                ↓
        WWW-Authenticate Header → Browser認証プロンプト
```

## ファイル構成

### 新規作成ファイル
1. `/src/middleware.ts` - Basic認証ミドルウェア
2. `/src/lib/auth.ts` - 認証ロジック（ユーティリティ）

### 環境変数設定
- `.env.local` (開発環境)
- 本番環境の環境変数設定

## 詳細設計

### 1. ミドルウェア設計 (`src/middleware.ts`)

#### 役割
- すべてのリクエストをインターセプト
- Basic認証の検証
- 認証失敗時のレスポンス制御

#### 処理フロー
1. リクエストヘッダーから `Authorization` を取得
2. Basic認証形式の検証（`Basic <base64-encoded-credentials>`）
3. Base64デコードでユーザー名・パスワード抽出
4. 環境変数の認証情報と照合
5. 認証成功：`NextResponse.next()` で処理続行
6. 認証失敗：401レスポンス + `WWW-Authenticate` ヘッダー

#### 設定対象
- `matcher` 設定でパス制御
- 静的ファイル（`/_next/`, `/favicon.ico` 等）は除外

### 2. 認証ロジック (`src/lib/auth.ts`)

#### 機能
- Base64デコード処理
- 認証情報の検証
- 環境変数チェック

#### 関数設計
```typescript
// Basic認証ヘッダーの解析
parseBasicAuth(authHeader: string): { username: string; password: string } | null

// 認証情報の検証
validateCredentials(username: string, password: string): boolean

// 環境変数の存在チェック
checkAuthEnvironment(): boolean
```

### 3. 環境変数設計

#### 必須環境変数
- `BASIC_AUTH_USER`: 認証ユーザー名
- `BASIC_AUTH_PASSWORD`: 認証パスワード

#### 開発環境制御
- `NODE_ENV=development` かつ認証情報未設定時はバイパス
- 本番環境では必須

### 4. セキュリティ設計

#### 認証方式
- RFC 7617準拠のHTTP Basic認証
- Base64エンコーディング使用

#### セキュリティ対策
- パスワードの平文ログ出力禁止
- HTTPS前提での運用
- 開発環境のみ認証バイパス可能

## エラーハンドリング

### 認証失敗パターン
1. `Authorization` ヘッダー未設定 → 401 + 認証プロンプト
2. 不正な認証ヘッダー形式 → 401 + 認証プロンプト  
3. 認証情報不一致 → 401 + 認証プロンプト
4. 環境変数未設定（本番） → サーバーエラーログ + 500

### レスポンス仕様
```typescript
// 認証失敗時
{
  status: 401,
  headers: {
    'WWW-Authenticate': 'Basic realm="Portfolio Site"'
  }
}
```

## 非機能要件対応

### パフォーマンス
- ミドルウェアでの軽量な文字列処理のみ
- 認証成功時は即座に処理継続
- 外部API呼び出しなし

### 運用性
- 環境変数での設定変更
- 開発時のデバッグ考慮
- ログ出力なし（セキュリティ配慮）

## 影響範囲

### 変更あり
- 新規ミドルウェア追加のみ

### 変更なし  
- 既存コンポーネント
- ページファイル
- ルーティング
- スタイリング

## テスト観点

### 手動テスト項目
1. 認証なしアクセス → 認証プロンプト表示
2. 正しい認証情報 → ページ表示
3. 間違った認証情報 → 認証プロンプト再表示
4. 静的ファイルアクセス → 認証不要
5. 開発環境での認証バイパス