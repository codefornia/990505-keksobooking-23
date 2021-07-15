import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm} from './form.js';
import {dataCards} from './data.js';
import {getDataCardsElements} from './card-popup.js';

const DEFAULT_LOCATION = {
  lat: 35.6700,
  lng: 139.7500,
};

const MAIN_PIN = {
  size: [52, 52],
  anchor: [26, 52],
  icon: './img/main-pin.svg',
};

const PIN = {
  size: [40, 40],
  anchor: [20, 40],
  icon: './img/pin.svg',
};

const formAddress = document.querySelector('#address');

disableFilter();
disableAdForm();

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    enableAdForm();
    enableFilter();
  })
  .setView({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN.icon,
  iconSize: MAIN_PIN.size,
  iconAnchor: MAIN_PIN.anchor,
});

//создаем маркер
const mainPinMarker = L.marker(
  {
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapCanvas);
//функция заполнения
mainPinMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  formAddress.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
});


//маркер

const points = [
  {
    title: 'Футура',
    lat: 59.96925,
    lng: 30.31730,
  },
  {
    title: 'Шаверма',
    lat: 59.96783,
    lng: 30.31258,
  },
  {
    title: 'Франк',
    lat: 59.95958,
    lng: 30.30228,
  },
  {
    title: 'Ginza',
    lat: 59.97292,
    lng: 30.31982,
  },
];
//
const dataCardsElements = getDataCardsElements(dataCards);
const markerGroup = L.layerGroup().addTo(mapCanvas);
//делаем пины
const createPin = (point, index) => {
  const {lat, lng} = point.location;
  const pinIcon = L.icon({
    iconUrl: PIN.icon,
    iconSize: PIN.size,
    iconAnchor: PIN.anchor,
  });
  const pinMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      pinIcon,
    },
  );
  pinMarker
    .addTo(markerGroup)
    .bindPopup(
      dataCardsElements[index],
      {
        keepInView: true,
      },
    );
};

const generatePins = (data) => {
  data.forEach((element,index) => {
    createPin(element,index);
  });
};

generatePins(dataCards);




