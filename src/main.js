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
import {render, RenderPosition, replace} from './utils/render.js';

const bodyElement = document.querySelector(`.page-body`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = bodyElement.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoView(trips);
const dayListComponent = new DayListView();

const renderEvent = (eventList, trip) => {
  const eventComponent = new EventView(trip);
  const eventEditComponent = new EventEditView(trip);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventList, eventComponent, RenderPosition.BEFOREEND);
};

render(tripInfoComponent, new TripCostView(trips), RenderPosition.BEFOREEND); // Отрисовка цены поездки
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN); // Отрисовка информации о поездке
render(tripMainControlsElement, new MenuView(), RenderPosition.AFTERBEGIN); // Отрисовка меню
render(tripMainControlsElement, new FilterView(), RenderPosition.BEFOREEND); // Отрисовка фильтров

if (trips.length === 0) {
  render(tripEventsElement, new NoEvent(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new SortView(), RenderPosition.BEFOREEND); // Отрисовка сортировки

  tripDays
  .forEach((day, index) => {
    const tripDayComponent = new DayView(day, index);
    const tripEventsList = tripDayComponent.getElement().querySelector(`.trip-events__list`);

    render(dayListComponent, tripDayComponent, RenderPosition.BEFOREEND);

    trips
      .filter((trip) => new Date(trip.startTime).toDateString() === day)
      .forEach((trip) => renderEvent(tripEventsList, trip)); // Отрисовка поездок внутри дня
  }); // Отрисовка дней

  render(tripEventsElement, dayListComponent, RenderPosition.BEFOREEND); // Отрисовка списка дней поездки
}
