const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const resetLapsBtn = document.querySelector('.reset-laps');
const lapsContainer = document.querySelector('.laps');

let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  lapBtn.disabled = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  elapsedTime = 0;
  laps = [];
  lapsContainer.innerHTML = '';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true;
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(millisecondsFormatted)}`;
}

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function lap() {
  const lapTime = elapsedTime;
  laps.push(lapTime);
  const lapDisplay = document.createElement('div');
  lapDisplay.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
  lapsContainer.appendChild(lapDisplay);
}

function resetLaps() {
  laps = [];
  lapsContainer.innerHTML = '';
}
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lap);
resetLapsBtn.addEventListener('click', resetLaps);
