-- Удаляем старое уникальное ограничение на user_id
ALTER TABLE user_energy DROP CONSTRAINT IF EXISTS user_energy_user_id_key;

-- Создаём уникальный индекс на комбинацию user_id + project_id (если не существует)
CREATE UNIQUE INDEX IF NOT EXISTS user_energy_user_project_idx ON user_energy(user_id, project_id);