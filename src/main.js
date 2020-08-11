import {createMenuElement} from './view/menu.js';
import {createTripInfoElement} from './view/trip-info.js';
import {createTripCostElement} from './view/trip-cost.js';
import {createFilterElement} from './view/filter.js';
import {createTripSortElement} from './view/trip-sort.js';
import {createEventEditElement} from './view/event-edit.js';
import {createTripDaysElement} from './view/trip-days.js';
import {createTripItem} from './mock/trip.js';

const TRIPS_COUNT = 15;

const bodyElement = document.querySelector(`.page-body`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const menuHeaderElement = tripMainControlsElement.querySelector(`h2`);
const tripEventsElement = bodyElement.querySelector(`.trip-events`);
const trips = new Array(TRIPS_COUNT).fill().map(createTripItem);
const sortedByDateTrips = trips.slice().sort((a, b) => {
  if (a.startTime.getTime() > b.startTime.getTime()) {
    return 1;
  } else if (a.startTime.getTime() < b.startTime.getTime()) {
    return -1;
  }
  return 0;
});

const render = (container, node, place) => {
  container.insertAdjacentHTML(place, node);
};

render(tripMainElement, createTripInfoElement(), `afterbegin`); // Отрисовка информации о поездке

const tripMainInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

render(tripMainInfoElement, createTripCostElement(), `beforeend`); // Отрисовка цены поездки
render(menuHeaderElement, createMenuElement(), `afterend`); // Отрисовка меню
render(tripMainControlsElement, createFilterElement(), `beforeend`); // Отрисовка фильтров
render(tripEventsElement, createTripSortElement(), `beforeend`); // Отрисовка сортировки
render(tripEventsElement, createTripDaysElement(sortedByDateTrips.slice(1)), `beforeend`); // Отрисовка списка пунктов поездки

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, createEventEditElement(sortedByDateTrips[0]), `afterbegin`); // Отрисовка редактирования места
