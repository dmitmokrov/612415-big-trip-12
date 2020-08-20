import AbstractView from './abstract.js';
import {getFormatDate} from '../utils/common.js';

const createTripInfoElement = (trips) => {
  const firstLocation = trips[0];
  const lastLocation = trips[trips.length - 1];
  const dates = trips.length ? `${getFormatDate(firstLocation.startTime)}&nbsp;&mdash;&nbsp;${getFormatDate(lastLocation.startTime)}` : ``;
  const uniqueLocations = [...new Set(trips.map((trip) => trip.destination))];
  const title = (uniqueLocations.length > 3) ? `${firstLocation.destination} &mdash;...&mdash; ${lastLocation.destination}` : uniqueLocations.join(`-`);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripInfoElement(this._trips);
  }
}
