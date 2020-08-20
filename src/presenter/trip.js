import SortView from '../view/sort.js';
import DayListView from '../view/day-list.js';
import DayView from '../view/day.js';
import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import NoEvent from '../view/no-event.js';
import {render, RenderPosition, replace} from '../utils/render';
import {SortType} from '../const.js';
import {sortByTime, sortByPrice} from '../utils/common.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._trips = null;
    this.tripDays = null;

    this._sortComponent = new SortView();
    this._dayListComponent = new DayListView();
    this._noEventComponent = new NoEvent();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this); // - new
  }

  init(trips) {
    this._trips = trips.slice();
    this._tripDays = [...new Set(this._trips.map((trip) => new Date(trip.startTime).toDateString()))];

    if (this._trips.length === 0) {
      this._renderNoEvent();
    } else {
      this._renderSort();
      this._renderEvents();
    }
  }

  _renderEvents(trips = this._trips, isDefaultSorting = true) {
    this._dayListComponent.getElement().innerHTML = ``;

    const days = isDefaultSorting ? this._tripDays : [true];
    days.forEach((day, index) => {
      const tripDayComponent = isDefaultSorting ? new DayView(day, index) : new DayView();
      const tripEventList = tripDayComponent.getElement().querySelector(`.trip-events__list`);

      trips
        .filter((trip) => isDefaultSorting ? new Date(trip.startTime).toDateString() === day : trip)
        .forEach((trip) => this._renderEvent(tripEventList, trip));

      render(this._dayListComponent, tripDayComponent, RenderPosition.BEFOREEND);
    });

    render(this._tripContainer, this._dayListComponent, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    const trips = this._trips.slice();
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

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange); // new
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(eventList, trip) {
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

    eventComponent.setClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventList, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvent() {
    render(this._tripContainer, new NoEvent(), RenderPosition.BEFOREEND);
  }
}
