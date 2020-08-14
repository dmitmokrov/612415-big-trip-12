import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FilterView from './view/filter.js';
import SortView from './view/trip-sort.js';
import DaysListView from './view/trip-days.js';
import DayView from './view/trip-days-item.js';
import EventView from './view/trip-events-item.js';
import EventEdit from './view/event-edit.js';
import {trips, tripDays} from './mock/mock.js';
import {renderElement, RenderPosition} from './utils.js';

const bodyElement = document.querySelector(`.page-body`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = bodyElement.querySelector(`.trip-events`);

const tripInfoElement = new TripInfoView(trips);

renderElement(tripInfoElement.getElement(), new TripCostView(trips).getElement(), RenderPosition.BEFOREEND); // Отрисовка цены поездки
renderElement(tripMainElement, tripInfoElement.getElement(), RenderPosition.AFTERBEGIN); // Отрисовка информации о поездке
renderElement(tripMainControlsElement, new MenuView().getElement(), RenderPosition.AFTERBEGIN); // Отрисовка меню
renderElement(tripMainControlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND); // Отрисовка фильтров
renderElement(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND); // Отрисовка сортировки

const tripDaysList = new DaysListView();

tripDays
  .forEach((day, index) => {
    const tripDayElement = new DayView(day, index);
    const tripEventsList = tripDayElement.getElement().querySelector(`.trip-events__list`);

    renderElement(tripDaysList.getElement(), tripDayElement.getElement(), RenderPosition.BEFOREEND);

    trips
      .filter((trip) => new Date(trip.startTime).toDateString() === day)
      .forEach((trip) => renderElement(tripEventsList, new EventView(trip).getElement(), RenderPosition.BEFOREEND)); // Отрисовка поездок внутри дня
  }); // Отрисовка дней

const tripEventsListElement = tripDaysList.getElement().querySelector(`.trip-events__list`);
renderElement(tripEventsListElement, new EventEdit(trips[0]).getElement(), RenderPosition.AFTERBEGIN); // Отрисовка редактирования места

renderElement(tripEventsElement, tripDaysList.getElement(), RenderPosition.BEFOREEND); // Отрисовка списка дней поездки
