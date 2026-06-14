const socket = io();

const timerValue = document.getElementById('timerValue');
const displayMessage = document.getElementById('displayMessage');

let randomAnimationId = null;
let latestState = null;

function formatSeconds(value) {
  return Number(value).toFixed(2).padStart(5, '0');
}

function getRandomDisplayValue() {
  // 実測値を予想しにくくするため、0.00-9.99を高速ランダム表示する。
  return formatSeconds(Math.random() * 9.99);
}

function startRandomAnimation() {
  stopRandomAnimation();

  const tick = () => {
    timerValue.textContent = getRandomDisplayValue();
    randomAnimationId = requestAnimationFrame(tick);
  };

  tick();
}

function stopRandomAnimation() {
  if (randomAnimationId) {
    cancelAnimationFrame(randomAnimationId);
    randomAnimationId = null;
  }
}

function render(state) {
  latestState = state;

  if (state.status === 'running') {
    timerValue.classList.add('is-running');
    displayMessage.textContent = '計測中...';
    startRandomAnimation();
    return;
  }

  stopRandomAnimation();
  timerValue.classList.remove('is-running');

  if (state.status === 'stopped' && state.displaySeconds !== null) {
    timerValue.textContent = formatSeconds(state.displaySeconds);
    displayMessage.textContent = '記録';
    return;
  }

  timerValue.textContent = '--.--';
  displayMessage.textContent = 'STARTを押して挑戦開始';
}

socket.on('connect', () => {
  socket.emit('state:request');
});

socket.on('state:update', render);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && latestState?.status === 'running') {
    startRandomAnimation();
  }
});
