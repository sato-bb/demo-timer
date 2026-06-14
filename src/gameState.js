const initialState = {
  status: 'idle', // idle | running | stopped
  startedAt: null,
  stoppedAt: null,
  elapsedMs: null,
  displaySeconds: null,
  updatedAt: Date.now()
};

let state = { ...initialState };

function getState() {
  return { ...state };
}

function startTimer() {
  const now = Date.now();

  state = {
    status: 'running',
    startedAt: now,
    stoppedAt: null,
    elapsedMs: null,
    displaySeconds: null,
    updatedAt: now
  };

  return getState();
}

function stopTimer() {
  const now = Date.now();

  if (state.status !== 'running' || !state.startedAt) {
    return getState();
  }

  const elapsedMs = now - state.startedAt;

  state = {
    ...state,
    status: 'stopped',
    stoppedAt: now,
    elapsedMs,
    displaySeconds: Number((elapsedMs / 1000).toFixed(2)),
    updatedAt: now
  };

  return getState();
}

function resetTimer() {
  state = {
    ...initialState,
    updatedAt: Date.now()
  };

  return getState();
}

module.exports = {
  getState,
  startTimer,
  stopTimer,
  resetTimer
};
