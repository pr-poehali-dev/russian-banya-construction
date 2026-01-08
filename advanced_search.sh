#!/bin/bash

echo "Продвинутый поиск проектов в Git истории"
echo "=========================================="
echo ""

FILE="src/components/home/projectData.ts"

# Method 1: Use git log with -S (pickaxe)
echo "Метод 1: Git pickaxe search"
echo "----------------------------"
echo ""

echo "Поиск 'Красная':"
git log -S"Красная" --oneline --all -- "$FILE"
echo ""

echo "Поиск 'красная':"
git log -S"красная" --oneline --all -- "$FILE"
echo ""

echo "Поиск 'Ключи':"
git log -S"Ключи" --oneline --all -- "$FILE"
echo ""

echo "Поиск 'ключи':"
git log -S"ключи" --oneline --all -- "$FILE"
echo ""

# Method 2: Use git log with -G (regex)
echo ""
echo "Метод 2: Git regex search"
echo "-------------------------"
echo ""

echo "Поиск regex '[Кк]расная':"
git log -G"[Кк]расная" --oneline --all -- "$FILE"
echo ""

echo "Поиск regex '[Кк]лючи':"
git log -G"[Кк]лючи" --oneline --all -- "$FILE"
echo ""

# Method 3: Show full diff with context
echo ""
echo "Метод 3: Полный diff с контекстом"
echo "----------------------------------"
echo ""

echo "Изменения для 'Красная':"
git log -p -S"Красная" --all -- "$FILE" | head -200
echo ""

echo "Изменения для 'Ключи':"
git log -p -S"Ключи" --all -- "$FILE" | head -200
echo ""

# Method 4: Check all branches
echo ""
echo "Метод 4: Проверка всех веток"
echo "-----------------------------"
echo ""

git branch -a

echo ""
echo "Готово!"
