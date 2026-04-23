const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Get pipelines
app.get('/pipelines', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM pipelines ORDER BY timestamp DESC'
  );
  res.json(result.rows);
});

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  const { project, status, stage, build_number } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pipelines (project, status, stage, build_number)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [project, status, stage, build_number]
    );

    console.log("📩 Stored in DB:", result.rows[0]);

    io.emit('pipeline_update', result.rows[0]);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Error");
  }
});

const PORT = 5000;
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('⚡ Client connected');
});

server.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
