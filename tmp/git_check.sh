#!/bin/bash

cd "$(dirname "$0")/.." || exit 1

echo "=== Git log for projectData.ts ==="
git log --oneline --all -- src/components/home/projectData.ts

echo ""
echo ""
echo "=== Searching for 'Красная слудка' and 'Ключи' in history ==="
git log --all -p -- src/components/home/projectData.ts | grep -i -C 3 "красная\|ключи"

echo ""
echo ""
echo "=== Full history with dates ==="
git log --pretty=format:"%H %ad %s" --date=short -- src/components/home/projectData.ts
