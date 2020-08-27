import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

export default class Event {
  constructor(eventList, changeData) {
    this._eventList = eventList;
    this._changeData = changeData;
    this._event = null;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._eventClickHandler = this._eventClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  init(event) {
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._event = event;
    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    this._eventComponent.setClickHandler(this._eventClickHandler);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventList, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventList.contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventList.contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _eventClickHandler() {
    this._replaceCardToForm();
  }

  _formSubmitHandler(event) {
    this._changeData(event);
    this._replaceFormToCard();
  }
}
