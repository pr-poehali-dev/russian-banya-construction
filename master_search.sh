#!/bin/bash

# Master script to find lost projects using all available methods

set -e

BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

OUT_DIR="./git_history_results"
FILE="src/components/home/projectData.ts"

echo -e "${BOLD}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║  Мастер поиск проектов в Git истории           ║${NC}"
echo -e "${BOLD}║  'Красная слудка' и 'Ключи'                    ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════════════╝${NC}"
echo ""

# Check if git repo exists
if [ ! -d ".git" ]; then
    echo -e "${RED}Ошибка: это не Git репозиторий!${NC}"
    exit 1
fi

# Check if file exists or existed
if [ ! -f "$FILE" ]; then
    echo -e "${YELLOW}Предупреждение: файл $FILE не найден в рабочей директории${NC}"
    echo "Продолжаем поиск в истории..."
    echo ""
fi

# Create output directory
mkdir -p "$OUT_DIR"
echo -e "${BLUE}Результаты будут сохранены в: $OUT_DIR${NC}"
echo ""

# ============================================
# МЕТОД 1: Git Pickaxe Search
# ============================================
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo -e "${BOLD}МЕТОД 1: Git Pickaxe Search (-S)${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo ""

echo "Поиск 'Красная'..."
git log -S"Красная" --oneline --all -- "$FILE" > "$OUT_DIR/method1_krasnaya_commits.txt" 2>&1 || true
if [ -s "$OUT_DIR/method1_krasnaya_commits.txt" ]; then
    echo -e "${GREEN}✓ Найдены коммиты (сохранено в method1_krasnaya_commits.txt)${NC}"
    cat "$OUT_DIR/method1_krasnaya_commits.txt"
else
    echo -e "${YELLOW}✗ Коммиты не найдены${NC}"
fi
echo ""

echo "Поиск 'Ключи'..."
git log -S"Ключи" --oneline --all -- "$FILE" > "$OUT_DIR/method1_klyuchi_commits.txt" 2>&1 || true
if [ -s "$OUT_DIR/method1_klyuchi_commits.txt" ]; then
    echo -e "${GREEN}✓ Найдены коммиты (сохранено в method1_klyuchi_commits.txt)${NC}"
    cat "$OUT_DIR/method1_klyuchi_commits.txt"
else
    echo -e "${YELLOW}✗ Коммиты не найдены${NC}"
fi
echo ""

# ============================================
# МЕТОД 2: Git Regex Search
# ============================================
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo -e "${BOLD}МЕТОД 2: Git Regex Search (-G)${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo ""

echo "Поиск regex '[Кк]расная'..."
git log -G"[Кк]расная" --oneline --all -- "$FILE" > "$OUT_DIR/method2_krasnaya_commits.txt" 2>&1 || true
if [ -s "$OUT_DIR/method2_krasnaya_commits.txt" ]; then
    echo -e "${GREEN}✓ Найдены коммиты (сохранено в method2_krasnaya_commits.txt)${NC}"
    cat "$OUT_DIR/method2_krasnaya_commits.txt"
else
    echo -e "${YELLOW}✗ Коммиты не найдены${NC}"
fi
echo ""

echo "Поиск regex '[Кк]лючи'..."
git log -G"[Кк]лючи" --oneline --all -- "$FILE" > "$OUT_DIR/method2_klyuchi_commits.txt" 2>&1 || true
if [ -s "$OUT_DIR/method2_klyuchi_commits.txt" ]; then
    echo -e "${GREEN}✓ Найдены коммиты (сохранено в method2_klyuchi_commits.txt)${NC}"
    cat "$OUT_DIR/method2_klyuchi_commits.txt"
else
    echo -e "${YELLOW}✗ Коммиты не найдены${NC}"
fi
echo ""

# ============================================
# МЕТОД 3: Full commit scan
# ============================================
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo -e "${BOLD}МЕТОД 3: Полное сканирование всех коммитов${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo ""

COMMITS=$(git log --format=%H --all -- "$FILE" 2>/dev/null || echo "")

if [ -z "$COMMITS" ]; then
    echo -e "${RED}Ошибка: не найдено коммитов для файла $FILE${NC}"
