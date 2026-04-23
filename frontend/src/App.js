import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://13.60.199.188:5000');

function App() {
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    fetchData();

    socket.on('pipeline_update', (data) => {
      setPipelines(prev => [data, ...prev]);
    });

  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://13.60.199.188:5000/pipelines');
    setPipelines(res.data);
  };

  return (
    <div>
      <h1>🚀 CI/CD Dashboard</h1>

      {pipelines.map((p, index) => (
        <div key={index}>
          <h3>{p.project}</h3>
          <p>Status: {p.status}</p>
          <p>Stage: {p.stage}</p>
          <p>Time: {p.timestamp}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
