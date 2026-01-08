#!/bin/bash

# Interactive search for lost projects

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

clear

echo -e "${BOLD}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║   Интерактивный поиск утерянных проектов          ║${NC}"
echo -e "${BOLD}╚════════════════════════════════════════════════════╝${NC}"
echo ""

FILE="src/components/home/projectData.ts"

# Step 1: Check if file exists in history
echo -e "${BLUE}Шаг 1: Проверка истории файла...${NC}"
COMMIT_COUNT=$(git log --oneline --all -- "$FILE" 2>/dev/null | wc -l)

if [ "$COMMIT_COUNT" -eq 0 ]; then
    echo -e "${RED}✗ Файл не найден в истории git${NC}"
    echo "Файл: $FILE"
    exit 1
else
    echo -e "${GREEN}✓ Найдено коммитов: $COMMIT_COUNT${NC}"
fi
echo ""

# Step 2: List recent commits
echo -e "${BLUE}Шаг 2: Последние 10 коммитов для файла:${NC}"
git log --oneline --all -10 -- "$FILE"
echo ""

# Step 3: Ask user which method to use
echo -e "${BOLD}Выберите метод поиска:${NC}"
echo "1) Автоматический поиск во всех коммитах (рекомендуется)"
echo "2) Поиск с помощью git log -S (быстро)"
echo "3) Просмотр конкретного коммита"
echo "4) Показать diff для последних изменений"
echo "5) Выйти"
echo ""
read -p "Ваш выбор [1-5]: " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}Запуск автоматического поиска...${NC}"
        echo ""
        
        OUT_DIR="./git_history_results"
        mkdir -p "$OUT_DIR"
        
        COMMITS=$(git log --format=%H --all -- "$FILE")
        TOTAL=$(echo "$COMMITS" | wc -l)
        COUNTER=0
        
        for COMMIT in $COMMITS; do
            COUNTER=$((COUNTER + 1))
            SHORT=$(echo "$COMMIT" | cut -c1-8)
            
            printf "\rПроверка %d/%d [%s]..." "$COUNTER" "$TOTAL" "$SHORT"
            
            CONTENT=$(git show "$COMMIT:$FILE" 2>/dev/null || echo "")
            
            if echo "$CONTENT" | grep -qi "красная\|ключи"; then
                echo ""
                echo -e "${GREEN}✓ НАЙДЕНО в коммите $SHORT${NC}"
                
                if echo "$CONTENT" | grep -qi "красная"; then
                    echo "  - Содержит 'Красная'"
                    echo "$CONTENT" > "$OUT_DIR/found_$SHORT.ts"
                fi
                
                if echo "$CONTENT" | grep -qi "ключи"; then
                    echo "  - Содержит 'Ключи'"
                    echo "$CONTENT" > "$OUT_DIR/found_$SHORT.ts"
                fi
                
                echo -e "  ${BLUE}Сохранено: $OUT_DIR/found_$SHORT.ts${NC}"
                
                # Ask if user wants to view
                echo ""
                read -p "Показать содержимое? [y/N]: " show
                if [ "$show" = "y" ] || [ "$show" = "Y" ]; then
                    echo ""
                    echo "$CONTENT" | grep -A 10 -B 5 -i "красная\|ключи" | head -50
                    echo ""
                    read -p "Нажмите Enter для продолжения..."
                fi
            fi
        done
        
        echo ""
        echo -e "${GREEN}Поиск завершен!${NC}"
        echo "Результаты в: $OUT_DIR"
        ;;
        
    2)
        echo ""
        echo -e "${BLUE}Поиск с помощью git log -S...${NC}"
        echo ""
        
        echo "Поиск 'Красная':"
        git log -S"Красная" --oneline --all -- "$FILE" || echo "Не найдено"
        echo ""
        
        echo "Поиск 'Ключи':"
        git log -S"Ключи" --oneline --all -- "$FILE" || echo "Не найдено"
        echo ""
        
        read -p "Введите hash коммита для просмотра (или Enter для выхода): " commit
        if [ -n "$commit" ]; then
            echo ""
            git show "$commit:$FILE" | less
        fi
        ;;
        
    3)
        echo ""
        read -p "Введите hash коммита (можно неполный, например abc123): " commit
        
        if [ -z "$commit" ]; then
            echo "Коммит не указан"
            exit 0
        fi
        
        # Find full commit hash
        FULL_COMMIT=$(git log --format=%H --all -- "$FILE" | grep "^$commit")
        
        if [ -z "$FULL_COMMIT" ]; then
            echo -e "${RED}Коммит не найден${NC}"
            exit 1
        fi
        
        echo ""
        echo "Просмотр файла в коммите $FULL_COMMIT..."
        echo ""
        
        git show "$FULL_COMMIT:$FILE" | less
        ;;
        
    4)
        echo ""
        echo -e "${BLUE}Показываю последние изменения...${NC}"
        echo ""
        git log -p -5 -- "$FILE" | less
        ;;
        
    5)
        echo "Выход"
        exit 0
        ;;
        
    *)
        echo -e "${RED}Неверный выбор${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Готово!${NC}"
