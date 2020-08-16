import {getFormatDate, createElement} from '../utils.js';

const createTripInfoElement = (trips) => {
  if (trips.length === 0) {
    return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title"></h1>

      <p class="trip-info__dates"></p>
    </div>
  </section>`;
  }

  const firstLocation = trips[0];
  const lastLocation = trips[trips.length - 1];
  const dates = `${getFormatDate(firstLocation.startTime)}&nbsp;&mdash;&nbsp;${getFormatDate(lastLocation.startTime)}`;
  const uniqueLocations = [...new Set(trips.map((trip) => trip.destination))];
  const title = (uniqueLocations.length > 3) ? `${firstLocation.destination} &mdash;...&mdash; ${lastLocation.destination}` : uniqueLocations.join(`-`);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>
  </section>`;
};

export default class TripInfoElement {
  constructor(trips) {
    this._trips = trips;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoElement(this._trips);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
