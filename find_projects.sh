#!/bin/bash

set -e

echo "=============================================="
echo "  Поиск проектов 'Красная слудка' и 'Ключи'"
echo "  в истории git"
echo "=============================================="
echo ""

FILE="src/components/home/projectData.ts"

# Check if file exists
if [ ! -f "$FILE" ]; then
    echo "Ошибка: файл $FILE не найден"
    exit 1
fi

# Get all commits that touched this file
echo "Получение списка коммитов для $FILE..."
COMMITS=$(git log --format=%H --all -- "$FILE")

if [ -z "$COMMITS" ]; then
    echo "Ошибка: не найдено коммитов для файла $FILE"
    exit 1
fi

TOTAL=$(echo "$COMMITS" | wc -l)
echo "Найдено коммитов: $TOTAL"
echo ""

# Output directory
OUT_DIR="./git_history_results"
mkdir -p "$OUT_DIR"

echo "Результаты будут сохранены в: $OUT_DIR"
echo ""

# Check each commit
COUNTER=0
FOUND_KRASNAYA=0
FOUND_KLYUCHI=0

for COMMIT in $COMMITS; do
    COUNTER=$((COUNTER + 1))
    
    # Get commit info
    COMMIT_DATE=$(git show -s --format=%ai "$COMMIT")
    COMMIT_MSG=$(git show -s --format=%s "$COMMIT")
    COMMIT_SHORT=$(echo "$COMMIT" | cut -c1-8)
    
    echo "[$COUNTER/$TOTAL] Проверка коммита $COMMIT_SHORT..."
    echo "  Дата: $COMMIT_DATE"
    echo "  Сообщение: $COMMIT_MSG"
    
    # Get file content at this commit
    CONTENT=$(git show "$COMMIT:$FILE" 2>/dev/null || echo "")
    
    if [ -z "$CONTENT" ]; then
        echo "  Файл не найден в этом коммите"
        echo ""
        continue
    fi
    
    # Check for projects
    FOUND_K=$(echo "$CONTENT" | grep -i "красная" | wc -l)
    FOUND_KEY=$(echo "$CONTENT" | grep -i "ключи" | wc -l)
    
    if [ "$FOUND_K" -gt 0 ] || [ "$FOUND_KEY" -gt 0 ]; then
        echo "  ✓✓✓ НАЙДЕНО! ✓✓✓"
        
        if [ "$FOUND_K" -gt 0 ]; then
            echo "  - 'Красная' найдено $FOUND_K раз(а)"
            FOUND_KRASNAYA=1
            
            # Save full file
            echo "$CONTENT" > "$OUT_DIR/krasnaya_$COMMIT_SHORT.ts"
            echo "  - Сохранено в: $OUT_DIR/krasnaya_$COMMIT_SHORT.ts"
            
            # Extract project block
            echo "$CONTENT" | grep -A 10 -B 2 -i "красная" > "$OUT_DIR/krasnaya_$COMMIT_SHORT.extract.txt"
            echo "  - Извлечение: $OUT_DIR/krasnaya_$COMMIT_SHORT.extract.txt"
        fi
        
        if [ "$FOUND_KEY" -gt 0 ]; then
            echo "  - 'Ключи' найдено $FOUND_KEY раз(а)"
            FOUND_KLYUCHI=1
            
            # Save full file
            echo "$CONTENT" > "$OUT_DIR/klyuchi_$COMMIT_SHORT.ts"
            echo "  - Сохранено в: $OUT_DIR/klyuchi_$COMMIT_SHORT.ts"
            
            # Extract project block
            echo "$CONTENT" | grep -A 10 -B 2 -i "ключи" > "$OUT_DIR/klyuchi_$COMMIT_SHORT.extract.txt"
            echo "  - Извлечение: $OUT_DIR/klyuchi_$COMMIT_SHORT.extract.txt"
        fi
        
        # Save commit info
        {
            echo "Commit: $COMMIT"
            echo "Short: $COMMIT_SHORT"
            echo "Date: $COMMIT_DATE"
            echo "Message: $COMMIT_MSG"
            echo ""
            echo "Найдено 'Красная': $FOUND_K"
            echo "Найдено 'Ключи': $FOUND_KEY"
        } > "$OUT_DIR/commit_${COMMIT_SHORT}_info.txt"
        
        echo ""
    fi
done

echo ""
echo "=============================================="
echo "  РЕЗУЛЬТАТЫ ПОИСКА"
echo "=============================================="
echo ""

if [ "$FOUND_KRASNAYA" -eq 1 ]; then
    echo "✓ Проект 'Красная слудка' НАЙДЕН"
else
    echo "✗ Проект 'Красная слудка' НЕ НАЙДЕН"
fi

if [ "$FOUND_KLYUCHI" -eq 1 ]; then
    echo "✓ Проект 'Ключи' НАЙДЕН"
else
    echo "✗ Проект 'Ключи' НЕ НАЙДЕН"
fi

echo ""
echo "Все результаты сохранены в директории: $OUT_DIR"
echo ""

# List all found files
if [ "$FOUND_KRASNAYA" -eq 1 ] || [ "$FOUND_KLYUCHI" -eq 1 ]; then
    echo "Найденные файлы:"
    ls -lh "$OUT_DIR"
fi

echo ""
echo "Готово!"
