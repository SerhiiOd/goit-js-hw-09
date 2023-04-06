import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
};

refs.btn.disabled = true;
let diferense = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const currentTime = options.defaultDate.getTime();
    const selectedTime = selectedDates[0].getTime();

    if (selectedTime < currentTime) {
      refs.btn.disabled = true;
      Notify.init({
        position: center - top,
      });
      Notify.failure('Please choose a date in the future');
    } else {
      diferense = selectedTime - currentTime;
      refs.btn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

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
}

const timer = {
  fieldDays: document.querySelector('[data-days]'),
  fieldHours: document.querySelector('[data-hours]'),
  fieldMinutes: document.querySelector('[data-minutes]'),
  fieldSeconds: document.querySelector('[data-seconds]'),
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

refs.btn.addEventListener('click', startBtn);

let goTimerId = null;

function startBtn() {
  refs.input.disabled = true;
  refs.btn.disabled = true;
  const date = convertMs(diferense);

  const goTimer = setInterval(() => {
    goTimerId = goTimer;
    date.seconds -= 1;

    if (date.seconds === 0 && date.minutes != 0) {
      date.seconds = 59;
      date.minutes -= 1;
    }
    if (date.minutes === 0 && date.hours != 0) {
      date.minutes = 59;
      date.hours -= 1;
    }
    if (date.hours === 0 && date.days != 0) {
      date.hours = 23;
      date.days -= 1;
    }
    if (date.days === 0 && date.hours === 0 && date.minutes === 0 && date.seconds === 0) {
      clearInterval(goTimerId);
    }
    timer.fieldDays.textContent = addLeadingZero(date.days);
    timer.fieldHours.textContent = addLeadingZero(date.hours);
    timer.fieldMinutes.textContent = addLeadingZero(date.minutes);
    timer.fieldSeconds.textContent = addLeadingZero(date.seconds);
  }, 1000);
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
