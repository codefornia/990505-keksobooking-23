import {map, getDataCardsElements} from './card-popup.js';
import {getSimilarArray, SIMILAR_APARTMENTS_COUNT} from './data.js';
import {disableFilter, enableFilter} from './filter.js';
import {disableAdForm, enableAdForm} from './form.js';
import './map.js';
const dataCards = getSimilarArray(SIMILAR_APARTMENTS_COUNT);
const dataCardsElements = getDataCardsElements(dataCards);
map.appendChild(dataCardsElements[0]);
