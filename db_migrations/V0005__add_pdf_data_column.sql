-- Добавляем колонку для хранения PDF-файлов
ALTER TABLE calculator_orders 
ADD COLUMN pdf_data BYTEA;