const socket = io();

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const statusText = document.getElementById('statusText');

function getStatusLabel(status) {
  if (status === 'running') return '計測中';
  if (status === 'stopped') return '停止済み';
  return '待機中';
}

function render(state) {
  statusText.textContent = getStatusLabel(state.status);
  startButton.disabled = state.status === 'running';
  stopButton.disabled = state.status !== 'running';
}

startButton.addEventListener('click', () => {
  socket.emit('timer:start');
});

stopButton.addEventListener('click', () => {
  socket.emit('timer:stop');
});

resetButton.addEventListener('click', () => {
  socket.emit('timer:reset');
});

socket.on('connect', () => {
  socket.emit('state:request');
});

socket.on('state:update', render);
