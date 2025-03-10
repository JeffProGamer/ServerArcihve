const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 8080;  // This must match the NGROK forwarding port

// API to handle server commands
app.use(express.json());

app.post('/api/server/:command', (req, res) => {
  const command = req.params.command;

  if (command === 'start') {
    exec('java -Xmx2G -Xms1G -jar minecraft_server1.0.2.jar', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send('Error starting the server: ' + error.message);
      }
      res.send(stdout);
    });
  } else if (command === 'stop') {
    exec('stop', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send('Error stopping the server: ' + error.message);
      }
      res.send(stdout);
    });
  } else if (command === 'force-stop') {
    exec('taskkill /IM java.exe /F', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send('Error force-stopping the server: ' + error.message);
      }
      res.send(stdout);
    });
  } else {
    res.status(400).send('Invalid command!');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
