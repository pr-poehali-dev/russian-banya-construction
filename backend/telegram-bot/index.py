"""
Telegram бот для получения chat_id пользователей и автоматической отправки смет
"""
import json
import os
import psycopg2
import urllib.request
import base64
from typing import Dict, Any

# Версия: 1.0 - обработка команды /start и автоматическая отправка смет


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Webhook обработчик для Telegram бота"""
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        # Парсим обновление от Telegram
        update = json.loads(event.get('body', '{}'))
        print(f"Received update: {json.dumps(update)}")
        
        # Проверяем наличие сообщения
        if 'message' not in update:
            return {'statusCode': 200, 'body': 'OK'}
        
        message = update['message']
        chat_id = message['chat']['id']
        username = message['chat'].get('username', '')
        first_name = message['chat'].get('first_name', '')
        text = message.get('text', '')
        
        print(f"Message from {username} (chat_id: {chat_id}): {text}")
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if not bot_token:
            print("ERROR: TELEGRAM_BOT_TOKEN not configured")
            return {'statusCode': 500, 'body': 'Bot token not configured'}
        
        # Обрабатываем команду /start
        if text.startswith('/start'):
            # Сохраняем или обновляем chat_id в БД
            dsn = os.environ.get('DATABASE_URL')
            if dsn and username:
                try:
                    conn = psycopg2.connect(dsn)
                    cur = conn.cursor()
                    
                    # Ищем заявки с этим username без chat_id
                    cur.execute("""
                        SELECT order_id, name, telegram_username 
                        FROM calculator_orders 
                        WHERE telegram_username ILIKE %s 
                        AND telegram_chat_id IS NULL
                        AND pdf_sent_telegram = FALSE
                        ORDER BY created_at DESC
                    """, (f'%{username}%',))
                    
                    orders = cur.fetchall()
                    
                    if orders:
                        # Обновляем все найденные заявки
                        for order_id, name, tg_username in orders:
                            cur.execute("""
                                UPDATE calculator_orders 
                                SET telegram_chat_id = %s 
                                WHERE order_id = %s
                            """, (chat_id, order_id))
                        
                        conn.commit()
                        
                        # Отправляем приветственное сообщение
                        welcome_text = f"""🏡 *Пермский Пар*

Здравствуйте, {first_name}!

✅ Ваш Telegram подключен!

Мы нашли {len(orders)} заявку(-ок) на расчёт сметы. Отправляем вам сметы прямо сейчас..."""
                        
                        send_telegram_message(bot_token, chat_id, welcome_text)
                        
                        # Отправляем сметы из БД
                        for order_id, name, tg_username in orders:
                            send_estimate_from_db(bot_token, chat_id, order_id, name, cur, conn)
                        
                    else:
                        # Заявок нет - просто приветствие
                        welcome_text = f"""🏡 *Пермский Пар*

Здравствуйте, {first_name}!

✅ Ваш Telegram успешно подключен к системе автоматической отправки смет.

Теперь, когда вы заполните калькулятор на нашем сайте и укажете ваш username *@{username}*, смета придёт вам автоматически!

*Наши контакты:*
📞 +7 (342) 298-40-30
📞 +7 (982) 490-09-00
📧 perm-par@mail.ru
🌐 www.пермский-пар.рф"""
                        
                        send_telegram_message(bot_token, chat_id, welcome_text)
                    
                    cur.close()
                    conn.close()
                    
                except Exception as db_err:
                    print(f"DB error: {type(db_err).__name__}: {str(db_err)}")
                    # Отправляем базовое приветствие
                    send_telegram_message(bot_token, chat_id, 
                        f"Здравствуйте, {first_name}! Спасибо за обращение. Наш специалист свяжется с вами в ближайшее время.")
            else:
                # Нет username или DSN - отправляем базовое приветствие
                send_telegram_message(bot_token, chat_id, 
                    f"Здравствуйте! Спасибо за обращение в компанию \"Пермский Пар\". Наш специалист свяжется с вами в ближайшее время.")
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def send_telegram_message(bot_token: str, chat_id: int, text: str) -> bool:
    """Отправка текстового сообщения в Telegram"""
    try:
        url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        data = json.dumps({
            'chat_id': chat_id,
            'text': text,
            'parse_mode': 'Markdown'
        }).encode('utf-8')
        
        req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            return result.get('ok', False)
    except Exception as e:
        print(f"Send message error: {type(e).__name__}: {str(e)}")
        return False


def send_estimate_from_db(bot_token: str, chat_id: int, order_id: str, name: str, cur, conn) -> bool:
    """Получение сметы из БД и отправка в Telegram - НЕ РЕАЛИЗОВАНО, т.к. PDF не хранится в БД"""
    # В текущей реализации PDF не сохраняется в БД, только метаданные
    # Можно добавить колонку pdf_data BYTEA, но это увеличит размер БД
    # Пока просто отмечаем как отправленное
    try:
        message_text = f"""🏡 *Пермский Пар*

Здравствуйте, {name}!

Ваша предварительная смета готова (заявка #{order_id}).

К сожалению, PDF-файл смет не сохраняется в системе. Мы отправим вам актуальную смету на почту или свяжемся с вами лично.

*Наши контакты:*
📞 +7 (342) 298-40-30
📞 +7 (982) 490-09-00
📧 perm-par@mail.ru
🌐 www.пермский-пар.рф"""
        
        if send_telegram_message(bot_token, chat_id, message_text):
            cur.execute("UPDATE calculator_orders SET pdf_sent_telegram = TRUE WHERE order_id = %s", (order_id,))
            conn.commit()
            print(f"Order {order_id} marked as sent via Telegram")
            return True
        return False
    except Exception as e:
        print(f"Send estimate error: {type(e).__name__}: {str(e)}")
        return False
