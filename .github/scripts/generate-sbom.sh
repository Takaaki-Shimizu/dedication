#!/bin/bash
set -e

echo "🚀 Starting SBOM generation with Syft..."

# Create output directory
mkdir -p ./sbom

# Set timestamp for consistent naming
TIMESTAMP=$(date -u +"%Y%m%d_%H%M%S")
echo "📅 Timestamp: $TIMESTAMP"

# Generate SPDX SBOM with Syft
echo "📋 Generating SPDX SBOM..."
syft . \
  --output spdx-json=./sbom/sbom-syft.spdx.json \
  --name "dedication-portfolio" \
  --quiet

# Generate CycloneDX SBOM with Syft
echo "🔄 Generating CycloneDX SBOM..."
syft . \
  --output cyclonedx-json=./sbom/sbom-syft.cyclonedx.json \
  --name "dedication-portfolio" \
  --quiet

# Verify generated files
echo "✅ Verifying generated SBOM files..."
if [[ -f "./sbom/sbom-syft.spdx.json" ]]; then
  echo "  ✓ SPDX SBOM generated successfully"
  echo "  📊 SPDX file size: $(du -h ./sbom/sbom-syft.spdx.json | cut -f1)"
else
  echo "  ❌ SPDX SBOM generation failed"
  exit 1
fi

if [[ -f "./sbom/sbom-syft.cyclonedx.json" ]]; then
  echo "  ✓ CycloneDX SBOM generated successfully"
  echo "  📊 CycloneDX file size: $(du -h ./sbom/sbom-syft.cyclonedx.json | cut -f1)"
else
  echo "  ❌ CycloneDX SBOM generation failed"
  exit 1
fi

# Create copies as final versions
cp ./sbom/sbom-syft.spdx.json ./sbom/sbom-final.spdx.json
cp ./sbom/sbom-syft.cyclonedx.json ./sbom/sbom-final.cyclonedx.json

echo "🎉 SBOM generation completed successfully!"
echo "📂 Generated files:"
ls -la ./sbom/