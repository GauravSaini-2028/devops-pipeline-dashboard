const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let pipelines = []; // temporary (we'll replace with DB later)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Get pipelines
app.get('/pipelines', (req, res) => {
  res.json(pipelines);
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const data = req.body;

  const pipeline = {
    id: Date.now(),
    project: data.project || "unknown",
    status: data.status || "running",
    stage: data.stage || "build",
    timestamp: new Date().toISOString()
  };

  pipelines.unshift(pipeline);

  console.log("📩 New Pipeline Event:", pipeline);

  res.status(200).json({ message: "Received" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
