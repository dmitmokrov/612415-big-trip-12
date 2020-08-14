import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FilterView from './view/filter.js';
import {createTripSortElement} from './view/trip-sort.js';
import {createEventEditElement} from './view/event-edit.js';
import {createTripDaysElement} from './view/trip-days.js';
import {createTripDaysItemElement} from './view/trip-days-item.js';
import {createTripEventsItemElement} from './view/trip-events-item.js';
import {trips, tripDays} from './mock/mock.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

const bodyElement = document.querySelector(`.page-body`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = bodyElement.querySelector(`.trip-events`);

const tripInfoElement = new TripInfoView(trips);

renderElement(tripInfoElement.getElement(), new TripCostView(trips).getElement(), RenderPosition.BEFOREEND); // Отрисовка цены поездки
renderElement(tripMainElement, tripInfoElement.getElement(), RenderPosition.AFTERBEGIN); // Отрисовка информации о поездке
renderElement(tripMainControlsElement, new MenuView().getElement(), RenderPosition.AFTERBEGIN); // Отрисовка меню
renderElement(tripMainControlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND); // Отрисовка фильтров
renderTemplate(tripEventsElement, createTripSortElement(), `beforeend`); // Отрисовка сортировки
renderTemplate(tripEventsElement, createTripDaysElement(), `beforeend`); // Отрисовка списка дней поездки

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

tripDays
  .forEach((day, index) => {
    renderTemplate(tripDaysElement, createTripDaysItemElement(day, index), `beforeend`);

    const tripDayElement = tripDaysElement.querySelector(`.trip-days__item:last-child`);
    const tripEventsListElement = tripDayElement.querySelector(`.trip-events__list`);

    trips
      .filter((trip) => new Date(trip.startTime).toDateString() === day)
      .forEach((trip) => renderTemplate(tripEventsListElement, createTripEventsItemElement(trip), `beforeend`)); // Отрисовка поездок внутри дня
  }); // Отрисовка дней

const tripEventsListElement = tripDaysElement.querySelector(`.trip-events__list`);
renderTemplate(tripEventsListElement, createEventEditElement(trips[0]), `afterbegin`); // Отрисовка редактирования места
