#!/usr/bin/env python3
"""
Script to extract "Красная слудка" and "Ключи" project data from git history
"""

import subprocess
import json
import re

def get_commits_for_file(filepath):
    """Get all commits that modified a file"""
    result = subprocess.run(
        ['git', 'log', '--format=%H', '--', filepath],
        capture_output=True,
        text=True,
        check=True
    )
    return result.stdout.strip().split('\n')

def get_file_content_at_commit(commit, filepath):
    """Get file content at specific commit"""
    result = subprocess.run(
        ['git', 'show', f'{commit}:{filepath}'],
        capture_output=True,
        text=True
    )
    if result.returncode == 0:
        return result.stdout
    return None

def get_commit_info(commit):
    """Get commit metadata"""
    result = subprocess.run(
        ['git', 'show', '--no-patch', '--format=%ai|%an|%s', commit],
        capture_output=True,
        text=True,
        check=True
    )
    parts = result.stdout.strip().split('|')
    return {
        'date': parts[0] if len(parts) > 0 else '',
        'author': parts[1] if len(parts) > 1 else '',
        'message': parts[2] if len(parts) > 2 else ''
    }

def extract_project_data(content, project_name):
    """Extract project data from TypeScript file content"""
    # This is a simplified extraction - you may need to adjust based on actual structure
    projects = []
    
    # Try to find project by title
    pattern = rf'\{{\s*img:\s*"([^"]+)".*?title:\s*"([^"]*{project_name}[^"]*)".*?size:\s*"([^"]+)".*?material:\s*"([^"]+)".*?location:\s*"([^"]+)"\s*\}}'
    matches = re.finditer(pattern, content, re.DOTALL | re.IGNORECASE)
    
    for match in matches:
        projects.append({
            'img': match.group(1),
            'title': match.group(2),
            'size': match.group(3),
            'material': match.group(4),
            'location': match.group(5)
        })
    
    return projects

def main():
    filepath = 'src/components/home/projectData.ts'
    search_terms = ['Красная', 'Ключи']
    
    print("=" * 60)
    print("Git History Search for Projects")
    print("=" * 60)
    print()
    
    commits = get_commits_for_file(filepath)
    print(f"Found {len(commits)} commits for {filepath}")
    print()
    
    results = {}
    
    for i, commit in enumerate(commits):
        print(f"Checking commit {i+1}/{len(commits)}: {commit[:8]}...", end=' ')
        
        content = get_file_content_at_commit(commit, filepath)
        if not content:
            print("(file not found)")
            continue
        
        found_terms = []
        for term in search_terms:
            if term.lower() in content.lower():
                found_terms.append(term)
        
        if found_terms:
            print(f"✓ Found: {', '.join(found_terms)}")
            commit_info = get_commit_info(commit)
            
            for term in found_terms:
                if term not in results:
                    results[term] = []
                
                results[term].append({
                    'commit': commit,
                    'commit_info': commit_info,
                    'content': content
                })
        else:
            print()
    
    print()
    print("=" * 60)
    print("RESULTS")
    print("=" * 60)
    print()
    
    for term, commits_data in results.items():
        print(f"\n{'=' * 60}")
        print(f"Project: {term}")
        print(f"Found in {len(commits_data)} commit(s)")
        print('=' * 60)
        
        for idx, data in enumerate(commits_data):
            print(f"\nCommit #{idx + 1}:")
            print(f"  Hash: {data['commit'][:8]}")
            print(f"  Date: {data['commit_info']['date']}")
            print(f"  Author: {data['commit_info']['author']}")
            print(f"  Message: {data['commit_info']['message']}")
            
            # Try to extract structured data
            projects = extract_project_data(data['content'], term)
            if projects:
                print(f"\n  Extracted project data:")
                for proj in projects:
                    print(f"    - Title: {proj['title']}")
                    print(f"      Size: {proj['size']}")
                    print(f"      Material: {proj['material']}")
                    print(f"      Location: {proj['location']}")
                    print(f"      Image: {proj['img']}")
            
            # Save full content to file
            filename = f"{term.lower()}_{data['commit'][:8]}.ts"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(data['content'])
            print(f"\n  Full content saved to: {filename}")
    
    print()
    print("=" * 60)
    print("Search complete!")
    print("=" * 60)

if __name__ == '__main__':
    main()
