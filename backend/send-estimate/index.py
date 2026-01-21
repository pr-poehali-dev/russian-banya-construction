import json
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import base64

def handler(event: dict, context) -> dict:
    '''Отправка сметы на email заказчику и владельцу'''
    
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
            'body': json.dumps({'error': 'Метод не разрешен'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        customer_name = body.get('name', '')
        customer_phone = body.get('phone', '')
        customer_email = body.get('email', '')
        send_method = body.get('sendMethod', 'email')
        pdf_base64 = body.get('pdfData', '')
        
        if not customer_name or not customer_phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Не указаны имя или телефон'}),
                'isBase64Encoded': False
            }
        
        if not pdf_base64:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Не указан PDF файл'}),
                'isBase64Encoded': False
            }
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        owner_email = os.environ.get('RECIPIENT_EMAIL')
        
        pdf_bytes = base64.b64decode(pdf_base64)
        
        def send_email(to_email: str, subject: str, body_text: str) -> bool:
            msg = MIMEMultipart()
            msg['From'] = smtp_user
            msg['To'] = to_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body_text, 'plain', 'utf-8'))
            
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(pdf_bytes)
            encoders.encode_base64(part)
            part.add_header(
                'Content-Disposition',
                f'attachment; filename=Смета_{customer_name}.pdf'
            )
            msg.attach(part)
            
            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
            
            return True
        
        results = {}
        
        send_email(
            owner_email,
            f'Новая заявка на смету от {customer_name}',
            f'''Получена новая заявка на расчет стоимости бани.

Контактные данные заказчика:
Имя: {customer_name}
Телефон: {customer_phone}
Email: {customer_email if customer_email else 'Не указан'}
Способ связи: {send_method}

Смета во вложении.

---
Пермский Пар
'''
        )
        results['owner'] = 'Отправлено'
        
        if send_method == 'email' and customer_email:
            send_email(
                customer_email,
                'Ваша смета от компании "Пермский Пар"',
                f'''Здравствуйте, {customer_name}!

Благодарим за обращение в компанию "Пермский Пар".

Ваша предварительная смета во вложении.

Для уточнения деталей и окончательного расчета стоимости наш специалист свяжется с вами в ближайшее время.

Контакты:
Телефон: +7 (342) 298-40-30
Телефон: +7 (982) 490-09-00
Email: perm-par@mail.ru
Сайт: www.пермский-пар.рф

С уважением,
Команда "Пермский Пар"
'''
            )
            results['customer'] = 'Отправлено на email'
        elif send_method == 'telegram':
            results['customer'] = 'Telegram отправка будет добавлена позже'
        elif send_method == 'max':
            results['customer'] = 'Макс отправка будет добавлена позже'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Смета успешно отправлена',
                'results': results
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'}),
            'isBase64Encoded': False
        }
