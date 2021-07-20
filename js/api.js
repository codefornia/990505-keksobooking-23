import {showAlert} from './utils.js';

const URL_TO_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_TO_SEND = 'https://23.javascript.pages.academy/keksobooking';

const loadData = (cb) => {
  fetch(URL_TO_GET)
    .then((response) => response.json())
    .then(cb)
    .catch(() => showAlert('Что-то пошло не так.'));
};

const uploadData = (body) => {
  fetch(URL_TO_SEND,
    {
      method: 'POST',
      body: body,
    })
    .then(() => {
      showAlert('Данные успешно загружены на сервер.');
    })
    .catch(() => showAlert('Что-то пошло не так.'));
};

export {loadData, uploadData};
