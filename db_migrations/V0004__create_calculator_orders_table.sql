-- Создание таблицы для заявок калькулятора
CREATE TABLE IF NOT EXISTS calculator_orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    telegram_username VARCHAR(255),
    telegram_chat_id BIGINT,
    messenger VARCHAR(50),
    material VARCHAR(100),
    length DECIMAL(10, 2),
    width DECIMAL(10, 2),
    partitions_length DECIMAL(10, 2),
    floors VARCHAR(10),
    foundation VARCHAR(100),
    location VARCHAR(100),
    pdf_sent_email BOOLEAN DEFAULT FALSE,
    pdf_sent_telegram BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_telegram_username ON calculator_orders(telegram_username);
CREATE INDEX idx_telegram_chat_id ON calculator_orders(telegram_chat_id);
CREATE INDEX idx_created_at ON calculator_orders(created_at DESC);