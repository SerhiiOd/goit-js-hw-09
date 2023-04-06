function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

refs.btnStart.addEventListener('click', startBtn);
refs.btnStop.addEventListener('click', stopBtn);

let randomColorIntervalId = null;
stopBtn.disabled = true;

function startBtn() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;

  const randomColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    randomColorIntervalId = randomColor;
  }, 1000);
}

function stopBtn() {
  clearInterval(randomColorIntervalId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}
