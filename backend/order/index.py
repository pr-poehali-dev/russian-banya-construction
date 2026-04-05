"""
Отправка заявки с калькулятора бани на email с PDF-сметой + Telegram бот webhook
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import base64
from typing import Dict, Any
import urllib.request
import psycopg2
import uuid

# Версия: 8.1 - добавлена поддержка скачивания и прикрепления PDF-гайда


def download_pdf_from_url(url: str) -> bytes:
    """Скачивает PDF по URL и возвращает байты"""
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            return response.read()
    except Exception as e:
        print(f"Ошибка скачивания PDF: {e}")
        return b''


SEMINAR_IMAGE_URL = "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/6876d2a0-9219-4357-bf1d-b362d4a1aeac.jpg"


def handle_course_request(body_data):
    name = body_data.get('name', '').strip()
    phone = body_data.get('phone', '').strip()
    email_to = body_data.get('email', '').strip()

    if not name or not phone or not email_to:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните имя, телефон и email'}),
            'isBase64Encoded': False
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient_admin = os.environ.get('RECIPIENT_EMAIL')

    msg_client = MIMEMultipart()
    msg_client['From'] = smtp_user
    msg_client['To'] = email_to
    msg_client['Subject'] = 'Программа семинара «Строительство правильной Русской бани»'

    html_client = f"""
    <html>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; color: #2c2c2c; line-height: 1.7; margin: 0; padding: 0; background-color: #faf8f5;">
        <div style="max-width: 620px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #3a3a3a; text-align: center; margin-bottom: 4px;">{name}, \u0441\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0438\u043d\u0442\u0435\u0440\u0435\u0441 \u043a \u0441\u0435\u043c\u0438\u043d\u0430\u0440\u0443!</h2>
            <p style="text-align: center; color: #777; font-size: 14px;">\u0412\u043e \u0432\u043b\u043e\u0436\u0435\u043d\u0438\u0438 — \u0430\u0444\u0438\u0448\u0430 \u0441 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u043e\u0439 \u0441\u0435\u043c\u0438\u043d\u0430\u0440\u0430</p>

            <div style="background: #ffffff; padding: 32px; border-radius: 16px; margin: 20px 0; border: 1px solid #e8e2d9; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">
                <h1 style="color: #b8860b; text-align: center; margin-top: 0; font-size: 24px;">\U0001f525 \u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0439 \u0420\u0443\u0441\u0441\u043a\u043e\u0439 \u0431\u0430\u043d\u0438</h1>

                <p style="text-align: center; color: #666; font-size: 15px;">\U0001f3e0 \u0411\u0430\u043d\u043d\u044b\u0439 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441 \u00ab\u0414\u0440\u0443\u0433\u0430\u044f \u0431\u0430\u043d\u044f\u00bb</p>

                <hr style="border: none; border-top: 1px solid #e8e2d9; margin: 20px 30px;">

                <p style="color: #b8860b; font-weight: bold; font-size: 15px;">\U0001f9d1\u200d\U0001f3eb \u0412\u0435\u0434\u0443\u0449\u0438\u0435 \u0441\u0435\u043c\u0438\u043d\u0430\u0440\u0430:</p>
                <p style="margin: 6px 0; color: #333;"><b>\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440 \u0421\u0430\u0432\u0438\u043d\u043e\u0432</b> — \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c, 15 \u043b\u0435\u0442 \u043e\u043f\u044b\u0442\u0430</p>
                <p style="margin: 6px 0; color: #333;"><b>\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440 \u0412\u043b\u0430\u0441\u043e\u0432 \u0438 \u041e\u043b\u0438\u0432\u0435\u0440 \u0420\u0430\u0445\u0435</b> — \u043f\u0430\u0440-\u043c\u0430\u0441\u0442\u0435\u0440\u0430</p>

                <hr style="border: none; border-top: 1px solid #e8e2d9; margin: 20px 30px;">

                <p style="color: #b8860b; font-weight: bold; text-align: center; font-size: 16px;">📋 Программа семинара:</p>
                <p style="margin: 8px 0; color: #333;">✅ Знакомство с участниками, цели и задачи курса</p>
                <p style="margin: 8px 0; color: #333;">✅ История русской бани и ее духовная составляющая</p>
                <p style="margin: 8px 0; color: #333;">✅ Отличия режимов бани</p>
                <p style="margin: 8px 0; color: #333;">✅ Физиология и психосоматика в бане</p>
                <p style="margin: 8px 0; color: #333;">✅ Проектирование, планировки и размеры</p>
                <p style="margin: 8px 0; color: #333;">✅ Материалы стен и отделки</p>
                <p style="margin: 8px 0; color: #333;">✅ Выбор банной печи и дымохода</p>
                <p style="margin: 8px 0; color: #333;">✅ Полок</p>
                <p style="margin: 8px 0; color: #333;">✅ Вентиляция</p>
                <p style="margin: 8px 0; color: #333;">✅ Двери, окна</p>
                <p style="margin: 8px 0; color: #333;">✅ Водоснабжение и водоотведение</p>
                <p style="margin: 8px 0; color: #333;">✅ Электрика</p>
                <p style="margin: 8px 0; color: #333;">✅ Безопасность в бане</p>
                <p style="margin: 8px 0; color: #333;">✅ Индивидуальное парение каждого участника пар-мастерами «Другой бани»</p>
                <p style="margin: 8px 0; color: #333;">✅ Разбор возникших вопросов, эмоции от парения, фирменные чаи и напитки, угощения и интересные истории</p>

                <hr style="border: none; border-top: 1px solid #e8e2d9; margin: 20px 30px;">

                <div style="background: #fdf6e3; padding: 18px; border-radius: 10px; border: 1px solid #e8dcc8;">
                    <p style="color: #b8860b; font-weight: bold; margin-top: 0;">\U0001f381 \u0411\u043e\u043d\u0443\u0441 \u0434\u043b\u044f \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432:</p>
                    <p style="margin: 6px 0; color: #444;">\U0001f9d6 \u0416\u0438\u0432\u0430\u044f \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 \u043f\u0430\u0440\u0435\u043d\u0438\u044f \u0441 \u043c\u0430\u0441\u0442\u0435\u0440\u0430\u043c\u0438</p>
                    <p style="margin: 6px 0; color: #444;">\U0001f381 \u041f\u0430\u043c\u044f\u0442\u043d\u044b\u0439 \u043f\u043e\u0434\u0430\u0440\u043e\u043a \u043a\u0430\u0436\u0434\u043e\u043c\u0443 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0443</p>
                    <p style="margin: 6px 0; color: #444;">\u2615 \u0427\u0430\u0439, \u0443\u0433\u043e\u0449\u0435\u043d\u0438\u044f \u0438 \u0431\u0430\u043d\u043d\u044b\u0435 \u0431\u0430\u0439\u043a\u0438 \u0443 \u043a\u0430\u043c\u0438\u043d\u0430</p>
                </div>

                <p style="text-align: center; margin-top: 22px; color: #333;"><b style="color: #b8860b;">\U0001f465 \u0424\u043e\u0440\u043c\u0430\u0442:</b> \u043c\u0438\u043d\u0438-\u0433\u0440\u0443\u043f\u043f\u0430 4\u20136 \u0447\u0435\u043b\u043e\u0432\u0435\u043a</p>
                <p style="text-align: center; color: #333;"><b style="color: #b8860b;">\U0001f4b0 \u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c:</b> 10 000 \u0440\u0443\u0431.</p>
                <p style="text-align: center; color: #888; font-size: 13px;">\u0421\u0435\u043c\u0438\u043d\u0430\u0440 \u0441\u043e\u0441\u0442\u043e\u0438\u0442\u0441\u044f \u043f\u0440\u0438 \u043d\u0430\u0431\u043e\u0440\u0435 \u043e\u0442 4 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432</p>
            </div>

            <div style="text-align: center; margin: 20px 0; padding: 16px; background: #fff; border-radius: 12px; border: 1px solid #e8e2d9;">
                <p style="font-weight: bold; color: #333; font-size: 15px; margin-top: 0;">\u270d\ufe0f \u0417\u0430\u043f\u0438\u0441\u044c \u0438 \u0432\u043e\u043f\u0440\u043e\u0441\u044b — \u0422\u041e\u041b\u042c\u041a\u041e \u0432 \u043b\u0438\u0447\u043d\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u041e\u043b\u0438\u0432\u0435\u0440\u0443 \u0420\u0430\u0445\u0435</p>
                <p style="margin: 8px 0;">
                    <a href="https://t.me/oliverrahe" style="color: #0088cc; text-decoration: none; font-weight: bold; font-size: 15px;">\U0001f4ac Telegram: @oliverrahe</a>
                </p>
                <p style="margin: 8px 0;">
                    <a href="https://vk.com/oliverpar" style="color: #4a76a8; text-decoration: none; font-weight: bold; font-size: 15px;">\U0001f310 \u0412\u041a: vk.com/oliverpar</a>
                </p>
            </div>

            <hr style="border: none; border-top: 1px solid #e8e2d9; margin: 16px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">
                \u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u041f\u0430\u0440 — \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f \u0433. \u041f\u0435\u0440\u043c\u044c<br>
                +7 (342) 298-40-30 | +7 (982) 490-09-00
            </p>
        </div>
    </body>
    </html>
    """
    msg_client.attach(MIMEText(html_client, 'html'))

    msg_admin = MIMEMultipart()
    msg_admin['From'] = smtp_user
    msg_admin['To'] = recipient_admin
    msg_admin['Subject'] = f'Заявка на семинар от {name}'

    html_admin = f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <h2>Новая заявка на семинар «Строительство правильной Русской бани»</h2>
        <p><b>Имя:</b> {name}</p>
        <p><b>Телефон:</b> {phone}</p>
        <p><b>Email:</b> {email_to}</p>
        <hr>
        <p style="color: #999; font-size: 12px;">Афиша семинара отправлена заказчику автоматически.</p>
    </body>
    </html>
    """
    msg_admin.attach(MIMEText(html_admin, 'html'))

    print(f"Sending seminar email to {email_to}")

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.send_message(msg_client)
        print(f"Client email sent to {email_to}")
        if recipient_admin:
            server.send_message(msg_admin)
            print(f"Admin email sent to {recipient_admin}")

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Программа отправлена на email'}),
        'isBase64Encoded': False
    }


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        # Определяем тип запроса: Telegram webhook или заявка калькулятора
        if 'message' in body_data or 'update_id' in body_data:
            return handle_telegram_webhook(body_data)

        if body_data.get('type') == 'course':
            return handle_course_request(body_data)

        # Это заявка с калькулятора
        material = body_data.get('material', '')
        length = body_data.get('length', '')
        width = body_data.get('width', '')
        partitions_length = body_data.get('partitionsLength', '')
        floors = body_data.get('floors', '')
        foundation = body_data.get('foundation', '')
        location = body_data.get('location', '')
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        email_client = body_data.get('email', '')
        telegram_username = body_data.get('telegram', '')
        messenger = body_data.get('messenger', '')
        comment = body_data.get('comment', '')
        pdf_data = body_data.get('pdfData', '')  # Base64 encoded PDF
        attachments = body_data.get('attachments', [])  # Прикреплённые файлы
        guide_url = body_data.get('guideUrl', '')  # URL гайда для скачивания
        
        material_names = {
            'ocilindrovannoe-brevno': 'Оцилиндрованное бревно',
            'obychnyj-brus': 'Обычный брус',
            'kleenyj-brus': 'Клееный брус'
        }
        
        foundation_names = {
            'lentochnyj': 'Ленточный фундамент',
            'stolbchatyj': 'Винтовые сваи',
            'net': 'Фундамент уже есть'
        }
        
        location_names = {
            'perm': 'Пермь',
            'perm-30km': 'До 30 км от Перми',
            'perm-50km': '30-50 км от Перми',
            'perm-100km': '50-100 км от Перми'
        }
        
        # Генерируем уникальный ID заявки
        from datetime import datetime
        order_id = str(uuid.uuid4())[:8].upper()
        
        print(f"Processing order ID: {order_id}")
        
        # Сохраняем заявку в БД
        db_saved = False
        try:
            dsn = os.environ.get('DATABASE_URL')
            if dsn:
                conn = psycopg2.connect(dsn)
                cur = conn.cursor()
                
                # Конвертируем base64 PDF в байты для сохранения в БД
                pdf_bytes = None
                if pdf_data:
                    try:
                        pdf_bytes = base64.b64decode(pdf_data)
                        print(f"PDF size: {len(pdf_bytes)} bytes")
                    except Exception as pdf_err:
                        print(f"PDF decode error: {pdf_err}")
                
                cur.execute("""
                    INSERT INTO calculator_orders 
                    (order_id, name, phone, email, telegram_username, messenger, 
                     material, length, width, partitions_length, floors, foundation, location,
                     pdf_sent_email, pdf_sent_telegram, pdf_data, guide_url)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    order_id, name, phone, email_client, telegram_username, messenger,
                    material, length, width, partitions_length, floors, foundation, location,
                    False, False, pdf_bytes, guide_url
                ))
                
                conn.commit()
                cur.close()
                conn.close()
                db_saved = True
                print(f"Order {order_id} saved to database")
            else:
                print("DATABASE_URL not found")
        except Exception as db_err:
            print(f"DB save failed: {type(db_err).__name__}: {str(db_err)}")
        
        # Отправка email
        email_sent = False
        email_error = None
        try:
            smtp_host = os.environ.get('SMTP_HOST')
            smtp_port = int(os.environ.get('SMTP_PORT', '465'))
            smtp_user = os.environ.get('SMTP_USER')
            smtp_password = os.environ.get('SMTP_PASSWORD')
            recipient_email = os.environ.get('RECIPIENT_EMAIL')
            
            html_content = f"""
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background-color: #FBB040; padding: 20px; text-align: center; }}
                    .header h1 {{ margin: 0; color: #000; }}
                    .content {{ background-color: #f9f9f9; padding: 20px; }}
                    .field {{ margin-bottom: 15px; }}
                    .field-label {{ font-weight: bold; color: #555; }}
                    .field-value {{ color: #000; margin-top: 5px; }}
                    .footer {{ text-align: center; padding: 20px; font-size: 12px; color: #999; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🏡 Новая заявка #{order_id}</h1>
                    </div>
                    <div class="content">
                        <h2>Контактные данные:</h2>
                        <div class="field">
                            <div class="field-label">Имя:</div>
                            <div class="field-value">{name}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Телефон:</div>
                            <div class="field-value">{phone}</div>
                        </div>
                        {f'<div class="field"><div class="field-label">Email:</div><div class="field-value">{email_client}</div></div>' if email_client else ''}
                        {f'<div class="field"><div class="field-label">Telegram:</div><div class="field-value">{telegram_username}</div></div>' if telegram_username else ''}
                        <div class="field">
                            <div class="field-label">Предпочтительный способ связи:</div>
                            <div class="field-value">{messenger}</div>
                        </div>
                        
                        <h2>Статус отправки сметы:</h2>
                        <div class="field">
                            <div class="field-label">Email заказчику:</div>
                            <div class="field-value" style="color: {'green' if messenger == 'email' and email_client else 'gray'};">
                                {'✅ Будет отправлено' if messenger == 'email' and email_client else '➖ Не требуется'}
                            </div>
                        </div>
                        <div class="field">
                            <div class="field-label">Telegram заказчику:</div>
                            <div class="field-value" style="color: {'green' if messenger == 'telegram' and telegram_username else 'gray'};">
                                {'✅ Отправится автоматически при переходе в бот' if messenger == 'telegram' and telegram_username else '➖ Не требуется'}
                            </div>
                        </div>
                        
                        <h2>Параметры бани:</h2>
                        <div class="field">
                            <div class="field-label">Фундамент:</div>
                            <div class="field-value">{foundation_names.get(foundation, foundation)}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Материал стен:</div>
                            <div class="field-value">{material_names.get(material, material)}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Размеры:</div>
                            <div class="field-value">{length} x {width} м, этажность: {'1,5 (мансарда)' if floors == '2' else floors}</div>
                        </div>
                        {f'<div class="field"><div class="field-label">Длина перегородок:</div><div class="field-value">{partitions_length} м</div></div>' if partitions_length else ''}
                        <div class="field">
                            <div class="field-label">Место строительства:</div>
                            <div class="field-value">{location_names.get(location, location)}</div>
                        </div>
                        {f'<div class="field"><div class="field-label">Комментарий:</div><div class="field-value">{comment}</div></div>' if comment else ''}
                        {f'<div class="field"><div class="field-label">Прикреплённые файлы:</div><div class="field-value">{len(attachments)} шт. (см. вложения)</div></div>' if attachments else ''}
                    </div>
                    <div class="footer">
                        <p>Заявка отправлена автоматически с сайта perm-par.ru</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Новая заявка #{order_id}: {name} - {material_names.get(material, material)} {length}x{width}м'
            msg['From'] = smtp_user
            msg['To'] = recipient_email
            
            html_part = MIMEText(html_content, 'html', 'utf-8')
            msg.attach(html_part)
            
            # Прикрепляем PDF если он передан
            if pdf_data:
                try:
                    pdf_bytes = base64.b64decode(pdf_data)
                    pdf_attachment = MIMEBase('application', 'pdf')
                    pdf_attachment.set_payload(pdf_bytes)
                    encoders.encode_base64(pdf_attachment)
                    filename = f'Смета_{name.replace(" ", "_")}.pdf'
                    pdf_attachment.add_header(
                        'Content-Disposition',
                        'attachment',
                        filename=('utf-8', '', filename)
                    )
                    pdf_attachment.add_header('Content-Type', 'application/pdf', name=filename)
                    msg.attach(pdf_attachment)
                    print("PDF attachment added successfully")
                except Exception as pdf_error:
                    print(f"Failed to attach PDF: {pdf_error}")
            
            # Прикрепляем PDF-гайд если передан URL
            if guide_url:
                try:
                    guide_bytes = download_pdf_from_url(guide_url)
                    if guide_bytes:
                        guide_attachment = MIMEBase('application', 'pdf')
                        guide_attachment.set_payload(guide_bytes)
                        encoders.encode_base64(guide_attachment)
                        guide_filename = 'Топ-10_ошибок_при_строительстве_бани.pdf'
                        guide_attachment.add_header(
                            'Content-Disposition',
                            'attachment',
                            filename=('utf-8', '', guide_filename)
                        )
                        guide_attachment.add_header('Content-Type', 'application/pdf', name=guide_filename)
                        msg.attach(guide_attachment)
                        print("PDF guide attached successfully")
                except Exception as guide_error:
                    print(f"Failed to attach PDF guide: {guide_error}")
            
            # Прикрепляем дополнительные файлы от клиента
            if attachments:
                for idx, file_data in enumerate(attachments):
                    try:
                        file_bytes = base64.b64decode(file_data.get('data', ''))
                        file_name = file_data.get('name', f'attachment_{idx}')
                        file_type = file_data.get('type', 'application/octet-stream')
                        
                        maintype, subtype = file_type.split('/', 1) if '/' in file_type else ('application', 'octet-stream')
                        file_attachment = MIMEBase(maintype, subtype)
                        file_attachment.set_payload(file_bytes)
                        encoders.encode_base64(file_attachment)
                        file_attachment.add_header(
                            'Content-Disposition',
                            'attachment',
                            filename=('utf-8', '', file_name)
                        )
                        msg.attach(file_attachment)
                        print(f"Attached file: {file_name}")
                    except Exception as attach_error:
                        print(f"Failed to attach file {file_name}: {attach_error}")
            
            print(f"Attempting to send email via {smtp_host}:{smtp_port}")
            print(f"SMTP_USER: {smtp_user}")
            print(f"SMTP_PASSWORD length: {len(smtp_password) if smtp_password else 0}")
            
            # Подготавливаем письмо заказчику ТОЛЬКО если выбран способ "email"
            customer_msg = None
            if email_client and messenger == 'email' and pdf_data:
                print(f"Preparing customer email for {email_client} (messenger={messenger})")
                customer_msg = MIMEMultipart('alternative')
                customer_msg['Subject'] = 'Ваша смета от компании "Пермский Пар"'
                customer_msg['From'] = smtp_user
                customer_msg['To'] = email_client
                
                customer_html = f"""
                <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background-color: #FBB040; padding: 20px; text-align: center; }}
                        .header h1 {{ margin: 0; color: #000; }}
                        .content {{ background-color: #f9f9f9; padding: 20px; }}
                        .footer {{ text-align: center; padding: 20px; font-size: 12px; color: #999; }}
                        .contacts {{ margin-top: 20px; padding: 15px; background: #fff; border-left: 4px solid #FBB040; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🏡 Пермский Пар</h1>
                        </div>
                        <div class="content">
                            <p>Здравствуйте, {name}!</p>
                            
                            <p>Благодарим за обращение в компанию "Пермский Пар".</p>
                            
                            <p>Ваша предварительная смета во вложении.</p>
                            
                            <p>Для уточнения деталей и окончательного расчета стоимости наш специалист свяжется с вами в ближайшее время.</p>
                            
                            <div class="contacts">
                                <strong>Наши контакты:</strong><br>
                                Телефон: +7 (342) 298-40-30<br>
                                Телефон: +7 (982) 490-09-00<br>
                                Email: perm-par@mail.ru<br>
                                Сайт: www.пермский-пар.рф
                            </div>
                            
                            <p style="margin-top: 20px;">С уважением,<br>Команда "Пермский Пар"</p>
                        </div>
                        <div class="footer">
                            <p>Письмо отправлено автоматически. Пожалуйста, не отвечайте на него.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                
                customer_html_part = MIMEText(customer_html, 'html', 'utf-8')
                customer_msg.attach(customer_html_part)
                
                # Прикрепляем PDF сметы
                try:
                    pdf_bytes = base64.b64decode(pdf_data)
                    pdf_attachment = MIMEBase('application', 'pdf')
                    pdf_attachment.set_payload(pdf_bytes)
                    encoders.encode_base64(pdf_attachment)
                    filename = f'Смета_{name.replace(" ", "_")}.pdf'
                    pdf_attachment.add_header(
                        'Content-Disposition',
                        'attachment',
                        filename=('utf-8', '', filename)
                    )
                    pdf_attachment.add_header('Content-Type', 'application/pdf', name=filename)
                    customer_msg.attach(pdf_attachment)
                    print("Customer email PDF estimate attached")
                except Exception as pdf_err:
                    print(f"Failed to prepare customer PDF: {pdf_err}")
                    customer_msg = None
                
                # Прикрепляем PDF-гайд клиенту
                if customer_msg and guide_url:
                    try:
                        guide_bytes = download_pdf_from_url(guide_url)
                        if guide_bytes:
                            guide_attachment = MIMEBase('application', 'pdf')
                            guide_attachment.set_payload(guide_bytes)
                            encoders.encode_base64(guide_attachment)
                            guide_filename = 'Топ-10_ошибок_при_строительстве_бани.pdf'
                            guide_attachment.add_header(
                                'Content-Disposition',
                                'attachment',
                                filename=('utf-8', '', guide_filename)
                            )
                            guide_attachment.add_header('Content-Type', 'application/pdf', name=guide_filename)
                            customer_msg.attach(guide_attachment)
                            print("Customer email PDF guide attached")
                    except Exception as guide_err:
                        print(f"Failed to attach guide to customer email: {guide_err}")
            else:
                print(f"Customer email NOT sent: messenger={messenger}, email_client={bool(email_client)}, pdf_data={'present' if pdf_data else 'missing'}")
            
            # Отправляем оба письма через одно соединение
            if smtp_port == 465:
                with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=30) as server:
                    server.set_debuglevel(1)
                    server.login(smtp_user, smtp_password)
                    
                    # Отправляем владельцу
                    server.send_message(msg)
                    print("Email to owner sent successfully via SSL")
                    email_sent = True
                    
                    # Отправляем заказчику
                    if customer_msg:
                        server.send_message(customer_msg)
                        print(f"Email to customer ({email_client}) sent successfully via SSL")
            else:
                with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_password)
                    
                    # Отправляем владельцу
                    server.send_message(msg)
                    print("Email to owner sent successfully via STARTTLS")
                    email_sent = True
                    
                    # Отправляем заказчику
                    if customer_msg:
                        server.send_message(customer_msg)
                        print(f"Email to customer ({email_client}) sent successfully via STARTTLS")
                    
        except Exception as e:
            email_error = str(e)
            print(f"Email sending failed: {type(e).__name__}: {str(e)}")
        
        # Обновляем статус отправки email в БД
        if db_saved and email_sent:
            try:
                dsn = os.environ.get('DATABASE_URL')
                if dsn:
                    conn = psycopg2.connect(dsn)
                    cur = conn.cursor()
                    cur.execute("UPDATE calculator_orders SET pdf_sent_email = TRUE WHERE order_id = %s", (order_id,))
                    conn.commit()
                    cur.close()
                    conn.close()
            except Exception as db_err:
                print(f"DB update (email) failed: {str(db_err)}")
        
        # Telegram отправка НЕ выполняется автоматически - только сохраняем данные
        telegram_sent = False
        telegram_error = "Смета будет отправлена вручную после подтверждения"
        

        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True, 
                'order_id': order_id,
                'email_sent': email_sent,
                'email_error': email_error,
                'telegram_sent': telegram_sent,
                'telegram_error': telegram_error
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e), 'type': type(e).__name__}),
            'isBase64Encoded': False
        }


def handle_telegram_webhook(update: Dict[str, Any]) -> Dict[str, Any]:
    """Обработка webhook от Telegram бота"""
    try:
        print(f"Telegram webhook: {json.dumps(update)}")
        
        if 'message' not in update:
            return {'statusCode': 200, 'body': json.dumps({'ok': True})}
        
        message = update['message']
        chat_id = message['chat']['id']
        username = message['chat'].get('username', '')
        first_name = message['chat'].get('first_name', '')
        text = message.get('text', '')
        
        print(f"Message from @{username} (chat_id: {chat_id}): {text}")
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if not bot_token:
            print("ERROR: TELEGRAM_BOT_TOKEN not configured")
            return {'statusCode': 200, 'body': json.dumps({'ok': True})}
        
        # Обрабатываем кнопки "Контакты" и "Сайт" отдельно
        if text == '📞 Контакты':
            contacts_text = """*📞 Наши контакты:*

+7 (342) 298-40-30
+7 (982) 490-09-00

📧 perm-par@mail.ru
🌐 www.пермский-пар.рф

Звоните или пишите — мы всегда рады помочь!"""
            send_telegram_message_with_keyboard(bot_token, chat_id, contacts_text)
            return {'statusCode': 200, 'body': json.dumps({'ok': True})}
        
        if text == '🌐 Сайт':
            site_text = """🌐 *Наш сайт:*

www.пермский-пар.рф

Здесь вы можете:
• Рассчитать смету
• Посмотреть наши работы
• Узнать больше о компании"""
            send_telegram_message_with_keyboard(bot_token, chat_id, site_text)
            return {'statusCode': 200, 'body': json.dumps({'ok': True})}
        
        # Обрабатываем команды /start, /заявка и кнопку "📄 Получить смету"
        if not (text.startswith('/start') or text.startswith('/заявка') or text == '📄 Получить смету'):
            return {'statusCode': 200, 'body': json.dumps({'ok': True})}
        
        dsn = os.environ.get('DATABASE_URL')
        if not dsn:
            send_telegram_message(bot_token, chat_id, 
                f"Здравствуйте, {first_name}! Спасибо за обращение. Наш специалист свяжется с вами в ближайшее время.")
            return {'statusCode': 200, 'body': json.dumps({'ok': True})}
        
        # Извлекаем order_id из команды /start (например: /start order_B6DEADBF)
        order_id_from_link = None
        if text.startswith('/start order_'):
            order_id_from_link = text.replace('/start order_', '').strip()
            print(f"Deep link detected: order_id={order_id_from_link}")
        
        # Подключаемся к БД и ищем заявки
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        orders = []
        
        # Если есть order_id из deep link - ищем конкретную заявку
        if order_id_from_link:
            cur.execute("""
                SELECT order_id, name, telegram_username, pdf_data, guide_url 
                FROM calculator_orders 
                WHERE order_id = %s 
                AND telegram_chat_id IS NULL
                AND pdf_sent_telegram = FALSE
            """, (order_id_from_link,))
            orders = cur.fetchall()
            print(f"Deep link search: found {len(orders)} orders for order_id={order_id_from_link}")
        
        # Если нет deep link и есть username - ищем по username
        elif username:
            cur.execute("""
                SELECT order_id, name, telegram_username, pdf_data, guide_url 
                FROM calculator_orders 
                WHERE telegram_username ILIKE %s 
                AND telegram_chat_id IS NULL
                AND pdf_sent_telegram = FALSE
                ORDER BY created_at DESC
            """, (f'%{username}%',))
            orders = cur.fetchall()
            print(f"Username search: found {len(orders)} orders for @{username}")
        
        if orders:
            # Отправляем приветственное сообщение БЕЗ кнопок (смета отправляется автоматически)
            welcome_text = f"""🏡 *Пермский Пар*

Здравствуйте, {first_name}!

✅ Ваш Telegram успешно подключен!

Мы нашли {len(orders)} заявку(-ок) на расчёт сметы. Отправляем вам сметы прямо сейчас..."""
            
            send_telegram_message(bot_token, chat_id, welcome_text)
            
            # Отправляем PDF каждой заявки
            for order_id, name, tg_username, pdf_data, order_guide_url in orders:
                print(f"Processing order {order_id}: name={name}, pdf_data={'present (' + str(len(pdf_data)) + ' bytes)' if pdf_data else 'MISSING'}, guide_url={order_guide_url}")
                if pdf_data:
                    # Отправляем PDF документ (смету)
                    success = send_telegram_document(bot_token, chat_id, pdf_data, name, order_id)
                    if success:
                        # Отправляем PDF-гайд если есть URL
                        if order_guide_url:
                            import time
                            time.sleep(1)  # Небольшая задержка между отправками
                            guide_success = send_telegram_guide(bot_token, chat_id, order_guide_url)
                            if guide_success:
                                print(f"Guide sent for order {order_id}")
                            else:
                                print(f"Failed to send guide for order {order_id}")
                        
                        # Обновляем статус отправки
                        cur.execute("""
                            UPDATE calculator_orders 
                            SET telegram_chat_id = %s, pdf_sent_telegram = TRUE
                            WHERE order_id = %s
                        """, (chat_id, order_id))
                        print(f"Order {order_id} sent via Telegram")
                    else:
                        print(f"Failed to send order {order_id} via Telegram")
                else:
                    # PDF не найден - отправляем уведомление
                    print(f"WARNING: Order {order_id} has NO PDF data!")
                    send_telegram_message(bot_token, chat_id, 
                        f"⚠️ Смета для заявки #{order_id} не найдена. Наш специалист свяжется с вами в ближайшее время.")
                    cur.execute("""
                        UPDATE calculator_orders 
                        SET telegram_chat_id = %s
                        WHERE order_id = %s
                    """, (chat_id, order_id))
            
            conn.commit()
            print(f"Processed {len(orders)} orders for chat_id {chat_id}")
        else:
            # Заявок нет - просто приветствие
            welcome_text = f"""🏡 *Пермский Пар*

Здравствуйте, {first_name}!

✅ Ваш Telegram успешно подключен к системе автоматической отправки смет.

Теперь, когда вы заполните калькулятор на нашем сайте и укажете ваш username *@{username}*, мы свяжемся с вами через этот чат!

*Наши контакты:*
📞 +7 (342) 298-40-30
📞 +7 (982) 490-09-00
📧 perm-par@mail.ru
🌐 www.пермский-пар.рф"""
            
            send_telegram_message_with_keyboard(bot_token, chat_id, welcome_text)
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Telegram webhook error: {type(e).__name__}: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
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
            if result.get('ok'):
                print(f"Message sent to chat_id {chat_id}")
                return True
            else:
                print(f"Telegram API error: {result}")
                return False
    except Exception as e:
        print(f"Send message error: {type(e).__name__}: {str(e)}")
        return False


def send_telegram_message_with_keyboard(bot_token: str, chat_id: int, text: str) -> bool:
    """Отправка текстового сообщения в Telegram с кастомной клавиатурой"""
    try:
        url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        data = json.dumps({
            'chat_id': chat_id,
            'text': text,
            'parse_mode': 'Markdown',
            'reply_markup': {
                'keyboard': [
                    [{'text': '📄 Получить смету'}],
                    [{'text': '📞 Контакты'}, {'text': '🌐 Сайт'}]
                ],
                'resize_keyboard': True,
                'one_time_keyboard': False
            }
        }).encode('utf-8')
        
        req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            if result.get('ok'):
                print(f"Message with keyboard sent to chat_id {chat_id}")
                return True
            else:
                print(f"Telegram API error: {result}")
                return False
    except Exception as e:
        print(f"Send message with keyboard error: {type(e).__name__}: {str(e)}")
        return False


def send_telegram_document(bot_token: str, chat_id: int, pdf_bytes: bytes, name: str, order_id: str) -> bool:
    """Отправка PDF документа в Telegram"""
    try:
        message_text = f"""📄 ⬆️ *Ваша смета в PDF-файле выше* ⬆️ 📄

🏡 *Пермский Пар*

Здравствуйте, {name}!

Ваша предварительная смета готова (заявка {order_id}).

Для уточнения деталей и окончательного расчета стоимости наш специалист свяжется с вами в ближайшее время.

*Наши контакты:*
📞 +7 (342) 298-40-30
📞 +7 (982) 490-09-00
📧 perm-par@mail.ru
🌐 www.пермский-пар.рф

С уважением,
Команда "Пермский Пар" """
        
        # Формируем multipart/form-data запрос
        boundary = '----WebKitFormBoundary' + os.urandom(16).hex()
        body = []
        
        # chat_id
        body.append(f'--{boundary}'.encode())
        body.append(b'Content-Disposition: form-data; name="chat_id"')
        body.append(b'')
        body.append(str(chat_id).encode())
        
        # caption
        body.append(f'--{boundary}'.encode())
        body.append(b'Content-Disposition: form-data; name="caption"')
        body.append(b'')
        body.append(message_text.encode('utf-8'))
        
        # parse_mode
        body.append(f'--{boundary}'.encode())
        body.append(b'Content-Disposition: form-data; name="parse_mode"')
        body.append(b'')
        body.append(b'Markdown')
        
        # document (PDF)
        filename = f'Смета_{name.replace(" ", "_")}.pdf'
        body.append(f'--{boundary}'.encode())
        body.append(f'Content-Disposition: form-data; name="document"; filename="{filename}"'.encode())
        body.append(b'Content-Type: application/pdf')
        body.append(b'')
        body.append(pdf_bytes)
        
        body.append(f'--{boundary}--'.encode())
        
        body_bytes = b'\r\n'.join(body)
        
        url = f'https://api.telegram.org/bot{bot_token}/sendDocument'
        req = urllib.request.Request(
            url,
            data=body_bytes,
            headers={
                'Content-Type': f'multipart/form-data; boundary={boundary}',
                'Content-Length': str(len(body_bytes))
            }
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode())
            if result.get('ok'):
                print(f"Document sent to chat_id {chat_id}")
                return True
            else:
                print(f"Telegram API error: {result}")
                return False
    except Exception as e:
        print(f"Send document error: {type(e).__name__}: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return False


def send_telegram_guide(bot_token: str, chat_id: int, guide_url: str) -> bool:
    """Отправка PDF-гайда в Telegram по URL"""
    try:
        # Скачиваем PDF
        guide_bytes = download_pdf_from_url(guide_url)
        if not guide_bytes:
            print("Failed to download guide PDF")
            return False
        
        message_text = """🎁 *Бонус: Топ-10 ошибок при строительстве русской бани*

Мы подготовили для вас полезный гайд, который поможет избежать типичных ошибок при строительстве бани.

С уважением,
Команда "Пермский Пар" 🏡"""
        
        # Формируем multipart/form-data запрос
        boundary = '----WebKitFormBoundary' + os.urandom(16).hex()
        body = []
        
        # chat_id
        body.append(f'--{boundary}'.encode())
        body.append(b'Content-Disposition: form-data; name="chat_id"')
        body.append(b'')
        body.append(str(chat_id).encode())
        
        # caption
        body.append(f'--{boundary}'.encode())
        body.append(b'Content-Disposition: form-data; name="caption"')
        body.append(b'')
        body.append(message_text.encode('utf-8'))
        
        # parse_mode
        body.append(f'--{boundary}'.encode())
        body.append(b'Content-Disposition: form-data; name="parse_mode"')
        body.append(b'')
        body.append(b'Markdown')
        
        # document (PDF)
        filename = 'Топ-10_ошибок_при_строительстве_бани.pdf'
        body.append(f'--{boundary}'.encode())
        body.append(f'Content-Disposition: form-data; name="document"; filename="{filename}"'.encode())
        body.append(b'Content-Type: application/pdf')
        body.append(b'')
        body.append(guide_bytes)
        
        body.append(f'--{boundary}--'.encode())
        
        body_bytes = b'\r\n'.join(body)
        
        url = f'https://api.telegram.org/bot{bot_token}/sendDocument'
        req = urllib.request.Request(
            url,
            data=body_bytes,
            headers={
                'Content-Type': f'multipart/form-data; boundary={boundary}',
                'Content-Length': str(len(body_bytes))
            }
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode())
            if result.get('ok'):
                print(f"Guide sent to chat_id {chat_id}")
                return True
            else:
                print(f"Telegram API error: {result}")
                return False
    except Exception as e:
        print(f"Send guide error: {type(e).__name__}: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return False