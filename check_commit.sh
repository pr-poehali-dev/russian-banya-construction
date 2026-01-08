#!/bin/bash
# Check specific commit for project data

COMMIT="2cfba2a1d3de979adac09757e907de22628f0e3a"
FILE="src/components/home/projectData.ts"

echo "Checking commit: $COMMIT"
echo "File: $FILE"
echo ""

git show "$COMMIT:$FILE"
