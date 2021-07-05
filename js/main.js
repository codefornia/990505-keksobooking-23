import {map, getDataCardsElements} from './card-popup.js';
import {getSimilarArray, SIMILAR_APARTMENTS_COUNT} from './data.js';
const dataCards = getSimilarArray(SIMILAR_APARTMENTS_COUNT);
const dataCardsElements = getDataCardsElements(dataCards);
map.appendChild(dataCardsElements[0]);
