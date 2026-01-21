"""
Сохранение заявки с калькулятора бани в базу данных и отправка на email
"""
import json
import os
import psycopg2
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import base64
from typing import Dict, Any

# Версия: 2.3 - добавлена поддержка PDF вложений


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
    
    if method == 'GET':
        try:
            database_url = os.environ.get('DATABASE_URL')
            conn = psycopg2.connect(database_url)
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, name, phone, email, messenger, material, length, width, 
                       partitions_length, floors, foundation, location, created_at, status
                FROM orders 
                ORDER BY created_at DESC
            """)
            
            columns = [desc[0] for desc in cursor.description]
            orders = []
            for row in cursor.fetchall():
                orders.append(dict(zip(columns, row)))
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'orders': orders}, default=str),
                'isBase64Encoded': False
            }
        except Exception as e:
            print(f"ERROR getting orders: {type(e).__name__}: {str(e)}")
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
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
        partitions_length = body_data.get('partitionsLength', '')
        floors = body_data.get('floors', '')
        foundation = body_data.get('foundation', '')
        location = body_data.get('location', '')
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        email_client = body_data.get('email', '')
        messenger = body_data.get('messenger', '')
        comment = body_data.get('comment', '')
        pdf_data = body_data.get('pdfData', '')  # Base64 encoded PDF
        
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
        
        database_url = os.environ.get('DATABASE_URL')
        
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO orders 
            (name, phone, email, messenger, material, length, width, partitions_length, floors, foundation, location, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'new')
            RETURNING id
        """, (name, phone, email_client, messenger, material, length, width, partitions_length, floors, foundation, location))
        
        order_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        
        print(f"Order saved successfully with ID: {order_id}")
        
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
                        <div class="field">
                            <div class="field-label">Предпочтительный способ связи:</div>
                            <div class="field-value">{messenger}</div>
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
            
            print(f"Attempting to send email via {smtp_host}:{smtp_port}")
            print(f"SMTP_USER: {smtp_user}")
            print(f"SMTP_PASSWORD length: {len(smtp_password) if smtp_password else 0}")
            
            # Подготавливаем письмо заказчику, если нужно
            customer_msg = None
            if email_client and messenger == 'email' and pdf_data:
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
                
                # Прикрепляем PDF
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
                    print("Customer email prepared successfully")
                except Exception as pdf_err:
                    print(f"Failed to prepare customer PDF: {pdf_err}")
                    customer_msg = None
            
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
            # Не падаем, заявка уже сохранена в БД
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True, 
                'order_id': order_id,
                'email_sent': email_sent,
                'email_error': email_error
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