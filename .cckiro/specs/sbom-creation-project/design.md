# SBOM作成プロジェクト - 設計書

## 1. システム設計概要

### 1.1 アーキテクチャ概要
```
┌─────────────────────────────────────────────────────┐
│                GitHub Actions                        │
│  ┌─────────────────┐    ┌─────────────────────────┐  │
│  │  SBOM Generation │    │   Vulnerability Scan   │  │
│  │     Workflow     │    │       Workflow        │  │
│  └─────────────────┘    └─────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────┐
│                   Tools Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │   Syft   │  │  Trivy   │  │npm-sbom  │           │
│  │(Primary) │  │(Security)│  │(Backup)  │           │
│  └──────────┘  └──────────┘  └──────────┘           │
└─────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────┐
│                 Input Sources                       │
│  ┌──────────────┐  ┌─────────────┐                  │
│  │ package.json │  │package-lock │                  │
│  │              │  │   .json     │                  │
│  └──────────────┘  └─────────────┘                  │
└─────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────┐
│                 Output Files                        │
│  ┌─────────────┐ ┌─────────────┐ ┌────────────────┐  │
│  │ SPDX SBOM   │ │CycloneDX    │ │ Vulnerability  │  │
│  │  (.json)    │ │ SBOM(.json) │ │ Report(.json)  │  │
│  └─────────────┘ └─────────────┘ └────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 1.2 設計方針
- **モジュラー設計**: 各ツールを独立したモジュールとして扱い、障害時の影響を最小化
- **冗長性確保**: Primary/Secondaryツール構成で可用性を向上
- **標準準拠**: SPDX 2.3、CycloneDX 1.6の公式仕様に完全準拠
- **自動化優先**: 人的介入を最小限に抑えた完全自動化

## 2. コンポーネント設計

### 2.1 SBOM生成エンジン

#### 2.1.1 Syft (Primary Engine)
```yaml
Tool: anchore/syft
Version: latest
Supported Formats:
  - SPDX 2.3 (JSON)
  - CycloneDX 1.6 (JSON)
Input Sources:
  - package.json
  - package-lock.json
  - node_modules/
Output:
  - sbom-syft.spdx.json
  - sbom-syft.cyclonedx.json
```

#### 2.1.2 npm-sbom (Secondary Engine)
```yaml
Tool: @microsoft/sbom-tool
Version: latest
Supported Formats:
  - SPDX 2.3 (JSON)
Input Sources:
  - package.json
  - package-lock.json
Output:
  - sbom-npm.spdx.json
```

### 2.2 脆弱性スキャンエンジン

#### 2.2.1 Trivy Scanner
```yaml
Tool: aquasecurity/trivy
Version: latest
Scan Targets:
  - package.json
  - package-lock.json
  - SBOM files
Output Formats:
  - JSON
  - SARIF
Databases:
  - GitHub Advisory Database
  - OSV Database
  - NVD
```

### 2.3 SBOM統合・検証エンジン

#### 2.3.1 統合処理
```yaml
Process: SBOM Merge & Validation
Input:
  - sbom-syft.spdx.json
  - sbom-syft.cyclonedx.json
  - sbom-npm.spdx.json
Operations:
  - 重複除去
  - データ整合性チェック
  - フォーマット検証
Output:
  - sbom-final.spdx.json
  - sbom-final.cyclonedx.json
```

## 3. ワークフロー設計

### 3.1 SBOM生成ワークフロー

```yaml
name: SBOM Generation
triggers:
  - push to main
  - pull request
  - dependency update
  - manual dispatch
  - scheduled (daily)

jobs:
  sbom-generation:
    steps:
      1. Environment Setup
      2. Dependency Analysis
      3. Primary SBOM Generation (Syft)
      4. Secondary SBOM Generation (npm-sbom)
      5. SBOM Validation & Merge
      6. Digital Signature
      7. Artifact Upload
```

### 3.2 脆弱性スキャンワークフロー

```yaml
name: Vulnerability Scan
triggers:
  - SBOM generation completion
  - scheduled (daily)
  - security advisory update

jobs:
  vulnerability-scan:
    steps:
      1. SBOM Download
      2. Trivy Security Scan
      3. Vulnerability Report Generation
      4. VEX Document Creation
      5. Critical Vulnerability Alert
      6. Report Upload
