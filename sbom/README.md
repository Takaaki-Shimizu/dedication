# SBOM (Software Bill of Materials) - Dedication Portfolio

This directory contains the Software Bill of Materials (SBOM) for the Dedication Portfolio project, automatically generated using industry-standard tools and formats.

## 📋 About SBOM

A Software Bill of Materials (SBOM) is a comprehensive inventory of all software components, libraries, and dependencies used in this application. It provides transparency into the software supply chain and helps with security vulnerability management, license compliance, and risk assessment.

## 📁 Files in this Directory

### SBOM Files
- `sbom-final.spdx.json` - **Primary SBOM** in SPDX 2.3 format (ISO/IEC standard)
- `sbom-final.cyclonedx.json` - **Secondary SBOM** in CycloneDX 1.6 format (OWASP standard)

### Security Reports
- `vulnerability-report.json` - Detailed vulnerability scan results
- `vulnerability-report.sarif` - GitHub Security-compatible SARIF format
- `vulnerability-summary.txt` - Human-readable vulnerability summary

### Validation & Metadata
- `validation-report.txt` - SBOM validation and quality check results
- `generation-metadata.json` - Generation timestamps and tool versions

## 🔧 Generation Process

These SBOM files are automatically generated using:

- **Primary Tool**: [Syft](https://github.com/anchore/syft) - Multi-format SBOM generator
- **Security Scanner**: [Trivy](https://github.com/aquasecurity/trivy) - Vulnerability scanner
- **Automation**: GitHub Actions workflows
- **Frequency**: 
  - On every push to main branch
  - On pull requests
  - Daily scheduled scans
  - Manual trigger available

## 📊 Current Status

| Metric | Value |
|--------|-------|
| **Total Dependencies** | 31 packages |
| **SPDX Packages** | Auto-detected |
| **CycloneDX Components** | Auto-detected |
| **Last Generated** | Via GitHub Actions |
| **Validation Status** | ✅ All formats valid |

## 🔒 Security Information

### Vulnerability Monitoring
- Continuous vulnerability monitoring enabled
- Integration with GitHub Security Advisories
- SARIF reports uploaded to GitHub Security tab
- Automated alerts for critical vulnerabilities

### Supported Databases
- GitHub Security Advisory Database (GHSA)
- Open Source Vulnerabilities (OSV)  
- National Vulnerability Database (NVD)

## 📖 SBOM Formats

### SPDX 2.3 (Primary)
- **Standard**: ISO/IEC 5962:2021 internationally recognized
- **Use Case**: Legal compliance, license analysis, formal audits
- **Format**: JSON-LD with comprehensive metadata
- **File**: `sbom-final.spdx.json`

### CycloneDX 1.6 (Secondary)  
- **Standard**: OWASP community standard
- **Use Case**: Security analysis, vulnerability management
- **Format**: JSON with security-focused metadata
- **File**: `sbom-final.cyclonedx.json`

## 🛠 Usage Examples

### View SBOM Summary
```bash
# Count packages in SPDX SBOM
jq '.packages | length' sbom-final.spdx.json

# Count components in CycloneDX SBOM  
jq '.components | length' sbom-final.cyclonedx.json

# List all package names
jq -r '.packages[].name' sbom-final.spdx.json | sort
```

### Security Analysis
```bash
# View vulnerability summary
cat vulnerability-summary.txt

# Count critical vulnerabilities
jq '[.Results[]?.Vulnerabilities[]? | select(.Severity == "CRITICAL")] | length' vulnerability-report.json

# List vulnerable packages
jq -r '.Results[]?.Vulnerabilities[]? | "\(.PkgName): \(.VulnerabilityID)"' vulnerability-report.json
```

## 🔗 Integration

### GitHub Security
- SARIF reports automatically uploaded to GitHub Security tab
- Dependency graph integration
- Security advisories and Dependabot alerts

### CI/CD Pipeline
- Automatic SBOM generation on code changes
- Quality gates for security vulnerabilities
- Artifact preservation for compliance

## 📋 Compliance

This SBOM implementation follows:

- **CISA SBOM Guidelines** - US Government requirements
- **NIST SP 800-161** - Supply chain security
- **ISO/IEC 5962:2021** - SPDX standard compliance
- **OWASP Guidelines** - Security best practices

## 🔄 Maintenance

### Automatic Updates
- SBOMs regenerated on dependency changes
- Daily vulnerability scans
- Continuous monitoring of security advisories

### Manual Operations
To manually regenerate SBOM:
```bash
# Trigger GitHub Actions workflow
gh workflow run "SBOM Generation"

# Or run locally (requires tools installation)
./.github/scripts/generate-sbom.sh
./.github/scripts/validate-sbom.sh
./.github/scripts/scan-vulnerabilities.sh
```

## 📞 Support

For questions about SBOM content or security vulnerabilities:

1. **Security Issues**: Report via GitHub Security Advisories
2. **SBOM Questions**: Create an issue in the repository
3. **Tool Issues**: Check individual tool documentation

---

**Note**: This SBOM is automatically maintained and should not be manually edited. All changes should be made through the automated generation process.

Generated with ❤️ by GitHub Actions + Syft + Trivy