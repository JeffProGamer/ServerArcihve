
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/server/:command', (req, res) => {
  const cmd = req.params.command;
  if (cmd === 'start') {
    exec('start /B java -jar beta_server.jar', (err) => {
      if (err) return res.send('❌ Failed to start.');
      res.send('✅ Server started!');
    });
  } else if (cmd === 'stop' || cmd === 'force-stop') {
    exec('taskkill /IM java.exe /F', (err) => {
      if (err) return res.send('❌ Failed to stop.');
      res.send('✅ Server stopped!');
    });
  } else {
    res.send('❌ Unknown command.');
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