```

## 4. データモデル設計

### 4.1 SPDX SBOM構造
```json
{
  "spdxVersion": "SPDX-2.3",
  "creationInfo": {
    "created": "2024-01-XX",
    "creators": ["Tool: syft"],
    "licenseListVersion": "3.21"
  },
  "name": "dedication-portfolio",
  "dataLicense": "CC0-1.0",
  "SPDXID": "SPDXRef-DOCUMENT",
  "packages": [
    {
      "SPDXID": "SPDXRef-Package-{name}",
      "name": "{package-name}",
      "downloadLocation": "NOASSERTION",
      "filesAnalyzed": false,
      "licenseConcluded": "{license}",
      "licenseDeclared": "{license}",
      "copyrightText": "NOASSERTION",
      "externalRefs": [
        {
          "referenceCategory": "PACKAGE_MANAGER",
          "referenceType": "npm",
          "referenceLocator": "{name}@{version}"
        }
      ]
    }
  ],
  "relationships": [
    {
      "spdxElementId": "SPDXRef-DOCUMENT",
      "relationshipType": "DESCRIBES",
      "relatedSpdxElement": "SPDXRef-Package-root"
    }
  ]
}
```

### 4.2 CycloneDX SBOM構造
```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "serialNumber": "urn:uuid:{uuid}",
  "version": 1,
  "metadata": {
    "timestamp": "2024-01-XX",
    "tools": [
      {
        "vendor": "anchore",
        "name": "syft",
        "version": "v0.XX"
      }
    ],
    "component": {
      "type": "application",
      "name": "dedication-portfolio",
      "version": "0.1.0"
    }
  },
  "components": [
    {
      "type": "library",
      "name": "{package-name}",
      "version": "{version}",
      "purl": "pkg:npm/{name}@{version}",
      "licenses": [
        {
          "license": {
            "id": "{license-id}"
          }
        }
      ]
    }
  ],
  "dependencies": [
    {
      "ref": "pkg:npm/{name}@{version}",
      "dependsOn": []
    }
  ]
}
```

### 4.3 脆弱性レポート構造
```json
{
  "scanInfo": {
    "timestamp": "2024-01-XX",
    "scanner": "trivy",
    "version": "v0.XX"
  },
  "target": "package-lock.json",
  "vulnerabilities": [
    {
      "VulnerabilityID": "CVE-XXXX-XXXX",
      "PkgName": "{package-name}",
      "InstalledVersion": "{version}",
      "FixedVersion": "{fixed-version}",
      "Severity": "HIGH|MEDIUM|LOW",
      "Description": "{description}",
      "References": ["{url}"]
    }
  ]
}
```

## 5. セキュリティ設計

### 5.1 デジタル署名
```yaml
Signature Method: GPG/cosign
Key Management: GitHub Secrets
Signature Files:
  - sbom-final.spdx.json.sig
  - sbom-final.cyclonedx.json.sig
Verification: 
  - Public key distribution
  - Automated verification in CI
```

### 5.2 アクセス制御
```yaml
SBOM Files Access:
  - Public: 読み取り専用
  - Maintainers: 読み取り・更新
  - GitHub Actions: 読み取り・作成・更新

Secrets Management:
  - GPG_PRIVATE_KEY: GitHub Secrets
  - TRIVY_TOKEN: GitHub Secrets (if needed)
```

### 5.3 機密情報保護
```yaml
Excluded Information:
  - API Keys
  - Database Passwords
  - Internal URLs
  - Development Dependencies (filtered)

Sanitization Rules:
  - Environment variable filtering
  - Path information normalization
  - User information anonymization
```

## 6. ファイル構成設計

### 6.1 ディレクトリ構造
```
.
├── .github/
│   ├── workflows/
│   │   ├── sbom-generation.yml
│   │   └── vulnerability-scan.yml
│   └── scripts/
│       ├── generate-sbom.sh
│       ├── validate-sbom.sh
│       └── merge-sbom.sh
├── sbom/
│   ├── sbom-final.spdx.json
│   ├── sbom-final.cyclonedx.json
│   ├── vulnerability-report.json
│   ├── sbom-verification.txt
│   └── README.md
└── tools/
    ├── sbom-config.yaml
    └── trivy-config.yaml
```

### 6.2 設定ファイル設計

#### sbom-config.yaml
```yaml
sbom:
  formats:
    - spdx-json
    - cyclonedx-json
  
  tools:
    primary: syft
    secondary: npm-sbom
    validator: spdx-tools
  
  output:
    directory: ./sbom
    naming: "sbom-{format}"
    
  metadata:
    supplier: "Dedication Portfolio Team"
    namespace: "https://github.com/Takaaki-Shimizu/dedication"
```

#### trivy-config.yaml
```yaml
vulnerability:
  databases:
    - ghsa
    - osv
    - nvd
  
  severity:
    - HIGH
    - CRITICAL
    - MEDIUM
    - LOW
  
  output:
    format: json
    file: vulnerability-report.json
```

## 7. パフォーマンス設計

### 7.1 処理時間目標
- SBOM生成: 3分以内
- 脆弱性スキャン: 2分以内
- 統合・検証: 30秒以内
- 合計実行時間: 5分以内

### 7.2 最適化戦略
- 並列処理: Syftとnpm-sbomの同時実行
- キャッシュ活用: Node.jsモジュールとツールのキャッシュ
- インクリメンタル処理: 変更のみの差分更新
- リソース制限: 適切なメモリ・CPU制限設定

## 8. 監視・ログ設計

### 8.1 ログレベル
- ERROR: 処理失敗、クリティカル問題
- WARN: 軽微な問題、推奨事項違反
- INFO: 処理状況、実行結果
- DEBUG: 詳細なトレース情報

### 8.2 メトリクス
- 実行時間計測
- ファイルサイズ計測
- 脆弱性数カウント
- 成功・失敗率

### 8.3 アラート
- Critical脆弱性検出時
- SBOM生成失敗時
- ファイルサイズ異常時
- 実行時間超過時

## 9. テスト設計

### 9.1 単体テスト
- 各ツールの個別動作確認
- フォーマット検証
- データ整合性チェック

### 9.2 統合テスト
- ワークフロー全体の動作確認
- 依存関係変更時の動作
- 障害時の復旧動作

### 9.3 受入テスト
- 要件FR-001～FR-012の全項目
- 非機能要件NFR-001～NFR-010の全項目
- 成功基準の完全達成

---

**注記**: この設計書は要件定義書に基づいて作成されており、次のフェーズ（実装計画）への入力となります。