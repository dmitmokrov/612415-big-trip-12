import SortView from '../view/sort.js';
import DayListView from '../view/day-list.js';
import DayView from '../view/day.js';
import NoEvent from '../view/no-event.js';
import EventPresenter from './event.js';
import {render, RenderPosition} from '../utils/render';
import {SortType} from '../const.js';
import {sortByTime, sortByPrice, updateItem} from '../utils/common.js';

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._trips = null;
    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._dayListComponent = new DayListView();
    this._noEventComponent = new NoEvent();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._eventChangeHandler = this._eventChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
  }

  init(trips) {
    this._trips = trips.slice();

    if (this._trips.length === 0) {
      this._renderNoEvent();
    } else {
      this._renderSort();
      this._renderEvents();
    }

    console.log(this._eventsModel);
  }

  _eventChangeHandler(updatedEvent) {
    this._trips = updateItem(this._trips, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderEvents(trips = this._trips, isDefaultSorting = true) {
    const tripDays = [...new Set(trips.map((trip) => new Date(trip.startTime).toDateString()))];
    const days = isDefaultSorting ? tripDays : [true];

    days.forEach((day, index) => {
      const tripDayComponent = isDefaultSorting ? new DayView(day, index) : new DayView();
      const tripEventList = tripDayComponent.getElement().querySelector(`.trip-events__list`);

      trips
        .filter((trip) => isDefaultSorting ? new Date(trip.startTime).toDateString() === day : trip)
        .forEach((event) => this._renderEvent(tripEventList, event));

      render(this._dayListComponent, tripDayComponent, RenderPosition.BEFOREEND);
    });

    render(this._tripContainer, this._dayListComponent, RenderPosition.BEFOREEND);
  }

  _sortTypeChangeHandler(sortType) {
    const trips = this._trips.slice();
    this._clearEvents();

    switch (sortType) {
      case SortType.TIME:
        this._renderEvents(trips.sort(sortByTime), false);
        break;

      case SortType.PRICE:
        this._renderEvents(trips.sort(sortByPrice), false);
        break;

      default:
        this._renderEvents();
    }
  }

  _modeChangeHandler() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(eventList, event) {
    const eventPresenter = new EventPresenter(eventList, this._eventChangeHandler, this._modeChangeHandler);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _clearEvents() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    this._dayListComponent.getElement().innerHTML = ``; // для удаления отрисованных дней
  }
}
