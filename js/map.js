import {getDataCardsElements} from './card.js';

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

const mapCanvas = L.map('map-canvas');

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

mainPinMarker.addEventListener('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  formAddress.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
});


const markerGroup = L.layerGroup().addTo(mapCanvas);

const createPin = (point, index, data) => {
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
      data[index],
      {
        keepInView: true,
      },
    );
};

const generatePins = (data) => {
  const dataCardsElements = getDataCardsElements(data);
  markerGroup.clearLayers();
  data.forEach((element, index) => {
    createPin(element, index, dataCardsElements);
  });
};

const resetMap = () => {
  mainPinMarker.setLatLng(DEFAULT_LOCATION);
  mapCanvas.setView({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  }, MAP_ZOOM);
};

export {resetMap, generatePins, mapCanvas, MAP_ZOOM, DEFAULT_LOCATION};
