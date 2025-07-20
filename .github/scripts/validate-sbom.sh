#!/bin/bash
set -e

echo "🔍 Starting SBOM validation..."

# Validate SPDX SBOM
echo "📋 Validating SPDX SBOM..."
if [[ -f "./sbom/sbom-final.spdx.json" ]]; then
  # Basic JSON validation
  if jq empty ./sbom/sbom-final.spdx.json 2>/dev/null; then
    echo "  ✓ SPDX SBOM is valid JSON"
  else
    echo "  ❌ SPDX SBOM is not valid JSON"
    exit 1
  fi
  
  # Check required SPDX fields
  if jq -e '.spdxVersion' ./sbom/sbom-final.spdx.json >/dev/null; then
    echo "  ✓ SPDX version field present"
  else
    echo "  ❌ SPDX version field missing"
    exit 1
  fi
  
  if jq -e '.packages' ./sbom/sbom-final.spdx.json >/dev/null; then
    PACKAGE_COUNT=$(jq '.packages | length' ./sbom/sbom-final.spdx.json)
    echo "  ✓ Found $PACKAGE_COUNT packages in SPDX SBOM"
  else
    echo "  ❌ No packages found in SPDX SBOM"
    exit 1
  fi
else
  echo "  ❌ SPDX SBOM file not found"
  exit 1
fi

# Validate CycloneDX SBOM
echo "🔄 Validating CycloneDX SBOM..."
if [[ -f "./sbom/sbom-final.cyclonedx.json" ]]; then
  # Basic JSON validation
  if jq empty ./sbom/sbom-final.cyclonedx.json 2>/dev/null; then
    echo "  ✓ CycloneDX SBOM is valid JSON"
  else
    echo "  ❌ CycloneDX SBOM is not valid JSON"
    exit 1
  fi
  
  # Check required CycloneDX fields
  if jq -e '.bomFormat' ./sbom/sbom-final.cyclonedx.json >/dev/null; then
    echo "  ✓ BOM format field present"
  else
    echo "  ❌ BOM format field missing"
    exit 1
  fi
  
  if jq -e '.components' ./sbom/sbom-final.cyclonedx.json >/dev/null; then
    COMPONENT_COUNT=$(jq '.components | length' ./sbom/sbom-final.cyclonedx.json)
    echo "  ✓ Found $COMPONENT_COUNT components in CycloneDX SBOM"
  else
    echo "  ❌ No components found in CycloneDX SBOM"
    exit 1
  fi
else
  echo "  ❌ CycloneDX SBOM file not found"
  exit 1
fi

# Generate validation report
echo "📊 Generating validation report..."
cat > ./sbom/validation-report.txt << EOF
SBOM Validation Report
=====================
Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")

SPDX SBOM:
- File: sbom-final.spdx.json
- Size: $(du -h ./sbom/sbom-final.spdx.json | cut -f1)
- Packages: $PACKAGE_COUNT
- Status: ✅ Valid

CycloneDX SBOM:
- File: sbom-final.cyclonedx.json  
- Size: $(du -h ./sbom/sbom-final.cyclonedx.json | cut -f1)
- Components: $COMPONENT_COUNT
- Status: ✅ Valid

Validation Status: ✅ PASSED
EOF

echo "✅ SBOM validation completed successfully!"
cat ./sbom/validation-report.txt