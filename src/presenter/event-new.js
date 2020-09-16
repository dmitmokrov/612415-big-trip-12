import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {UpdateType, UserAction, EventEditMode, BLANK_EVENT} from '../const.js';

export default class EventNew {
  constructor(eventList, changeData) {
    this._eventList = eventList;
    this._changeData = changeData;

    this._eventEditComponent = null;


    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView(BLANK_EVENT, EventEditMode.ADD_EVENT);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._eventEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    render(this._eventList.querySelector(`.trip-sort`), this._eventEditComponent, RenderPosition.AFTER);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._eventEditComponent.updateData({isSaving: true, isDisabled: true});
  }

  setAborting() {
    const resetFormState = () => {
      this._eventEditComponent.updateData({isSaving: false, isDisabled: false, isDeleting: false});
    };

    this._eventEditComponent.shake(resetFormState);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _deleteClickHandler() {
    this.destroy();
  }

  _formSubmitHandler(event) {
    this._changeData(UserAction.ADD_EVENT, UpdateType.MAJOR, event);
    // this.destroy();
  }
}
