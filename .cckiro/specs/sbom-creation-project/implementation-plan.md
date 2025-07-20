# SBOM作成プロジェクト - 実装計画書

## 1. 実装概要

### 1.1 実装目標
設計書に基づいて、Dedication ポートフォリオサイトのSBOM生成システムを実装する。
完全自動化されたCI/CDパイプラインにより、SPDX・CycloneDX形式のSBOMと脆弱性レポートを生成する。

### 1.2 実装範囲
- GitHub Actions ワークフロー
- SBOM生成スクリプト
- 脆弱性スキャンスクリプト
- 設定ファイル
- ドキュメント

## 2. 実装スケジュール

### 2.1 実装フェーズ
```
Phase 1: 基盤構築 (30分)
├── ディレクトリ構造作成
├── 設定ファイル作成
└── 基本スクリプト作成

Phase 2: SBOM生成実装 (45分)
├── Syft による SBOM 生成
├── npm-sbom による補完
├── SBOM統合・検証
└── GitHub Actions ワークフロー

Phase 3: 脆弱性スキャン実装 (30分)
├── Trivy セットアップ
├── 脆弱性レポート生成
└── VEX ドキュメント作成

Phase 4: 最終統合・テスト (15分)
├── 全体テスト実行
├── ドキュメント最終化
└── 成果物確認
```

### 2.2 タイムライン
- 総実装時間: 120分（2時間）
- 完了目標: 本日中

## 3. 実装ステップ詳細

### 3.1 Phase 1: 基盤構築

#### ステップ 1.1: ディレクトリ構造作成
```bash
# 作成対象ディレクトリ
.github/workflows/
.github/scripts/
sbom/
tools/
```

#### ステップ 1.2: 設定ファイル作成
**作成ファイル:**
- `tools/sbom-config.yaml` - SBOM生成設定
- `tools/trivy-config.yaml` - 脆弱性スキャン設定
- `sbom/README.md` - SBOM ドキュメント

**実装内容:**
```yaml
# tools/sbom-config.yaml
sbom:
  project:
    name: "dedication-portfolio"
    version: "0.1.0"
    supplier: "Dedication Portfolio Team"
    namespace: "https://github.com/Takaaki-Shimizu/dedication"
  
  generation:
    tools:
      primary: "syft"
      secondary: "npm-sbom" 
    formats:
      - "spdx-json"
      - "cyclonedx-json"
    output_dir: "./sbom"
  
  validation:
    schema_check: true
    format_check: true
    completeness_check: true
```

#### ステップ 1.3: 基本スクリプト作成
**作成ファイル:**
- `.github/scripts/generate-sbom.sh` - SBOM生成スクリプト
- `.github/scripts/validate-sbom.sh` - SBOM検証スクリプト
- `.github/scripts/scan-vulnerabilities.sh` - 脆弱性スキャンスクリプト

### 3.2 Phase 2: SBOM生成実装

#### ステップ 2.1: Syft による SBOM 生成
**実装内容:**
```bash
#!/bin/bash
# .github/scripts/generate-sbom.sh

set -e

echo "Starting SBOM generation with Syft..."

# Create output directory
mkdir -p ./sbom

# Generate SPDX SBOM
syft . -o spdx-json=./sbom/sbom-syft.spdx.json

# Generate CycloneDX SBOM  
syft . -o cyclonedx-json=./sbom/sbom-syft.cyclonedx.json

echo "Syft SBOM generation completed"
```

#### ステップ 2.2: npm-sbom による補完
**実装内容:**
```bash
# npm-sbom による SPDX 生成
npx @microsoft/sbom-tool generate \
  --BuildDropPath . \
  --BuildComponentPath . \
  --PackageName dedication-portfolio \
  --PackageVersion 0.1.0 \
  --PackageSupplier "Dedication Portfolio Team"
```

#### ステップ 2.3: GitHub Actions ワークフロー
**作成ファイル:** `.github/workflows/sbom-generation.yml`

**実装内容:**
```yaml
name: SBOM Generation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:

jobs:
  generate-sbom:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      security-events: write
      
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Syft
        run: |
          curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin
          
      - name: Generate SBOM
        run: |
          chmod +x .github/scripts/generate-sbom.sh
          .github/scripts/generate-sbom.sh
          
      - name: Validate SBOM
        run: |
          chmod +x .github/scripts/validate-sbom.sh
          .github/scripts/validate-sbom.sh
          
      - name: Upload SBOM artifacts
        uses: actions/upload-artifact@v4
        with:
          name: sbom-files
          path: ./sbom/
          retention-days: 90
```

### 3.3 Phase 3: 脆弱性スキャン実装

#### ステップ 3.1: Trivy セットアップ
**作成ファイル:** `.github/workflows/vulnerability-scan.yml`

**実装内容:**
```yaml
name: Vulnerability Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM UTC
  workflow_dispatch:

jobs:
  vulnerability-scan:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      security-events: write
      
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'json'
          output: './sbom/vulnerability-report.json'
          
      - name: Run Trivy SARIF scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: './sbom/vulnerability-report.sarif'
          
      - name: Upload SARIF to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: './sbom/vulnerability-report.sarif'
          
      - name: Generate VEX document
        run: |
          chmod +x .github/scripts/generate-vex.sh
          .github/scripts/generate-vex.sh
          
      - name: Upload vulnerability reports
        uses: actions/upload-artifact@v4
        with:
          name: vulnerability-reports
          path: ./sbom/
          retention-days: 90
```

