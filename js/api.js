import {showErrorPopup, showSuccessPopup, showAlert} from './popup.js';

const URL_TO_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_TO_SEND = 'https://23.javascript.pages.academy/keksobooking';

const loadData = (cb) => {
  fetch(URL_TO_GET)
    .then((response) => response.json())
    .then(cb)
    .catch(() => showAlert('Загрузка данных на карте сломана, но вы можете отправить форму! Спасибо за понимание!'));
};

const uploadData = (body) => {
  fetch(URL_TO_SEND,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        showSuccessPopup();
      } else {
        throw new Error();
      }
    })
    .catch(showErrorPopup);
};

export {loadData, uploadData};
