import {getRandomNumberFloat, getRandomNumberInt, getRandomArrayElement} from './utils.js';

const SIMILAR_APARTMENTS_COUNT = 10;

const TITLES = [
  'Капучино Отель',
  'Strawberry Duck',
  'Халва Отель Полянка',
  'Отель "Чик"',
  'Чижик-пыжик Отель',
  'Апартаменты "Борис"',
  'Гостиница "Жемчужина"',
  'Комната "Отдых"',
  'Деревянный отель',
  'Балкон и кроватка',
];
const MIX_PRICE = 0;
const MAX_PRICE = 10000;
const TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const MIN_ROOMS_QTY = 0;
const MAX_ROOMS_QTY = 100;
const MIN_GUESTS_QTY = 0;
const MAX_GUESTS_QTY = 300;
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'Гостевой дом расположен на берегу моря. В распоряжении гостей общая кухня и детская игровая площадка.',
  'Отель отлично расположен у живописного Верхнего пруда. К услугам гостей стильные уютные номера.',
  'Этот отель находится в парковой зоне, всего в 50 метрах от парка.',
  'Апартаменты с видом на город Апартаменты с общим балконом.',
  'К услугам гостей домашняя кухня, классические номера, круглосуточная стойка регистрации.',
  'Вилла расположена в красивом парке на берегу озера Верхнее, в 15 минутах ходьбы от центральной площади',
  'Эта гостиница расположена в центре города, из ее окон открывается вид на остров и старинный замок.',
  'Предоставляются места на бесплатной частной парковке. Расстояние до музея составляет 1,2 км.',
  'Отель размещается в вилле с деревянным каркасом. Гостям отеля предоставляются номера в классическом стиле с телевизором.',
  'К услугам гостей номера с собственным балконом. Все номера оснащены телевизором с плоским экраном и кабельными каналами.',
];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const IMAGE_NAME = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;

const getShuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array.slice(Math.random() * (array.length - 1));
};
const createAuthor = (index) => ({avatar: `img/avatars/user${String(index).padStart(2, '0')}.png`});
const createOffer = () => ({
  title: getRandomArrayElement(TITLES),
  address: `${getRandomNumberFloat(MIN_LATITUDE, MAX_LATITUDE, 2)}, ${getRandomNumberFloat(MIN_LONGITUDE, MAX_LONGITUDE, 2)}`,
  price: getRandomNumberInt(MIX_PRICE, MAX_PRICE),
  type: getRandomArrayElement(TYPE_APARTMENTS),
  rooms: getRandomNumberInt(MIN_ROOMS_QTY, MAX_ROOMS_QTY),
  guests: getRandomNumberInt(MIN_GUESTS_QTY, MAX_GUESTS_QTY),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKOUT),
  features: getShuffleArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getShuffleArray(IMAGE_NAME),
});

const createLocation = () => ({
  lat: getRandomNumberFloat(MIN_LATITUDE, MAX_LATITUDE, 5),
  lng: getRandomNumberFloat(MIN_LONGITUDE, MAX_LONGITUDE, 5),
});

const createApartment = (index) => ({
  author: createAuthor(index),
  offer: createOffer(),
  location: createLocation(),
});

const getSimilarArray = (length) => {
  const array = [];
  for (let i = 1; i <= length; i++) {
    array.push(createApartment(i));
  }
  return array;
};
const dataCards = getSimilarArray(SIMILAR_APARTMENTS_COUNT);
export {dataCards};
