import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Event {
  constructor(eventList) {
    this._eventList = eventList;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEventClick = this._handleEventClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(trip) {
    this._eventComponent = new EventView(trip);
    this._eventEditComponent = new EventEditView(trip);

    this._eventComponent.setClickHandler(this._handleEventClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._eventList, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleEventClick() {
    this._replaceCardToForm();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }
}
