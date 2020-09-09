import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {UpdateType, UserAction, EventEditMode} from '../const.js';
import {isDatesEqual} from '../utils/common.js';
import StoreModel from '../model/store.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  constructor(eventList, changeData, changeMode) {
    this._eventList = eventList;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._event = null;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._availableOffers = null;
    this._destinations = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._eventClickHandler = this._eventClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  init(event) {
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._event = event;
    this._availableOffers = this._getOffers();
    this._destinations = this._getDestinations();

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event, EventEditMode.EDIT_EVENT, this._availableOffers, this._destinations);

    this._eventComponent.setClickHandler(this._eventClickHandler);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._eventEditComponent.setDeleteClickHandler(this._deleteClickHandler);
    this._eventEditComponent.setTypeChangeHandler(this._typeChangeHandler);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventList, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  _typeChangeHandler(update) {
    this._changeData(UserAction.EDIT_EVENT, UpdateType.PATCH, update);
  }

  _getOffers() {
    return StoreModel.getOffers().filter((offer) => offer.type.toUpperCase() === this._event.type.toUpperCase()).map((it) => it.offers)[0];
  }

  _getDestinations() {
    return StoreModel.getDestinations();
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
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

  _deleteClickHandler(event) {
    this._changeData(UserAction.DELETE_EVENT, UpdateType.MAJOR, event);
  }

  _formSubmitHandler(update) {
    const isMajorUpdate = !isDatesEqual(this._event.startTime, update.startTime) || !isDatesEqual(this._event.endTime, update.endTime);
    this._changeData(UserAction.EDIT_EVENT, isMajorUpdate ? UpdateType.MAJOR : UpdateType.PATCH, update);
    this._replaceFormToCard();
  }
}
