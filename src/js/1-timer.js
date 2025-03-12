import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//DOM elements
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let cutdownTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() <= Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

function addZero(value) {
  return String(value).padStart(2, '0');
}

//function to convert miliseconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//function to start timer
function startTimer() {
  if (!userSelectedDate) {
    return;
  }

  refs.input.disabled = true;
  refs.startBtn.disabled = true;

  cutdownTimer = setInterval(() => {
    const now = Date.now();
    const time = userSelectedDate - now;

    if(time <= 0){
        clearInterval(cutdownTimer);
        refs.days.textContent = '00';
        refs.hours.textContent = '00';
        refs.minutes.textContent = '00';
        refs.seconds.textContent = '00';
        refs.input.disabled = false;
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(time);
    refs.days.textContent = addZero(days);
    refs.hours.textContent = addZero(hours);
    refs.minutes.textContent = addZero(minutes);
    refs.seconds.textContent = addZero(seconds);

  }, 1000);

}

refs.startBtn.addEventListener('click', startTimer);
