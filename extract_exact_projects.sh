#!/bin/bash

# Exact script to find and extract "Красная слудка" and "Ключи" projects

set -e

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  Поиск проектов 'Красная слудка' и 'Ключи' в Git истории    ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

FILE="src/components/home/projectData.ts"
OUT_DIR="./extracted_projects"
mkdir -p "$OUT_DIR"

echo "Команда 1: git log --all --full-history -p -- $FILE | grep -B5 -A5 'Красная\|Ключи'"
echo "─────────────────────────────────────────────────────────────────"
echo ""

git log --all --full-history -p -- "$FILE" | grep -B5 -A5 "Красная\|Ключи" > "$OUT_DIR/grep_results.txt" 2>&1 || true

if [ -s "$OUT_DIR/grep_results.txt" ]; then
    echo "✓ Найдены совпадения (сохранено в $OUT_DIR/grep_results.txt)"
    echo ""
    head -50 "$OUT_DIR/grep_results.txt"
else
    echo "✗ Совпадения не найдены методом grep"
fi

echo ""
echo ""
echo "Команда 2: git log --all -S 'Красная' -- $FILE"
echo "─────────────────────────────────────────────────────────────────"
echo ""

git log --all -S"Красная" --format="%H|%ai|%s" -- "$FILE" > "$OUT_DIR/krasnaya_commits.txt" 2>&1 || true

if [ -s "$OUT_DIR/krasnaya_commits.txt" ]; then
    echo "✓ Найдены коммиты с 'Красная':"
    cat "$OUT_DIR/krasnaya_commits.txt"
    echo ""
    
    # Extract from first commit
    FIRST_COMMIT=$(head -1 "$OUT_DIR/krasnaya_commits.txt" | cut -d'|' -f1)
    echo "Извлекаю файл из коммита: $FIRST_COMMIT"
    git show "$FIRST_COMMIT:$FILE" > "$OUT_DIR/krasnaya_full_file.ts" 2>&1 || true
else
    echo "✗ Коммиты с 'Красная' не найдены"
fi

echo ""
echo ""
echo "Команда 3: git log --all -S 'Ключи' -- $FILE"
echo "─────────────────────────────────────────────────────────────────"
echo ""

git log --all -S"Ключи" --format="%H|%ai|%s" -- "$FILE" > "$OUT_DIR/klyuchi_commits.txt" 2>&1 || true

if [ -s "$OUT_DIR/klyuchi_commits.txt" ]; then
    echo "✓ Найдены коммиты с 'Ключи':"
    cat "$OUT_DIR/klyuchi_commits.txt"
    echo ""
    
    # Extract from first commit
    FIRST_COMMIT=$(head -1 "$OUT_DIR/klyuchi_commits.txt" | cut -d'|' -f1)
    echo "Извлекаю файл из коммита: $FIRST_COMMIT"
    git show "$FIRST_COMMIT:$FILE" > "$OUT_DIR/klyuchi_full_file.ts" 2>&1 || true
else
    echo "✗ Коммиты с 'Ключи' не найдены"
fi

echo ""
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "ПОИСК ПО ВСЕМ КОММИТАМ (полное сканирование)"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Get all commits
COMMITS=$(git log --format=%H --all -- "$FILE")
TOTAL=$(echo "$COMMITS" | wc -l)

echo "Всего коммитов для проверки: $TOTAL"
echo ""

COUNTER=0
FOUND_ANY=0

for COMMIT in $COMMITS; do
    COUNTER=$((COUNTER + 1))
    SHORT=$(echo "$COMMIT" | cut -c1-8)
    
    printf "\r[%d/%d] Проверка %s..." "$COUNTER" "$TOTAL" "$SHORT"
    
    CONTENT=$(git show "$COMMIT:$FILE" 2>/dev/null || echo "")
    
    if [ -n "$CONTENT" ]; then
        if echo "$CONTENT" | grep -qi "красная"; then
            echo ""
            echo "✓✓✓ НАЙДЕНО 'Красная' в коммите $SHORT"
            
            COMMIT_INFO=$(git show -s --format="%ai | %s" "$COMMIT")
            echo "    Дата/Сообщение: $COMMIT_INFO"
            
            echo "$CONTENT" > "$OUT_DIR/FOUND_krasnaya_$SHORT.ts"
            echo "    Сохранено: $OUT_DIR/FOUND_krasnaya_$SHORT.ts"
            
            FOUND_ANY=1
        fi
        
        if echo "$CONTENT" | grep -qi "ключи"; then
            echo ""
            echo "✓✓✓ НАЙДЕНО 'Ключи' в коммите $SHORT"
            
            COMMIT_INFO=$(git show -s --format="%ai | %s" "$COMMIT")
            echo "    Дата/Сообщение: $COMMIT_INFO"
            
            echo "$CONTENT" > "$OUT_DIR/FOUND_klyuchi_$SHORT.ts"
            echo "    Сохранено: $OUT_DIR/FOUND_klyuchi_$SHORT.ts"
            
            FOUND_ANY=1
        fi
    fi
done

echo ""
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "ИТОГИ"
echo "═══════════════════════════════════════════════════════════════"
echo ""

ls -lh "$OUT_DIR"/FOUND_*.ts 2>/dev/null || echo "Файлы FOUND_*.ts не найдены"

echo ""
echo "Все результаты сохранены в: $OUT_DIR/"
echo ""

if [ "$FOUND_ANY" -eq 1 ]; then
    echo "✓✓✓ УСПЕХ! Проекты найдены!"
    echo ""
    echo "Следующий шаг: откройте файлы в $OUT_DIR/ и извлеките данные проектов"
else
    echo "✗ Проекты не найдены в истории git"
    echo ""
    echo "Возможно:"
    echo "  - Проекты были в другом файле"
    echo "  - История была изменена"
    echo "  - Проекты никогда не были в этом репозитории"
fi

echo ""
echo "Готово!"
