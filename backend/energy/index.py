import json
import os
import psycopg2
from typing import Dict, Any, Optional

def get_db_connection():
    """Создаёт подключение к базе данных"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not found in environment')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    API для управления энергией пользователей по проектам
    
    GET /energy?user_id=xxx&project_id=yyy - получить баланс энергии для проекта
    POST /energy/spend - списать энергию (body: {user_id, project_id, amount, description})
    POST /energy/refill - пополнить энергию (body: {user_id, project_id, amount})
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            user_id = params.get('user_id')
            project_id = params.get('project_id', 'default')
            
            if not user_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'user_id required'}),
                    'isBase64Encoded': False
                }
            
            # Получаем или создаём запись о энергии пользователя для проекта
            cur.execute(
                "SELECT energy FROM user_energy WHERE user_id = %s AND project_id = %s",
                (user_id, project_id)
            )
            result = cur.fetchone()
            
            if not result:
                # Создаём нового пользователя с начальной энергией 100 для этого проекта
                cur.execute(
                    "INSERT INTO user_energy (user_id, project_id, energy) VALUES (%s, %s, 100) RETURNING energy",
                    (user_id, project_id)
                )
                conn.commit()
                energy = 100
            else:
                energy = result[0]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'user_id': user_id, 'project_id': project_id, 'energy': energy}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action', 'spend')
            
            if action == 'spend':
                user_id = body.get('user_id')
                project_id = body.get('project_id', 'unknown')
                amount = body.get('amount', 10)
                description = body.get('description', 'Расчёт сметы')
                
                if not user_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'user_id required'}),
                        'isBase64Encoded': False
                    }
                
                # Проверяем баланс для конкретного проекта
                cur.execute("SELECT energy FROM user_energy WHERE user_id = %s AND project_id = %s", (user_id, project_id))
                result = cur.fetchone()
                
                if not result:
                    cur.execute(
                        "INSERT INTO user_energy (user_id, project_id, energy) VALUES (%s, %s, 100) RETURNING energy",
                        (user_id, project_id)
                    )
                    conn.commit()
                    current_energy = 100
                else:
                    current_energy = result[0]
                
                if current_energy < amount:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Недостаточно энергии', 'current': current_energy, 'required': amount}),
                        'isBase64Encoded': False
                    }
                
                # Списываем энергию для конкретного проекта
                cur.execute(
                    "UPDATE user_energy SET energy = energy - %s, updated_at = CURRENT_TIMESTAMP WHERE user_id = %s AND project_id = %s RETURNING energy",
                    (amount, user_id, project_id)
                )
                new_energy = cur.fetchone()[0]
                
                # Записываем транзакцию
                cur.execute(
                    "INSERT INTO energy_transactions (user_id, project_id, amount, type, description) VALUES (%s, %s, %s, 'spend', %s)",
                    (user_id, project_id, -amount, description)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'energy': new_energy, 'spent': amount}),
                    'isBase64Encoded': False
                }
            
            elif action == 'refill':
                user_id = body.get('user_id')
                project_id = body.get('project_id', 'default')
                amount = body.get('amount', 50)
                
                if not user_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'user_id required'}),
                        'isBase64Encoded': False
                    }
                
                # Пополняем энергию для конкретного проекта
                cur.execute(
                    "INSERT INTO user_energy (user_id, project_id, energy) VALUES (%s, %s, %s) ON CONFLICT (user_id, project_id) DO UPDATE SET energy = user_energy.energy + %s, updated_at = CURRENT_TIMESTAMP RETURNING energy",
                    (user_id, project_id, amount, amount)
                )
                new_energy = cur.fetchone()[0]
                
                # Записываем транзакцию
                cur.execute(
                    "INSERT INTO energy_transactions (user_id, project_id, amount, type, description) VALUES (%s, %s, %s, 'refill', 'Пополнение энергии')",
                    (user_id, project_id, amount)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'energy': new_energy, 'added': amount}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()