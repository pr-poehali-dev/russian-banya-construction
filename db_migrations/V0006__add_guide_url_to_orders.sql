-- Добавляем поле guide_url для хранения ссылки на PDF-гайд
ALTER TABLE calculator_orders 
ADD COLUMN IF NOT EXISTS guide_url TEXT;