import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm} from './form.js';
import {dataCards} from './data.js';
import {getDataCardsElements} from './card-popup.js';

const DEFAULT_LOCATION = {
  lat: 35.6700,
  lng: 139.7500,
};

const MAP_ZOOM = 10;
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
  }, MAP_ZOOM);

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
  const latLng = evt.target.getLatLng();
  formAddress.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
});

const dataCardsElements = getDataCardsElements(dataCards);
const markerGroup = L.layerGroup().addTo(mapCanvas);

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
      icon: pinIcon,
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
