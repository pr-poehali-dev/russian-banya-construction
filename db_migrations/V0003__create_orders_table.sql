CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    messenger VARCHAR(50) NOT NULL,
    material VARCHAR(100),
    length VARCHAR(20),
    width VARCHAR(20),
    partitions_length VARCHAR(20),
    floors VARCHAR(10),
    foundation VARCHAR(100),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new'
);