import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm} from './form.js';

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

mainPinMarker.on('moveend', (evt) => {
  let latLng;
  if (evt) {
    latLng = evt.target.getLatLng();
  } else {
    latLng = DEFAULT_LOCATION;
  }
  const lat = latLng.lat.toFixed(5);
  const lng = latLng.lng.toFixed(5);
  formAddress.value = `${lat}, ${lng}`;
});

