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
const NUMBER_OF_GUESTS = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};
const adForm = document.querySelector('.ad-form');
const fieldsetBlocks = adForm.querySelectorAll('fieldset');
const offerTitle = adForm.querySelector('#title');
const offerType = adForm.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

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

offerTitle.addEventListener('input', () => {
  const valueLength = offerTitle.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    offerTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    offerTitle.setCustomValidity('');
  }
  offerTitle.reportValidity();
});
const offerPrice = adForm.querySelector('#price');

offerPrice.addEventListener('input', () => {
  const type = offerType.value;
  offerPrice.setAttribute('min', MIN_PRICE[type]);
  if (!offerPrice.value) {
    offerPrice.setCustomValidity('Цена не указана');
  } else if (offerPrice.value < MIN_PRICE[type]) {
    offerPrice.setCustomValidity(`Цена должна быть выше ${MIN_PRICE[type]}`);
  } else if (offerPrice.value > MAX_PRICE) {
    offerPrice.setCustomValidity(`Цена должна быть ниже ${MAX_PRICE}`);
  } else {
    offerPrice.setCustomValidity('');
  }
  offerPrice.reportValidity();
});

capacity.addEventListener('input', () => {
  if ((NUMBER_OF_GUESTS[roomNumber.value]).includes(capacity.value)){
    capacity.setCustomValidity('Сойдёт');
  }
  capacity.reportValidity();
});

export {disableAdForm, enableAdForm};
