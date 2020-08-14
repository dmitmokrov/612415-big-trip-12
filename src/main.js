import {createMenuElement} from './view/menu.js';
import {createTripInfoElement} from './view/trip-info.js';
import {createTripCostElement} from './view/trip-cost.js';
import {createFilterElement} from './view/filter.js';
import {createTripSortElement} from './view/trip-sort.js';
import {createEventEditElement} from './view/event-edit.js';
import {createTripDaysElement} from './view/trip-days.js';
import {createTripDaysItemElement} from './view/trip-days-item.js';
import {createTripEventsItemElement} from './view/trip-events-item.js';
import {trips, tripDays} from './mock/mock.js';

const bodyElement = document.querySelector(`.page-body`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const menuHeaderElement = tripMainControlsElement.querySelector(`h2`);
const tripEventsElement = bodyElement.querySelector(`.trip-events`);

const render = (container, node, place) => {
  container.insertAdjacentHTML(place, node);
};

render(tripMainElement, createTripInfoElement(trips), `afterbegin`); // Отрисовка информации о поездке

const tripMainInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

render(tripMainInfoElement, createTripCostElement(trips), `beforeend`); // Отрисовка цены поездки
render(menuHeaderElement, createMenuElement(), `afterend`); // Отрисовка меню
render(tripMainControlsElement, createFilterElement(), `beforeend`); // Отрисовка фильтров
render(tripEventsElement, createTripSortElement(), `beforeend`); // Отрисовка сортировки
render(tripEventsElement, createTripDaysElement(), `beforeend`); // Отрисовка списка дней поездки

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

tripDays
  .forEach((day, index) => {
    render(tripDaysElement, createTripDaysItemElement(day, index), `beforeend`);

    const tripDayElement = tripDaysElement.querySelector(`.trip-days__item:last-child`);
    const tripEventsListElement = tripDayElement.querySelector(`.trip-events__list`);

    trips
      .filter((trip) => new Date(trip.startTime).toDateString() === day)
      .forEach((trip) => render(tripEventsListElement, createTripEventsItemElement(trip), `beforeend`)); // Отрисовка поездок внутри дня
  }); // Отрисовка дней

const tripEventsListElement = tripDaysElement.querySelector(`.trip-events__list`);
render(tripEventsListElement, createEventEditElement(trips[0]), `afterbegin`); // Отрисовка редактирования места
