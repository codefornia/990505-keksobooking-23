import {enableFilter, disableFilter} from './filter.js';
import {resetForm, resetButton, enableAdForm, disableAdForm} from './form.js';
import {resetMap, mapCanvas, generatePins, DEFAULT_LOCATION, MAP_ZOOM} from './map.js';
import {loadData} from './api.js';

const SIMILAR_APARTMENTS_COUNT = 10;

resetButton.addEventListener('click', () => {
  resetForm();
  resetMap();
});

disableAdForm();
disableFilter();

mapCanvas.addEventListener('load', () => {
  enableAdForm();
  loadData((serverData) => {
    enableFilter();
    for (let i = 0; i < serverData.length; i++) {
      let priceRange = 'low';
      if (serverData[i].offer.price > 10000) {
        priceRange = 'middle';
      }
      if (serverData[i].offer.price > 50000) {
        priceRange = 'high';
      }
      serverData[i].offer.priceRange = priceRange;
    }
    window.PINS_DATA = serverData;
    generatePins(serverData.slice(0, SIMILAR_APARTMENTS_COUNT));
  });
});

mapCanvas.setView({
  lat: DEFAULT_LOCATION.lat,
  lng: DEFAULT_LOCATION.lng,
}, MAP_ZOOM);
