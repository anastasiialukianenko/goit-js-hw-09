const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyEl: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

let timerId = null;

refs.startBtn.addEventListener("click", () => {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    timerId = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});


refs.stopBtn.addEventListener("click", () => {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  
    clearInterval(timerId);
});

