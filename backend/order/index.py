"""
Отправка заявки с калькулятора бани на email
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        material = body_data.get('material', '')
        length = body_data.get('length', '')
        width = body_data.get('width', '')
        floors = body_data.get('floors', '')
        foundation = body_data.get('foundation', '')
        location = body_data.get('location', '')
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        email_client = body_data.get('email', '')
        messenger = body_data.get('messenger', '')
        
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
        
        messenger_names = {
            'whatsapp': 'WhatsApp',
            'telegram': 'Telegram',
            'email': 'Email'
        }
        
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
                    <h1>🏡 Новая заявка с сайта</h1>
                </div>
                <div class="content">
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
                        <div class="field-value">{length} x {width} м, этажность: {floors}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">Место строительства:</div>
                        <div class="field-value">{location_names.get(location, location)}</div>
                    </div>
                    
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
                    <div class="field">
                        <div class="field-label">Предпочтительный способ связи:</div>
                        <div class="field-value">{messenger_names.get(messenger, messenger)}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>Заявка отправлена автоматически с сайта perm-par.ru</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        recipient_email = os.environ.get('RECIPIENT_EMAIL')
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка: {name} - {material_names.get(material, material)} {length}x{width}м'
        msg['From'] = smtp_user
        msg['To'] = recipient_email
        
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