#### ステップ 3.2: 脆弱性レポート生成
**作成ファイル:** `.github/scripts/scan-vulnerabilities.sh`

#### ステップ 3.3: VEX ドキュメント作成
**作成ファイル:** `.github/scripts/generate-vex.sh`

### 3.4 Phase 4: 最終統合・テスト

#### ステップ 4.1: 統合テスト実装
**作成ファイル:** `.github/scripts/test-sbom-pipeline.sh`

#### ステップ 4.2: ドキュメント作成
**作成ファイル:**
- `sbom/README.md` - SBOM使用方法
- `SECURITY.md` - セキュリティポリシー更新

## 4. 実装詳細仕様

### 4.1 ファイル命名規則
```
SBOM Files:
- sbom-final.spdx.json      # 最終SPDX SBOM
- sbom-final.cyclonedx.json # 最終CycloneDX SBOM

Intermediate Files:
- sbom-syft.spdx.json       # Syft生成SPDX
- sbom-syft.cyclonedx.json  # Syft生成CycloneDX
- sbom-npm.spdx.json        # npm-sbom生成

Reports:
- vulnerability-report.json  # JSON形式脆弱性レポート
- vulnerability-report.sarif # SARIF形式レポート
- vex-document.json         # VEXドキュメント
```

### 4.2 メタデータ標準化
```yaml
SBOM Metadata:
  Creator: "GitHub Actions + Syft v{version}"
  Created: "{ISO-8601-timestamp}"
  Namespace: "https://github.com/Takaaki-Shimizu/dedication/sbom/{timestamp}"
  
Package Metadata:
  Supplier: "Dedication Portfolio Team"
  Originator: "npm registry"
  Download Location: "https://registry.npmjs.org/{package}/{version}"
```

### 4.3 エラーハンドリング戦略
```bash
Error Scenarios:
1. Syft インストール失敗
   → npm-sbom をフォールバック

2. 脆弱性DB アクセス失敗
   → キャッシュ使用 + 警告出力

3. SBOM 形式検証失敗
   → 詳細ログ出力 + CI 失敗

4. アーティファクト アップロード失敗
   → リトライ 3回 + 最終失敗時警告
```

## 5. 品質保証計画

### 5.1 テストケース
```yaml
Unit Tests:
- Syft SBOM生成テスト
- npm-sbom SBOM生成テスト
- SBOM形式検証テスト
- 脆弱性スキャンテスト

Integration Tests:
- 完全ワークフロー実行テスト
- 異なるトリガーでの実行テスト
- エラー時の復旧テスト

Acceptance Tests:
- 全31個依存関係の記録確認
- SPDX/CycloneDX形式準拠確認
- 脆弱性検出精度確認
- 実行時間 5分以内確認
```

### 5.2 検証項目
```yaml
SBOM Quality Checks:
- ✅ 全依存関係の網羅性
- ✅ ライセンス情報の正確性
- ✅ バージョン情報の一致
- ✅ フォーマット仕様準拠
- ✅ デジタル署名の有効性

Security Checks:
- ✅ 機密情報の非含有
- ✅ 脆弱性検出の網羅性
- ✅ 偽陽性率の許容範囲
- ✅ レポート形式の正確性
```

## 6. デプロイ・運用計画

### 6.1 段階的デプロイ
```
Stage 1: 開発ブランチでのテスト
├── 機能実装
├── 単体テスト
└── 初期統合テスト

Stage 2: プルリクエストでの検証
├── 完全ワークフロー実行
├── レビュー・承認
└── 品質確認

Stage 3: メインブランチへのマージ
├── 本番環境での自動実行
├── 成果物の生成・公開
└── 監視・アラート開始
```

### 6.2 運用監視
```yaml
Monitoring Points:
- ワークフロー実行成功率
- SBOM生成時間
- 脆弱性検出数
- ファイルサイズトレンド

Alert Conditions:
- Critical脆弱性検出
- ワークフロー連続失敗
- 実行時間超過
- アーティファクト生成失敗
```

## 7. 成功基準

### 7.1 機能成功基準
- ✅ SPDX・CycloneDX SBOM自動生成
- ✅ 31個全依存関係の正確な記録
- ✅ 脆弱性の自動検出・レポート
- ✅ GitHub Actions完全自動化
- ✅ 5分以内の実行時間達成

### 7.2 品質成功基準
- ✅ フォーマット仕様100%準拠
- ✅ 脆弱性検出偽陽性率5%以下
- ✅ CI/CD実行成功率95%以上
- ✅ ドキュメント完成度100%

## 8. リスク軽減策

### 8.1 技術リスク対策
- **Syft障害**: npm-sbomバックアップ
- **GitHub Actions制限**: ローカル実行スクリプト提供
- **脆弱性DB障害**: 複数DB参照・キャッシュ

### 8.2 運用リスク対策
- **設定変更**: バージョン管理・レビュー必須
- **秘密情報漏洩**: 設定ファイルでのフィルタリング
- **実行時間超過**: 並列化・最適化

---

**実装開始準備完了**: この実装計画に基づいて、次フェーズで実際の実装を開始します。