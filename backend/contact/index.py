import json
import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправка заявок с анкеты заказчика на email
    Принимает данные формы и отправляет их на указанную почту
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', 465))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    if not all([smtp_user, smtp_password]):
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'SMTP настройки не сконфигурированы'}),
            'isBase64Encoded': False
        }
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"Новая заявка от {body_data.get('name', 'Клиента')}"
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    
    contact_method = body_data.get('contactMethod', 'email')
    contact_method_text = {
        'email': 'Email',
        'whatsapp': 'WhatsApp',
        'telegram': 'Telegram'
    }.get(contact_method, 'Email')
    
    contact_phone = body_data.get('contactPhone', body_data.get('phone', ''))
    
    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Новая заявка с сайта</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Имя:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{body_data.get('name', '')}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Телефон:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{body_data.get('phone', '')}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Куда отправить расчет:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{contact_method_text}</td>
          </tr>
          {f'''<tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Телефон для {contact_method_text}:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{contact_phone}</td>
          </tr>''' if contact_method != 'email' else f'''<tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{body_data.get('email', '')}</td>
          </tr>'''}
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Материал стен:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{body_data.get('banjaType', '')}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Размер:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{body_data.get('size', '')}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Местоположение:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{body_data.get('location', '')}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Доп. информация:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{body_data.get('additionalInfo', '')}</td>
          </tr>
        </table>
      </body>
    </html>
    """
    
    html_part = MIMEText(html_content, 'html')
    msg.attach(html_part)
    
    context = ssl.create_default_context()
    server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10, context=context)
    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}),
        'isBase64Encoded': False
    }