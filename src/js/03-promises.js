import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = Number(formRef.elements.delay.value);
  const step = Number(formRef.elements.step.value);
  const amount = Number(formRef.elements.amount.value);

  for (let position = 1; position <= amount; position++) {
    if (position != 1) {
      delay += step;
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}
