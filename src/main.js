import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import DayListView from './view/day-list.js';
import DayView from './view/day.js';
import EventView from './view/event.js';
import EventEditView from './view/event-edit.js';
import NoEvent from './view/no-event.js';
import {trips, tripDays} from './mock/mock.js';
import {render, RenderPosition} from './utils/render.js';

const bodyElement = document.querySelector(`.page-body`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = bodyElement.querySelector(`.trip-events`);

const tripInfoElement = new TripInfoView(trips);
const tripDaysList = new DayListView();

const renderEvent = (eventList, trip) => {
  const eventElement = new EventView(trip);
  const eventEditElement = new EventEditView(trip);

  const replaceCardToForm = () => {
    eventList.replaceChild(eventEditElement.getElement(), eventElement.getElement());
  };

  const replaceFormToCard = () => {
    eventList.replaceChild(eventElement.getElement(), eventEditElement.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventElement.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditElement.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventList, eventElement.getElement(), RenderPosition.BEFOREEND);
};

render(tripInfoElement, new TripCostView(trips), RenderPosition.BEFOREEND); // Отрисовка цены поездки
render(tripMainElement, tripInfoElement, RenderPosition.AFTERBEGIN); // Отрисовка информации о поездке
render(tripMainControlsElement, new MenuView(), RenderPosition.AFTERBEGIN); // Отрисовка меню
render(tripMainControlsElement, new FilterView(), RenderPosition.BEFOREEND); // Отрисовка фильтров

if (trips.length === 0) {
  render(tripEventsElement, new NoEvent(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new SortView(), RenderPosition.BEFOREEND); // Отрисовка сортировки

  tripDays
  .forEach((day, index) => {
    const tripDayElement = new DayView(day, index);
    const tripEventsList = tripDayElement.getElement().querySelector(`.trip-events__list`);

    render(tripDaysList, tripDayElement, RenderPosition.BEFOREEND);

    trips
      .filter((trip) => new Date(trip.startTime).toDateString() === day)
      .forEach((trip) => renderEvent(tripEventsList, trip)); // Отрисовка поездок внутри дня
  }); // Отрисовка дней

  render(tripEventsElement, tripDaysList, RenderPosition.BEFOREEND); // Отрисовка списка дней поездки
}
