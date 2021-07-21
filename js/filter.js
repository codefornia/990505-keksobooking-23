import {generatePins} from './map.js';

const mapFilter = document.querySelector('.map__filters');
const filterItems = mapFilter.querySelectorAll('select');

const typeFilterElement = mapFilter.querySelector('[name="housing-type"]');
const priceFilterElement = mapFilter.querySelector('[name="housing-price"]');
const roomsFilterElement = mapFilter.querySelector('[name="housing-rooms"]');
const guestsFilterElement = mapFilter.querySelector('[name="housing-guests"]');

const wifiFilterElement = mapFilter.querySelector('[value="wifi"]');
const dishwasherFilterElement = mapFilter.querySelector('[value="dishwasher"]');
const parkingFilterElement = mapFilter.querySelector('[value="parking"]');
const washerFilterElement = mapFilter.querySelector('[value="washer"]');
const elevatorFilterElement = mapFilter.querySelector('[value="elevator"]');
const conditionerFilterElement = mapFilter.querySelector('[value="conditioner"]');

const disableFilter = () => {
  mapFilter.classList.add('map__filters--disabled');
  filterItems.forEach((filterItem) => {
    filterItem.setAttribute('disabled', 'disabled');
  });
};

const enableFilter = () => {
  mapFilter.classList.remove('map__filters--disabled');
  filterItems.forEach((filterItem) => {
    filterItem.removeAttribute('disabled');
  });
};

const filterBase = (data, key, filter) => {
  return data.filter(item => item[key] === filter.value);
};

const filterFeatures = (data, feature, filter) => {
  if (!filter.checked) {
    return data;
  }
  return data.filter(item => item.features.includes(feature));
};

const filterData = (data) => {
  let newData = data;
  newData = filterBase(newData, typeFilterElement.name, typeFilterElement);
  newData = filterBase(newData, priceFilterElement.name, priceFilterElement);
  newData = filterBase(newData, roomsFilterElement.name, roomsFilterElement);
  newData = filterBase(newData, guestsFilterElement.name, guestsFilterElement);

  newData = filterFeatures(newData, wifiFilterElement.value, wifiFilterElement);
  newData = filterFeatures(newData, dishwasherFilterElement.value, dishwasherFilterElement);
  newData = filterFeatures(newData, parkingFilterElement.value, parkingFilterElement);
  newData = filterFeatures(newData, washerFilterElement.value, washerFilterElement);
  newData = filterFeatures(newData, elevatorFilterElement.value, elevatorFilterElement);
  newData = filterFeatures(newData, conditionerFilterElement.value, conditionerFilterElement);

  generatePins(newData.slice(0, 10));
};

filterItems.addEventListener ('change', filterData);

export {disableFilter, enableFilter};
