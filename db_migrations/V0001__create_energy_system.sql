-- Таблица для хранения энергии пользователей
CREATE TABLE user_energy (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    energy INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для истории транзакций энергии
CREATE TABLE energy_transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    project_id VARCHAR(255),
    amount INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'spend', 'refill', 'bonus'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_user_energy_user_id ON user_energy(user_id);
CREATE INDEX idx_energy_transactions_user_id ON energy_transactions(user_id);
CREATE INDEX idx_energy_transactions_project_id ON energy_transactions(project_id);