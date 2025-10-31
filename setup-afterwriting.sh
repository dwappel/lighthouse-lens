#!/bin/bash

echo "🔦 Lighthouse Lens - Afterwriting Setup"
echo "========================================"
echo ""

# Check if afterwriting-labs exists
if [ ! -d "../afterwriting-labs" ]; then
    echo "❌ Error: afterwriting-labs not found!"
    exit 1
fi

echo "✅ Found afterwriting-labs"
echo ""

# Copy the Fountain parser
cp -r ../afterwriting-labs/js/plugin/fountain third-party/afterwriting/
echo "  ✅ Fountain parser copied"

# Copy utilities
cp -r ../afterwriting-labs/js/utils third-party/afterwriting/
echo "  ✅ Utilities copied"

# Copy license
cp ../afterwriting-labs/LICENSE third-party/afterwriting/LICENSE
echo "  ✅ License copied"

# Copy samples
cp -r ../afterwriting-labs/samples assets/
echo "  ✅ Samples copied"

echo ""
echo "✅ Setup complete!"
