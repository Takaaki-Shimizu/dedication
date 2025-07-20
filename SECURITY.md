# Security Policy

## Supported Versions

We provide security updates for the following versions of the Dedication Portfolio:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

### 🔒 Private Disclosure

For sensitive security issues, please email the maintainers privately rather than creating a public issue.

### 🐛 GitHub Security Advisories

For non-sensitive security issues, you can use GitHub's Security Advisory feature:

1. Navigate to the Security tab of this repository
2. Click "Report a vulnerability"
3. Fill out the security advisory form

## Software Bill of Materials (SBOM)

This project maintains comprehensive Software Bills of Materials (SBOM) to ensure supply chain transparency and security:

### 📋 Available Formats

- **SPDX 2.3** (ISO/IEC 5962:2021): `sbom/sbom-final.spdx.json`
- **CycloneDX 1.6** (OWASP): `sbom/sbom-final.cyclonedx.json`

### 🔍 Vulnerability Monitoring

We use automated vulnerability scanning to monitor our dependencies:

- **Scanner**: Trivy (Aqua Security)
- **Databases**: GitHub Advisory Database, OSV, NVD
- **Frequency**: Daily automated scans + on-demand
- **Reports**: Available in `sbom/` directory

### 📊 Current Security Status

Our latest vulnerability scan results are available in:
- `sbom/vulnerability-summary.txt` - Human-readable summary
- `sbom/vulnerability-report.json` - Detailed JSON report
- `sbom/vulnerability-report.sarif` - GitHub Security integration

### 🎯 VEX (Vulnerability Exploitability eXchange)

We provide VEX documents to communicate the exploitability status of vulnerabilities:
- `sbom/vex-document.json` - CycloneDX VEX format
- `sbom/vex-summary.txt` - VEX summary report

## Security Measures

### 🔐 Dependency Management

- All dependencies are tracked in our SBOM
- Regular updates via Dependabot
- Vulnerability scanning on every commit
- License compliance monitoring

### 🛡️ Development Security

- Code scanning with GitHub Advanced Security
- Dependency vulnerability alerts
- Automated security updates for non-breaking changes
- Regular security audits

### 🚀 Deployment Security

- Container scanning (if applicable)
- Infrastructure as Code security scanning
- Secrets management best practices
- Minimal attack surface

## Compliance & Standards

This project follows security best practices and compliance requirements:

### 📜 Standards Compliance

- **NIST SP 800-161**: Supply Chain Risk Management
- **CISA SBOM Guidelines**: Software Bill of Materials
- **ISO/IEC 5962:2021**: SPDX Standard
- **OWASP Guidelines**: Security best practices

### 🏛️ Regulatory Alignment

- **Executive Order 14028**: Improving Cybersecurity (US)
- **EU DORA**: Digital Operational Resilience Act (2025)
- **Software Supply Chain Security**: Industry best practices

## Security Updates

### 🔄 Automatic Updates

- GitHub Dependabot manages dependency updates
- Automated vulnerability scanning via GitHub Actions
- SBOM regeneration on dependency changes
- Security advisory notifications

### 📈 Manual Review Process

1. **Critical Vulnerabilities**: Immediate assessment and patching
2. **High Vulnerabilities**: Weekly review and patching
3. **Medium/Low Vulnerabilities**: Monthly review cycle
4. **False Positives**: Documented in VEX documents

## Security Tools & Automation

### 🔧 Integrated Security Tools

| Tool | Purpose | Integration |
|------|---------|-------------|
| Syft | SBOM Generation | GitHub Actions |
| Trivy | Vulnerability Scanning | GitHub Actions |
| Dependabot | Dependency Updates | GitHub Native |
| CodeQL | Code Analysis | GitHub Advanced Security |

### 📊 Security Metrics

We track the following security metrics:

- Number of dependencies with known vulnerabilities
- Time to patch critical vulnerabilities
- SBOM generation success rate
- Security scan coverage

## Incident Response

### 🚨 Critical Vulnerability Process

1. **Detection**: Automated scanning or manual report
2. **Assessment**: Severity and impact evaluation
3. **Mitigation**: Immediate workarounds if available
4. **Patching**: Dependency updates or code fixes
5. **Verification**: Testing and validation
6. **Communication**: Security advisory publication

### 📞 Contact Information

For security-related questions or concerns:

- **Security Issues**: Use GitHub Security Advisories
- **General Questions**: Create a GitHub issue
- **SBOM Questions**: Reference the `sbom/README.md` documentation

## Security Resources

### 📚 Additional Resources

- [NIST SBOM Guidance](https://www.nist.gov/itl/executive-order-14028-improving-nations-cybersecurity/software-supply-chain-security)
- [CISA SBOM Resources](https://www.cisa.gov/sbom)
- [OWASP Supply Chain Security](https://owasp.org/www-project-software-component-verification-standard/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

---

**Last Updated**: $(date -u +"%Y-%m-%d")  
**Security Policy Version**: 1.0  
**SBOM Generation**: Automated via GitHub Actions