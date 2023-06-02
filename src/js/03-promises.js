import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
}

const refs = {
  button: document.querySelector('button'),
  delayEl: document.querySelector('input[name="delay"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  stepEl: document.querySelector('input[name="step"]'),
};

refs.button.addEventListener('click', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = parseInt(refs.delayEl.value);
  const step = parseInt(refs.stepEl.value);
  const amount = parseInt(refs.amountEl.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}


