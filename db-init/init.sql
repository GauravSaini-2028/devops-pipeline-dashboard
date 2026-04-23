CREATE TABLE IF NOT EXISTS pipelines (
    id SERIAL PRIMARY KEY,
    project TEXT,
    status TEXT,
    stage TEXT,
    build_number TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
