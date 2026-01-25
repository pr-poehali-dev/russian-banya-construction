import json
import os
import smtplib
import base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

def handler(event: dict, context) -> dict:
    '''API для отправки заявок на бронирование выезда для ремонта бани'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        name = body.get('name', '')
        phone = body.get('phone', '')
        contact = body.get('contact', '')
        address = body.get('address', '')
        date = body.get('date', '')
        time = body.get('time', '')
        comments = body.get('comments', '')
        attachments = body.get('attachments', [])
        
        if not all([name, phone, address, date, time]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        email_user = os.environ.get('SMTP_USER')
        email_password = os.environ.get('SMTP_PASSWORD')
        email_to = os.environ.get('RECIPIENT_EMAIL', 'perm-par@mail.ru')
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
        smtp_port = int(os.environ.get('SMTP_PORT', '465'))
        
        if not email_user or not email_password:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Email not configured'}),
                'isBase64Encoded': False
            }
        
        msg = MIMEMultipart()
        msg['From'] = email_user
        msg['To'] = email_to
        msg['Subject'] = f'Новая заявка на выезд для ремонта от {name}'
        
        email_body = f'''
        <html>
        <body>
        <h2>Новая заявка на бронирование выезда для ремонта бани</h2>
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Телефон:</strong> {phone}</p>
        <p><strong>Контакт (Email/Telegram/WhatsApp):</strong> {contact if contact else 'Не указан'}</p>
        <p><strong>Адрес объекта:</strong> {address}</p>
        <p><strong>Дата выезда:</strong> {date}</p>
        <p><strong>Время выезда:</strong> {time}</p>
        <p><strong>Комментарии:</strong> {comments if comments else 'Нет комментариев'}</p>
        </body>
        </html>
        '''
        
        msg.attach(MIMEText(email_body, 'html'))
        
        # Прикрепляем файлы, если они есть
        for attachment in attachments:
            file_name = attachment.get('name', 'file')
            file_data = attachment.get('data', '')
            file_type = attachment.get('type', 'application/octet-stream')
            
            if file_data:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(base64.b64decode(file_data))
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', f'attachment; filename={file_name}')
                msg.attach(part)
        
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(email_user, email_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Booking sent successfully'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }