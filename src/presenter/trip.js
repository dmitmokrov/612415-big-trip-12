import SortView from '../view/sort.js';
import DayListView from '../view/day-list.js';
import DayView from '../view/day.js';
import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import NoEvent from '../view/no-event.js';
import {render, RenderPosition, replace} from '../utils/render';

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
      this._tripDays.forEach(this._renderDay.bind(this));
      this._renderDayList();
    }
  }

  _renderEvents(sortFunction) {
    this._dayListComponent.getElement().innerHTML = ``; // new
    const day = new DayView();
    this._trips.sort(sortFunction).forEach((trip) => this._renderEvent(day.getElement().querySelector(`.trip-events__list`), trip));
    render(this._dayListComponent, day, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    let sortFunc;
    switch (sortType) {
      case `time`:
        sortFunc = (a, b) => (b.endTime - b.startTime - a.endTime + a.startTime);
        this._renderEvents(sortFunc);
        break;

      case `price`:
        sortFunc = (a, b) => b.price - a.price;
        this._renderEvents(sortFunc);
        break;

      default:
        this._dayListComponent.getElement().innerHTML = ``;
        this._tripDays.forEach(this._renderDay.bind(this));
        this._renderDayList();
    }
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange); // new
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderDayList() {
    render(this._tripContainer, this._dayListComponent, RenderPosition.BEFOREEND);
  }

  _renderDay(day, index) {
    const tripDayComponent = new DayView(day, index);
    const tripEventList = tripDayComponent.getElement().querySelector(`.trip-events__list`);

    this._trips
      .filter((trip) => new Date(trip.startTime).toDateString() === day)
      .forEach((trip) => this._renderEvent(tripEventList, trip));

    render(this._dayListComponent, tripDayComponent, RenderPosition.BEFOREEND);
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