else
    TOTAL=$(echo "$COMMITS" | wc -l)
    echo "Найдено коммитов для проверки: $TOTAL"
    echo ""
    
    COUNTER=0
    FOUND_K=0
    FOUND_KEY=0
    
    for COMMIT in $COMMITS; do
        COUNTER=$((COUNTER + 1))
        SHORT=$(echo "$COMMIT" | cut -c1-8)
        
        printf "\r[%d/%d] Проверка %s..." "$COUNTER" "$TOTAL" "$SHORT"
        
        CONTENT=$(git show "$COMMIT:$FILE" 2>/dev/null || echo "")
        
        if [ -n "$CONTENT" ]; then
            # Check for Красная
            if echo "$CONTENT" | grep -qi "красная"; then
                echo ""
                echo -e "${GREEN}✓✓✓ НАЙДЕНО 'Красная' в коммите $SHORT${NC}"
                
                COMMIT_DATE=$(git show -s --format=%ai "$COMMIT")
                COMMIT_MSG=$(git show -s --format=%s "$COMMIT")
                
                echo "  Дата: $COMMIT_DATE"
                echo "  Сообщение: $COMMIT_MSG"
                
                # Save full file
                echo "$CONTENT" > "$OUT_DIR/FOUND_krasnaya_$SHORT.ts"
                echo -e "  ${BLUE}Сохранено: FOUND_krasnaya_$SHORT.ts${NC}"
                
                # Extract with context
                echo "$CONTENT" | grep -A 15 -B 5 -i "красная" > "$OUT_DIR/FOUND_krasnaya_$SHORT.extract.txt" || true
                
                # Save commit info
                {
                    echo "Commit: $COMMIT"
                    echo "Date: $COMMIT_DATE"
                    echo "Message: $COMMIT_MSG"
                } > "$OUT_DIR/FOUND_krasnaya_$SHORT.info.txt"
                
                FOUND_K=1
                echo ""
            fi
            
            # Check for Ключи
            if echo "$CONTENT" | grep -qi "ключи"; then
                echo ""
                echo -e "${GREEN}✓✓✓ НАЙДЕНО 'Ключи' в коммите $SHORT${NC}"
                
                COMMIT_DATE=$(git show -s --format=%ai "$COMMIT")
                COMMIT_MSG=$(git show -s --format=%s "$COMMIT")
                
                echo "  Дата: $COMMIT_DATE"
                echo "  Сообщение: $COMMIT_MSG"
                
                # Save full file
                echo "$CONTENT" > "$OUT_DIR/FOUND_klyuchi_$SHORT.ts"
                echo -e "  ${BLUE}Сохранено: FOUND_klyuchi_$SHORT.ts${NC}"
                
                # Extract with context
                echo "$CONTENT" | grep -A 15 -B 5 -i "ключи" > "$OUT_DIR/FOUND_klyuchi_$SHORT.extract.txt" || true
                
                # Save commit info
                {
                    echo "Commit: $COMMIT"
                    echo "Date: $COMMIT_DATE"
                    echo "Message: $COMMIT_MSG"
                } > "$OUT_DIR/FOUND_klyuchi_$SHORT.info.txt"
                
                FOUND_KEY=1
                echo ""
            fi
        fi
    done
    
    echo ""
    echo -e "${BOLD}Сканирование завершено.${NC}"
    echo ""
fi

# ============================================
# SUMMARY
# ============================================
echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║                  ИТОГИ ПОИСКА                    ║${NC}"
echo -e "${BOLD}╔══════════════════════════════════════════════════╗${NC}"
echo ""

# Check what we found
FOUND_FILES=$(find "$OUT_DIR" -name "FOUND_*.ts" 2>/dev/null || true)

if [ -z "$FOUND_FILES" ]; then
    echo -e "${RED}✗ Проекты НЕ НАЙДЕНЫ в истории git${NC}"
    echo ""
    echo "Возможные причины:"
    echo "  1. Проекты никогда не были в этом файле"
    echo "  2. Проекты в другом файле"
    echo "  3. История была переписана (git rebase/reset)"
    echo ""
    echo "Попробуйте:"
    echo "  - Поиск в других ветках: git branch -a"
    echo "  - Поиск в других файлах: grep -r 'Красная' src/"
    echo "  - Проверка reflog: git reflog"
else
    echo -e "${GREEN}✓✓✓ УСПЕХ! Проекты НАЙДЕНЫ!${NC}"
    echo ""
    echo "Найденные файлы:"
    echo ""
    
    for file in $FOUND_FILES; do
        basename "$file"
    done
    
    echo ""
    echo -e "${BOLD}Все результаты в директории: $OUT_DIR${NC}"
    echo ""
    echo "Следующие шаги:"
    echo "  1. Откройте файлы FOUND_*.ts"
    echo "  2. Найдите блоки с проектами"
    echo "  3. Скопируйте данные в текущий projectData.ts"
    echo "  4. Проверьте, что все фото доступны"
fi

echo ""
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Поиск завершен!${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo ""
