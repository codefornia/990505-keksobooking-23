import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm} from './form.js';

const DEFAULT_LOCATION = {
  lat: 35.6700,
  lng: 139.7500,
};

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
