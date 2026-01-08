#!/bin/bash

# Get all commits that modified projectData.ts
echo "=== All commits for projectData.ts ==="
git log --oneline -- src/components/home/projectData.ts

echo ""
echo "=== Searching for projects in commit history ==="

# Get all commit hashes
commits=$(git log --format=%H -- src/components/home/projectData.ts)

for commit in $commits; do
    echo "Checking commit: $commit"
    content=$(git show $commit:src/components/home/projectData.ts 2>/dev/null)
    
    if echo "$content" | grep -qi "красная"; then
        echo "Found 'Красная' in commit: $commit"
        echo "=== Content ==="
        git show $commit:src/components/home/projectData.ts
        echo ""
        echo "==================================="
        echo ""
    fi
    
    if echo "$content" | grep -qi "ключи"; then
        echo "Found 'Ключи' in commit: $commit"
        echo "=== Content ==="
        git show $commit:src/components/home/projectData.ts
        echo ""
        echo "==================================="
        echo ""
    fi
done
