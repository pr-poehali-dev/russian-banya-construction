#!/bin/bash

# Show projectData.ts from different commits

echo "Showing history of src/components/home/projectData.ts"
echo ""

# Get all commits
git log --oneline --all -- src/components/home/projectData.ts > /tmp/commits.txt

echo "Total commits found:"
wc -l /tmp/commits.txt

echo ""
echo "Commits list:"
cat /tmp/commits.txt

echo ""
echo ""
echo "Now checking each commit for 'Красная' or 'Ключи'..."
echo ""

while read commit_line; do
    commit=$(echo "$commit_line" | awk '{print $1}')
    message=$(echo "$commit_line" | cut -d' ' -f2-)
    
    content=$(git show "$commit:src/components/home/projectData.ts" 2>/dev/null)
    
    if echo "$content" | grep -qi "красная\|ключи"; then
        echo "========================================"
        echo "FOUND in commit: $commit"
        echo "Message: $message"
        echo "========================================"
        echo "$content"
        echo ""
        echo "========================================"
        echo ""
        
        # Also save to file
        echo "$content" > "/tmp/projectData_$commit.ts"
        echo "Saved to: /tmp/projectData_$commit.ts"
        echo ""
    fi
done < /tmp/commits.txt

echo "Done!"
