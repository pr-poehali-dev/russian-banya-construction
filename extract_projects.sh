#!/bin/bash

# Script to find "Красная слудка" and "Ключи" projects in git history

echo "======================================"
echo "Git History Search for Projects"
echo "======================================"
echo ""

FILE="src/components/home/projectData.ts"

echo "Searching git history for '$FILE'..."
echo ""

# Get list of all commits that modified this file
COMMITS=$(git log --format=%H -- "$FILE")

echo "Found commits:"
git log --oneline -- "$FILE"
echo ""
echo "======================================"
echo ""

# Check each commit for the projects
for COMMIT in $COMMITS; do
    # Get the file content at this commit
    CONTENT=$(git show "$COMMIT:$FILE" 2>/dev/null)
    
    # Check if it contains our projects
    if echo "$CONTENT" | grep -qi "красная"; then
        echo "✓ Found 'Красная' in commit: $COMMIT"
        COMMIT_INFO=$(git show --no-patch --format="%ai | %s" "$COMMIT")
        echo "  Date & Message: $COMMIT_INFO"
        echo ""
        echo "--- File content at commit $COMMIT ---"
        git show "$COMMIT:$FILE"
        echo ""
        echo "======================================"
        echo ""
    fi
    
    if echo "$CONTENT" | grep -qi "ключи"; then
        echo "✓ Found 'Ключи' in commit: $COMMIT"
        COMMIT_INFO=$(git show --no-patch --format="%ai | %s" "$COMMIT")
        echo "  Date & Message: $COMMIT_INFO"
        echo ""
        echo "--- File content at commit $COMMIT ---"
        git show "$COMMIT:$FILE"
        echo ""
        echo "======================================"
        echo ""
    fi
done

echo ""
echo "Search complete!"
