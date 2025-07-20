#!/bin/bash
set -e

echo "🔒 Starting vulnerability scanning with Trivy..."

# Create output directory
mkdir -p ./sbom

# Run Trivy vulnerability scan in JSON format
echo "📊 Scanning for vulnerabilities..."
trivy fs . \
  --format json \
  --output ./sbom/vulnerability-report.json \
  --severity CRITICAL,HIGH,MEDIUM,LOW \
  --ignore-unfixed=false \
  --quiet

# Run Trivy scan in SARIF format for GitHub Security
echo "📋 Generating SARIF report for GitHub Security..."
trivy fs . \
  --format sarif \
  --output ./sbom/vulnerability-report.sarif \
  --severity CRITICAL,HIGH,MEDIUM,LOW \
  --quiet

# Generate summary report
echo "📈 Generating vulnerability summary..."
if [[ -f "./sbom/vulnerability-report.json" ]]; then
  # Count vulnerabilities by severity
  CRITICAL_COUNT=$(jq '[.Results[]?.Vulnerabilities[]? | select(.Severity == "CRITICAL")] | length' ./sbom/vulnerability-report.json 2>/dev/null || echo "0")
  HIGH_COUNT=$(jq '[.Results[]?.Vulnerabilities[]? | select(.Severity == "HIGH")] | length' ./sbom/vulnerability-report.json 2>/dev/null || echo "0")
  MEDIUM_COUNT=$(jq '[.Results[]?.Vulnerabilities[]? | select(.Severity == "MEDIUM")] | length' ./sbom/vulnerability-report.json 2>/dev/null || echo "0")
  LOW_COUNT=$(jq '[.Results[]?.Vulnerabilities[]? | select(.Severity == "LOW")] | length' ./sbom/vulnerability-report.json 2>/dev/null || echo "0")
  TOTAL_COUNT=$((CRITICAL_COUNT + HIGH_COUNT + MEDIUM_COUNT + LOW_COUNT))
  
  # Generate summary report
  cat > ./sbom/vulnerability-summary.txt << EOF
Vulnerability Scan Summary
=========================
Scan Date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Scanner: Trivy
Target: Dedication Portfolio (Node.js Application)

Vulnerability Counts:
- 🔴 Critical: $CRITICAL_COUNT
- 🟠 High: $HIGH_COUNT  
- 🟡 Medium: $MEDIUM_COUNT
- 🔵 Low: $LOW_COUNT
- 📊 Total: $TOTAL_COUNT

Files Generated:
- vulnerability-report.json (Detailed JSON report)
- vulnerability-report.sarif (GitHub Security format)
- vulnerability-summary.txt (This summary)

Status: $(if [ $CRITICAL_COUNT -eq 0 ]; then echo "✅ No critical vulnerabilities"; else echo "⚠️  Critical vulnerabilities found"; fi)
EOF

  echo "📊 Vulnerability scan completed:"
  cat ./sbom/vulnerability-summary.txt
  
  # Alert on critical vulnerabilities
  if [ $CRITICAL_COUNT -gt 0 ]; then
    echo "🚨 WARNING: $CRITICAL_COUNT critical vulnerabilities found!"
    echo "Please review the vulnerability report and take appropriate action."
  fi
else
  echo "❌ Vulnerability scan failed - report file not generated"
  exit 1
fi

echo "✅ Vulnerability scanning completed successfully!"