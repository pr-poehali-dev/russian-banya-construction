#!/usr/bin/env python3

import subprocess
import sys

# Get all commits for the file
result = subprocess.run(
    ['git', 'log', '--format=%H', '--', 'src/components/home/projectData.ts'],
    capture_output=True,
    text=True
)

commits = result.stdout.strip().split('\n')

print(f"Found {len(commits)} commits for projectData.ts")
print("")

for i, commit in enumerate(commits):
    print(f"Checking commit {i+1}/{len(commits)}: {commit[:8]}")
    
    # Get file content at this commit
    result = subprocess.run(
        ['git', 'show', f'{commit}:src/components/home/projectData.ts'],
        capture_output=True,
        text=True
    )
    
    content = result.stdout
    
    # Check for projects
    if 'Красная' in content or 'красная' in content:
        print(f"  ✓ Found 'Красная слудка' in commit {commit[:8]}")
        
        # Get commit info
        info = subprocess.run(
            ['git', 'show', '--no-patch', '--format=%ai %s', commit],
            capture_output=True,
            text=True
        )
        print(f"  Date: {info.stdout.strip()}")
        
        # Save this version
        with open(f'/tmp/projectData_krasnaya_{commit[:8]}.ts', 'w') as f:
            f.write(content)
        print(f"  Saved to: /tmp/projectData_krasnaya_{commit[:8]}.ts")
        
    if 'Ключи' in content or 'ключи' in content:
        print(f"  ✓ Found 'Ключи' in commit {commit[:8]}")
        
        # Get commit info
        info = subprocess.run(
            ['git', 'show', '--no-patch', '--format=%ai %s', commit],
            capture_output=True,
            text=True
        )
        print(f"  Date: {info.stdout.strip()}")
        
        # Save this version
        with open(f'/tmp/projectData_klyuchi_{commit[:8]}.ts', 'w') as f:
            f.write(content)
        print(f"  Saved to: /tmp/projectData_klyuchi_{commit[:8]}.ts")

print("")
print("Done!")
