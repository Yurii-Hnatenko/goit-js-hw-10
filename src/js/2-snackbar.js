function handlePromise(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stateInput = document.querySelector('input[name="state"]:checked');
  const delay = parseInt(delayInput.value);
  const state = stateInput.value;
  const promise = new Promise((resolve, reject) => {
    if (state === "fulfilled") {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === "rejected") {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
  promise.then(
    (delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    },
    (delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    }
  );
  delayInput.value = '';
}
document.querySelector('.form').addEventListener('submit', handlePromise);