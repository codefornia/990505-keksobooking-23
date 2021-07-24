import {getDataCardsElements} from './card.js';

const DEFAULT_LOCATION = {
  lat: 35.6700,
  lng: 139.7500,
};
const MAP_ZOOM = 13;
const PIN_ICON_URL = 'img/pin.svg';
const PIN_ICON_WIDTH = 40;
const PIN_ICON_HEIGHT = 40;
const MAIN_PIN_ICON_URL = 'img/main-pin.svg';
const MAIN_PIN_ICON_WIDTH = 52;
const MAIN_PIN_ICON_HEIGHT = 52;
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const formAddress = document.querySelector('#address');
const mapCanvas = L.map('map-canvas');

L.tileLayer(
  TILE_URL,
  {
    attribution: TILE_ATTRIBUTION,
  },
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_ICON_URL,
  iconSize: [MAIN_PIN_ICON_WIDTH, MAIN_PIN_ICON_HEIGHT],
  iconAnchor: [MAIN_PIN_ICON_URL/2, MAIN_PIN_ICON_URL],
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
    iconUrl: PIN_ICON_URL,
    iconSize: [PIN_ICON_WIDTH, PIN_ICON_HEIGHT],
    iconAnchor: [PIN_ICON_URL/2, PIN_ICON_URL],
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
