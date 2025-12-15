"""
Сохранение заявки с калькулятора бани в базу данных
"""
import json
import os
import psycopg2
from typing import Dict, Any


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
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'order_id': order_id}),
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