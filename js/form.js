import {loadServerData} from './api.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const ACCEPT_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
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
const resetButton = adForm.querySelector('.ad-form__reset');
const fieldsetBlocks = adForm.querySelectorAll('fieldset');
const offerTitle = adForm.querySelector('#title');
const offerPrice = adForm.querySelector('#price');
const offerType = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const formAddress = adForm.querySelector('#address');
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const headerPhotoContainer = document.querySelector('.ad-form-header__preview');
const avatarPreview = headerPhotoContainer.querySelector('img');
const apartmentImgChooser = document.querySelector('.ad-form__upload input[type=file]');
const apartmentImgContainer = document.querySelector('.ad-form__photo');
const addressDefault = `${DEFAULT_LOCATION.lat.toFixed(5)}, ${DEFAULT_LOCATION.lng.toFixed(5)}`;
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
    evt.target.setCustomValidity(`?????? ${MIN_TITLE_LENGTH - valueLength} ????????.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    evt.target.setCustomValidity(`?????????????? ???????????? ${valueLength - MAX_TITLE_LENGTH} ????????.`);
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
    evt.target.setCustomValidity('???????? ???? ??????????????');
  } else if (evt.target.value < MIN_PRICE[type]) {
    evt.target.setCustomValidity(`???????? ???????????? ???????? ???????? ${MIN_PRICE[type]}`);
  } else if (evt.target.value > MAX_PRICE) {
    evt.target.setCustomValidity(`???????? ???????????? ???????? ???????? ${MAX_PRICE}`);
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
    capacity.setCustomValidity('???????????????????? ???????????? ???? ???????????? ?????????????????? ???????????????????? ????????????');
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
formAddress.placeholder = addressDefault;
formAddress.value = addressDefault;
const resetAddress = () => formAddress.value = addressDefault;
const resetAvatar = () => avatarPreview.src = DEFAULT_AVATAR;
const resetApartmentImg = () => apartmentImgContainer.innerHTML = '';
const resetForm = () => {
  adForm.reset();
  resetAvatar();
  resetApartmentImg();
  resetAddress();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (checkCapacity()) {
    const formData = new FormData(evt.target);
    loadServerData(formData);
  }
});

const loadPhoto = (fileChooser, previewWrapper) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = ACCEPT_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewWrapper.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

avatarChooser.addEventListener('change', () => {
  loadPhoto(avatarChooser, avatarPreview);
});

apartmentImgChooser.addEventListener('change', () => {
  const photoElement = document.createElement('img');
  photoElement.style.width = '100px';
  photoElement.style.height = '100px';
  photoElement.style.objectFit = 'cover';
  apartmentImgContainer.appendChild(photoElement);

  loadPhoto(apartmentImgChooser, photoElement);
});

export {disableAdForm, enableAdForm, resetForm, resetButton};
