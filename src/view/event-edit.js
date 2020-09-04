import SmartView from './smart.js';
import {getFormatEditTime, getFormatText} from '../utils/common.js';
import {preposition, Description, datePickerOptions} from '../const.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_TRIP = {
  type: `Bus`,
  destination: `London`,
  // description: getDescription(descriptionText),
  startTime: Date.now(),
  endTime: Date.now(),
  price: 100,
  photos: [],
  offers: [],
  isFavorite: false
};

const createOffer = (offer) => {
  const {title, price, isChecked} = offer;

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getFormatText(title)}" type="checkbox" name="event-offer-luggage" ${isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${getFormatText(title)}">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};

const createPhoto = (photo) => `<img class="event__photo" src="${photo}" alt="Event photo"></img>`;

const createEventEditElement = (trip) => {
  const {type, destination, startTime, endTime, price, offers, photos, isFavorite} = trip;
  const description = Description[destination.toUpperCase()] || ``;
  const prep = preposition[type];
  const formattedStartTime = getFormatEditTime(startTime);
  const formattedEndTime = getFormatEditTime(endTime);
  const offersElement = offers.map((it) => createOffer(it)).join(``);
  const photosElement = photos.map((it) => createPhoto(it)).join(``);

  return `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Flight">
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${prep}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="London"></option>
            <option value="Paris"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedStartTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedEndTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersElement}
          </div>
        </section>
        <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">${destination}</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${photosElement}
                  </div>
                </div>
              </section>
      </section>
    </form>
  </li>`;
};

export default class EventEdit extends SmartView {
  constructor(trip = BLANK_TRIP) {
    super();
    this._trip = trip;
    this._datepicker = null;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatePickers();
  }

  getTemplate() {
    return createEventEditElement(this._trip);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  reset(event) {
    this.updateData(event);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteChangeHandler);
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
  }

  _setDatePickers() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._startDatepicker = flatpickr(this.getElement().querySelector(`input[name="event-start-time"]`), Object.assign({}, datePickerOptions, {defaultDate: this._trip.startTime, onClose: this._startTimeChangeHandler}));

    this._endDatepicker = flatpickr(this.getElement().querySelector(`input[name="event-end-time"]`), Object.assign({}, datePickerOptions, {defaultDate: this._trip.endTime, onClose: this._endTimeChangeHandler}));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._trip);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._trip);
  }

  _favoriteChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({isFavorite: !this._trip.isFavorite});
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({type: evt.target.value});
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({destination: evt.target.value});
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({price: evt.target.value});
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({startTime: userDate});
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({endTime: userDate});
  }
}
