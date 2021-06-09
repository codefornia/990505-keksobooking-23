const SIMILAR_APARTMENTS_COUNT = 10;
const AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
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
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const IMAGE_NAME = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomNumberInt = (firstNumber, secondNumber) => {
  if (firstNumber > secondNumber) {
    return 'Диапазон не верен, введите корректные данные';
  }

  if (firstNumber < 0 || secondNumber < 0) {
    return 'Никаких отрицательных чисел, друг! Поменяй значения!';
  }

  if (firstNumber === secondNumber) {
    if (Number.isInteger(firstNumber)) {
      return firstNumber;
    }
    return 'Введите различные значение';
  }

  if (Math.ceil(firstNumber) === Math.ceil(secondNumber)) {
    return 'В этом диапазоне не найдено целых чисел. Введите корректные данные';
  }

  const min = Math.ceil(firstNumber);
  const max = Math.floor(secondNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomNumberFloat = (firstNumber, secondNumber, numsAfterDot = 2) => {
  if (firstNumber > secondNumber) {
    return 'Диапазон не верен, введите корректные данные';
  }

  if (firstNumber < 0 || secondNumber < 0) {
    return 'Никаких отрицательных чисел, друг! Поменяй значения!';
  }

  if (firstNumber === secondNumber) {
    return Number(firstNumber.toFixed(numsAfterDot));
  }

  const powerNumber = Math.pow(10, numsAfterDot);
  return (Number((Math.random() * (secondNumber - firstNumber) + firstNumber).toFixed(numsAfterDot)) * powerNumber) / powerNumber;
};

const getRandomArrayElement = (elements) => elements[getRandomNumberInt(0, elements.length - 1)];

const getRegularizedArrayElement = (elements) => elements.pop();

const getShuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array.slice(Math.random() * (array.length - 1));
};

const createAuthor = `avatar: img/avatars/user ${getRegularizedArrayElement(AVATAR_NUMBERS)} .png`;

const createOffer = {
  title: getRegularizedArrayElement(TITLES),
  address: `${getRandomNumberFloat(335767, 345767, 2)}, ${getRandomNumberFloat(335767, 345767, 2)}`,
  price: getRandomNumberInt(0, 10000),
  type: getRandomArrayElement(TYPE_APARTMENTS),
  rooms: getRandomNumberInt(0, 100),
  guests: getRandomNumberInt(0, 300),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKOUT),
  features: getShuffleArray(FEATURES),
  description: getRegularizedArrayElement(DESCRIPTIONS),
  photos: getShuffleArray(IMAGE_NAME),
};

const createLocation = {
  lat: getRandomNumberFloat(35.65000, 35.70000, 5),
  lng: getRandomNumberFloat(139.70000, 139.80000, 5),
};

const createApartment = {
  author: createAuthor,
  offer: createOffer,
  location: createLocation,
};
/*
const similarApartments = (count)=> (new Array(count).fill(null).map(() => createApartment));
similarApartments(SIMILAR_APARTMENTS_COUNT);*/

const getSimilarArray = (length, element) => {
  const array = [];
  for (let i = 0; i <= length - 1; i++) {
    array.push(element);
  }
  return array;
};

getSimilarArray(SIMILAR_APARTMENTS_COUNT, createApartment);
