import {uploadData} from './api.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const DEFAULT_LOCATION = {
  lat: 35.6700,
  lng: 139.7500,
};
const NUMBER_OF_GUESTS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const adForm = document.querySelector('.ad-form');
const fieldsetBlocks = adForm.querySelectorAll('fieldset');
const offerTitle = adForm.querySelector('#title');
const offerPrice = adForm.querySelector('#price');
const offerType = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const formAddress = adForm.querySelector('#address');

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsetBlocks.forEach((fieldsetBlock) => {
    fieldsetBlock.setAttribute('disabled', 'disabled');
  });
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsetBlocks.forEach((fieldsetBlock) => {
    fieldsetBlock.removeAttribute('disabled');
  });
};

offerTitle.addEventListener('input', (evt) => {
  const valueLength = evt.target.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    evt.target.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    evt.target.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
});

offerType.addEventListener('input', () => {
  offerPrice.setAttribute('min', MIN_PRICE[offerType.value]);
  offerPrice.placeholder = MIN_PRICE[offerType.value];
});

offerPrice.addEventListener('input', (evt) => {
  const type = offerType.value;
  if (!offerPrice.value) {
    evt.target.setCustomValidity('Цена не указана');
  } else if (evt.target.value < MIN_PRICE[type]) {
    evt.target.setCustomValidity(`Цена должна быть выше ${MIN_PRICE[type]}`);
  } else if (evt.target.value > MAX_PRICE) {
    evt.target.setCustomValidity(`Цена должна быть ниже ${MAX_PRICE}`);
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
});

const checkCapacity = () => {
  let isValid;

  if ((NUMBER_OF_GUESTS[roomNumber.value]).includes(Number(capacity.value))) {
    capacity.setCustomValidity('');
    isValid = true;
  } else {
    capacity.setCustomValidity('Количество гостей не должно превышать количество комнат');
    isValid = false;
  }
  capacity.reportValidity();
  return isValid;
};

capacity.addEventListener('input', (evt) => {
  checkCapacity();
  evt.target.reportValidity();
});

roomNumber.addEventListener('input', (evt) => {
  checkCapacity();
  evt.target.reportValidity();
});

timeIn.addEventListener('input', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('input', (evt) => {
  timeIn.value = evt.target.value;
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (checkCapacity()) {
    evt.target.submit();
  }
});

formAddress.placeholder = `${DEFAULT_LOCATION.lat.toFixed(5)}, ${DEFAULT_LOCATION.lng.toFixed(5)}`;

//отправка

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  uploadData(formData);
});

export {disableAdForm, enableAdForm};
