import {getSimilarArray, SIMILAR_APARTMENTS_COUNT} from './data.js';

const cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('.map__canvas');
cardPopupTemplate.classList.remove('hidden');
const TYPE_NAME = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};
const dataCard = getSimilarArray(SIMILAR_APARTMENTS_COUNT);
const dataCardsElements = [];
dataCard.forEach(({author, offer}) => {
  const dataElement = cardPopupTemplate.cloneNode(true);
  const popupTitle = dataElement.querySelector('.popup__title');
  const popupTextAddress = dataElement.querySelector('.popup__text--address');
  const popupTextPrice = dataElement.querySelector('.popup__text--price');
  const popupType = dataElement.querySelector('.popup__type');
  const popupTextCapacity = dataElement.querySelector('.popup__text--capacity');
  const popupTextTime = dataElement.querySelector('.popup__text--time');
  const popupFeatures = dataElement.querySelector('.popup__features');
  const popupDescription = dataElement.querySelector('.popup__description');
  const popupAvatar = dataElement.querySelector('.popup__avatar');
  const popupPhotos = dataElement.querySelector('.popup__photos');

  popupTitle.textContent = offer.title;
  popupTextAddress.textContent = offer.address;
  popupTextPrice.textContent = `${offer.price} ₽/ночь`;
  popupType.textContent = TYPE_NAME[offer.type];
  popupTextCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupTextTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupFeatures.textContent = offer.features;
  popupDescription.textContent = offer.description;
  offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.classList.add('popup__photo');
    photoElement.alt = 'Фотография жилья';
    popupPhotos.appendChild(photoElement);
  });
  popupAvatar.src = author.title;

  if (!offer.title) {
    popupTitle.remove();
  }
  if (!offer.address) {
    popupTextAddress.remove();
  }
  if (!offer.price) {
    popupTextPrice.remove();
  }
  if (!offer.type) {
    popupType.remove();
  }
  if (!offer.rooms && !offer.guests) {
    popupTextCapacity.remove();
  }
  if (!offer.checkin && !offer.checkout) {
    popupTextTime.remove();
  }
  if (!offer.features) {
    popupFeatures.remove();
  }
  if (!offer.description) {
    popupDescription.remove();
  }
  if (!author.title) {
    popupAvatar.remove();
  }
  if (!offer.photos.length) {
    popupPhotos.remove();
  }
  dataCardsElements.push(dataElement);
});

map.appendChild(dataCardsElements[0]);
