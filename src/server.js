const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { getState, startTimer, stopTimer, resetTimer } = require('./gameState');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');

app.use(express.static(publicDir));

app.get('/', (_req, res) => {
  res.redirect('/controller');
});

app.get('/controller', (_req, res) => {
  res.sendFile(path.join(publicDir, 'controller', 'index.html'));
});

app.get('/display', (_req, res) => {
  res.sendFile(path.join(publicDir, 'display', 'index.html'));
});

io.on('connection', (socket) => {
  socket.emit('state:update', getState());

  socket.on('timer:start', () => {
    io.emit('state:update', startTimer());
  });

  socket.on('timer:stop', () => {
    io.emit('state:update', stopTimer());
  });

  socket.on('timer:reset', () => {
    io.emit('state:update', resetTimer());
  });

  socket.on('state:request', () => {
    socket.emit('state:update', getState());
  });
});

server.listen(PORT, () => {
  console.log(`Stopwatch MVP running at http://localhost:${PORT}`);
  console.log(`Controller: http://localhost:${PORT}/controller`);
  console.log(`Display:    http://localhost:${PORT}/display`);
});
