const cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('.map__canvas');
const TYPE_NAME = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const IMG_WIDTH = 45;
const IMG_HEIGHT = 40;
const getDataCardsElements = (dataCards) => dataCards.map(({author, offer}) => {
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
  const {
    address,
    checkin,
    checkout,
    description,
    features,
    guests,
    photos,
    price,
    rooms,
    title,
    type,
  } = offer;
  title ? popupTitle.textContent = title : popupTitle.remove();
  address ? popupTextAddress.textContent = address : popupTextAddress.remove();
  price ? popupTextPrice.textContent = `${price} ₽/ночь` : popupTextPrice.remove();
  type ? popupType.textContent = TYPE_NAME[type] : popupType.remove();
  (rooms && guests) ? popupTextCapacity.textContent = `${rooms} комнаты для ${guests} гостей` : popupTextCapacity.remove();
  (checkin && checkout) ? popupTextTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}` : popupTextTime.remove();
  if (features) {
    features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${feature}`);
      popupFeatures.appendChild(featureElement);
    });
  } else {
    popupFeatures.remove();
  }
  description ? popupDescription.textContent = description : popupDescription.remove();
  if (photos) {
    photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.src = photo;
      photoElement.width = IMG_WIDTH;
      photoElement.height = IMG_HEIGHT;
      photoElement.classList.add('popup__photo');
      photoElement.alt = 'Фотография жилья';
      popupPhotos.appendChild(photoElement);
    });
  } else {
    popupPhotos.remove();
  }
  author.avatar ? popupAvatar.src = author.avatar : popupAvatar.remove();
  return dataElement;
});
export {map, getDataCardsElements};
