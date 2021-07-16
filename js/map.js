import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm} from './form.js';
import {dataCards} from './data.js';
import {getDataCardsElements} from './card-popup.js';

const DEFAULT_LOCATION = {
  lat: 35.6700,
  lng: 139.7500,
};
const MAP_ZOOM = 13;
const MainPin = {
  SIZE: [52, 52],
  ANCHOR: [26, 52],
  ICON: './img/main-pin.svg',
};
const Pin = {
  SIZE: [40, 40],
  ANCHOR: [20, 40],
  ICON: './img/pin.svg',
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
  iconUrl: MainPin.ICON,
  iconSize: MainPin.SIZE,
  iconAnchor: MainPin.ANCHOR,
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
    iconUrl: Pin.ICON,
    iconSize: Pin.SIZE,
    iconAnchor: Pin.ANCHOR,
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
