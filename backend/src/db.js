const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'devops_user',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'devops_dashboard',
  port: 5432,
});

module.exports = pool;
