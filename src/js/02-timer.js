import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

// таймер id, щоб потім його видалити при 00:00:00
let timerId = null;
//кнопка не активна до вибору дати
startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        initTimerInterval(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

// повертає обєкт з днем, годинами, секундами та хвилинами, сюди передаємо різницю дат
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

//додає нуль перед числом
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};






function initTimerInterval(date) {
    const selectedDate = date;
    const currentDate = new Date();

    // перевіряємо дату на майбутнє
    if (selectedDate < currentDate) {
        window.alert('Please choose a date in the future');
        return;
    };

// майбутнє - вмикаємо кнопку та додаємо слухач кліку
    startBtn.disabled = false;
    startBtn.addEventListener("click", () => {
        startBtn.disabled = true;

        timerId = setInterval(() => {
        const timeDifference = selectedDate.getTime() - Date.now();
        const remainingTime = convertMs(timeDifference);

           if (remainingTime <= 0) {
        clearInterval(timerId);
        resetTimerDisplay();
      } else {
             updateTimerDisplay(remainingTime);
             timeDifference -= 1000;
      }
    }, 1000);
    });
}

function updateTimerDisplay(time) {
  daysDisplay.textContent = addLeadingZero(time.days);
  hoursDisplay.textContent = addLeadingZero(time.hours);
  minutesDisplay.textContent = addLeadingZero(time.minutes);
  secondsDisplay.textContent = addLeadingZero(time.seconds);
}

function resetTimerDisplay() {
  daysDisplay.textContent = '00';
  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
}

